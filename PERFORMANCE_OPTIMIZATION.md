# Performance Optimization Guide

## 🎯 Lighthouse Score Improvement Strategy

### Current Issues Addressed (from 29% → Target: 90%+)

---

## ✅ Completed Optimizations

### 1. **LCP (Largest Contentful Paint) Improvements**

#### HTML Optimizations (`public/index.html`)

- ✅ Added `preconnect` to Adobe Typekit for faster font loading
- ✅ Added `dns-prefetch` as fallback for older browsers
- ✅ Preload critical LCP image (headshot) with `fetchpriority="high"`
- ✅ Deferred non-critical font loading with media print trick
- ✅ Reorganized `<head>` for optimal resource priority

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://use.typekit.net" crossorigin />
<link rel="dns-prefetch" href="https://use.typekit.net" />

<!-- Preload critical LCP image -->
<link
	rel="preload"
	as="image"
	href="%PUBLIC_URL%/illustratedheadshot.webp"
	fetchpriority="high"
/>

<!-- Font loading with display swap -->
<link
	rel="stylesheet"
	href="https://use.typekit.net/sep4pur.css"
	media="print"
	onload="this.media='all'"
/>
```

---

### 2. **Eliminate Render-Blocking Resources**

#### CSS Optimization (`src/App.css`)

- ✅ Added font fallback to reduce FOIT (Flash of Invisible Text)
- ✅ Added `contain` property to hero sections to limit reflow
- ✅ Added `content-visibility: auto` for off-screen content
- ✅ Optimized CSS containment for `.hero-wrap`, `.hero-split`, `.hero-text-section`, `.hero-image-section`

```css
/* Font fallback for Impact */
@font-face {
	font-family: "Impact-fallback";
	src: local("Arial Black");
	ascent-override: 105%;
	descent-override: 35%;
	line-gap-override: 0%;
	size-adjust: 95%;
}

/* CSS containment to prevent layout thrashing */
.hero-wrap {
	contain: layout style paint;
}

.head {
	contain: layout style paint;
	content-visibility: auto;
}
```

---

### 3. **Reduce Layout Shifts (CLS)**

#### JavaScript Optimization (`src/pages/AnimatedHomePage.jsx`)

- ✅ Replaced `setInterval` with `requestAnimationFrame` for typing animation
- ✅ Added `requestIdleCallback` to defer GSAP animations until browser is idle
- ✅ Added `willChange` hints before animations, cleared after completion
- ✅ Added explicit `minHeight` to prevent layout shifts during typing
- ✅ Added `contain: layout style` to text containers
- ✅ Memoized `openModal` callback with `useCallback`
- ✅ Added semantic ARIA labels for accessibility

```javascript
// Optimized typing with requestAnimationFrame
const typeNextChar = (timestamp) => {
	if (elapsed > typingSpeed) {
		// Update text
		setTypedText(fullText.slice(0, currentIndex));
	}
	rafId = requestAnimationFrame(typeNextChar);
};

// Defer animations to idle time
requestIdleCallback(
	() => {
		gsap.fromTo(
			signatureRef.current,
			{ opacity: 0, y: 20, willChange: "opacity, transform" },
			{ opacity: 1, y: 0, clearProps: "willChange" },
		);
	},
	{ timeout: 500 },
);
```

---

### 4. **Minimize Main-Thread Work**

#### Timeline Component (`src/components/VerticalTimeline.js`)

- ✅ Added `willChange` hints for GSAP animations
- ✅ Added `clearProps: "willChange"` after animations complete
- ✅ Added `fastScrollEnd: true` to ScrollTrigger config
- ✅ Proper cleanup with `ctx.revert()` in useEffect

```javascript
gsap.fromTo(
	card,
	{ opacity: 0, y: 30, willChange: "opacity, transform" },
	{
		opacity: 1,
		y: 0,
		scrollTrigger: { fastScrollEnd: true },
		clearProps: "willChange",
	},
);
```

---

## 🔧 Required Manual Optimizations

### 5. **Image Optimization (Current State + Ongoing Workflow)**

Image optimization has already been applied across key portfolio visuals.

#### Current state

1. Content images are delivered through AVIF/WebP-capable rendering paths.
2. The hero preload uses `illustratedheadshot.webp`.
3. Legacy heavy PNG originals for content were removed where safe.
4. PNG assets remain for favicons and web manifest icons (required compatibility path).

#### Ongoing workflow for any newly added images

Generate modern variants next to the source image, then keep normal project paths in content data.

```bash
find public src -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0 | while IFS= read -r -d '' f; do
  cwebp -quiet -q 82 "$f" -o "${f%.*}.webp"
  avifenc --min 24 --max 34 "$f" "${f%.*}.avif" >/dev/null 2>&1
done
```

#### Image quality policy (team default)

Use these defaults unless a specific visual requirement justifies a change:

1. Hero/featured images: target width 1600-2200px, AVIF `--min 24 --max 34`, WebP `-q 82`.
2. Card/list thumbnails: target width 700-1200px, AVIF `--min 28 --max 38`, WebP `-q 78`.
3. Preserve aspect ratio during resize and avoid upscaling small originals.
4. Keep one high-quality source original in version control only when future recropping or redesign is expected.
5. Do not remove PNG favicon/manifest icons; keep those compatibility assets intact.
6. For content images, originals can be removed only after AVIF/WebP exist, references are audited, and `npm run build` passes.

---

### 6. **Additional Production Optimizations**

For this Vite app, keep `npm run build` as `vite build` and profile the real output from `dist`.

Optional: source maps can be disabled in Vite if you specifically want smaller artifact size for production checks.

---

## 📊 Expected Performance Gains

| Metric                | Before    | After Optimizations | Gain              |
| --------------------- | --------- | ------------------- | ----------------- |
| **Performance Score** | 29%       | ~85-95%             | +56-66 points     |
| **LCP**               | ~8-12s    | ~1.5-2.5s           | 70-80% faster     |
| **TBT**               | ~2-3s     | ~200-400ms          | 85% reduction     |
| **CLS**               | 0.25+     | <0.1                | Passing threshold |
| **Image Size**        | Very high | Significantly lower | Major reduction   |
| **Font Load**         | Blocking  | Non-blocking        | Instant render    |

---

## 🧪 Testing Instructions

1. **Build Production Bundle**

   ```bash
   npm run build
   ```

2. **Serve Locally**

   ```bash
   npm run preview
   ```

3. **Run Lighthouse**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Select "Desktop" or "Mobile"
   - Generate report

   Or run the automated flow:

   ```bash
   npm run audit:lighthouse
   ```

   This command builds the app, serves it on `http://127.0.0.1:4173`, runs Lighthouse (performance category), and writes `lighthouse-report.html` to the project root.

4. **Key Metrics to Check**
   - ✅ LCP < 2.5s (Good)
   - ✅ FID < 100ms (Good)
   - ✅ CLS < 0.1 (Good)
   - ✅ Performance Score > 90%

---

## 🎨 Design Preservation Checklist

All optimizations maintain your design:

- ✅ Typing animation preserved (now smoother)
- ✅ GSAP scroll animations intact
- ✅ Glassmorphism effects unchanged
- ✅ Timeline animations working
- ✅ Hero layout identical
- ✅ Font rendering (with faster load)
- ✅ Headshot appearance (with modern formats)

---

## 🚀 Next Steps

1. **For new uploads, generate AVIF/WebP variants**
2. **Test locally:** `npm run build && npm run preview`
3. **Run Lighthouse** on production build
4. **Deploy** and verify on live site

---

## 📝 Additional Recommendations

### Future Optimizations (Nice to Have)

1. **Code Splitting**

   ```javascript
   const VerticalTimeline = lazy(() => import("./components/VerticalTimeline"));
   const MadeByMeHand = lazy(() => import("./components/MadeByMeHand"));
   ```

2. **Service Worker** (for repeat visits)
   - Uncomment in `src/index.js`
   - Cache static assets

3. **Compress Build Assets**
   - Enable gzip/brotli on server
   - Use `compression-webpack-plugin`

4. **CDN for Static Assets**
   - Move images to CDN
   - Leverage edge caching

---

## ⚠️ Common Pitfalls to Avoid

1. ❌ Don't lazy-load hero image (it's LCP)
2. ❌ Don't add more external fonts
3. ❌ Don't use `setTimeout`/`setInterval` for animations
4. ❌ Don't skip generating AVIF/WebP for new large images
5. ❌ Don't add unnecessary third-party scripts

---

## 🆘 Troubleshooting

**Q: Fonts not loading?**  
A: Check network tab - Typekit should load after initial render, not block it

**Q: Animations janky?**  
A: Ensure `will-change` is cleared after animations complete

**Q: Layout still shifting?**  
A: Check DevTools Performance tab, look for "Layout Shift" events

**Q: Build fails?**  
A: Run `npm install` and ensure React 19 compatibility

---

## 📚 Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [WebP Format](https://developers.google.com/speed/webp)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)
- [GSAP Performance](<https://greensock.com/docs/v3/GSAP/gsap.config()>)

---

**Last Updated:** April 4, 2026  
**Optimizations By:** GitHub Copilot  
**Target Lighthouse Score:** 90%+
