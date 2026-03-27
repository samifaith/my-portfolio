# Portfolio Website

A modern, responsive portfolio website showcasing my work in writing, development, design, and media. Built with React + Vite, with a blend of MUI components, Tailwind utilities, and custom CSS.

## 🚀 Features

- **Multi-section Portfolio**: Writing, Development, Design, and Media sections
- **Interactive Cards**: Dynamic gradient cards with hover effects
- **Audio Integration**: Embedded podcast episodes with custom audio players
- **Responsive Design**: Mobile-first approach with mixed utility and component styling
- **Modal System**: Full-screen project viewing experience
- **Story Pages**: Individual pages for writing pieces with rich typography
- **Animated Home Experience**: GSAP-powered intro and timeline interactions

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router 7
- **Styling**: MUI (Emotion), Tailwind CSS, custom CSS
- **Animation**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── PageLayout.jsx         # Consistent layout wrapper
│   ├── Menu.jsx               # Desktop/mobile navigation
│   └── ProjectCard.jsx        # Reusable card component
├── pages/
│   ├── AnimatedHomePage.jsx   # GSAP-driven landing experience
│   ├── ExpertisePage.jsx      # Filtered work grid (design/dev/writing/media)
│   └── WritingPage.jsx        # Story detail pages
├── development/
│   └── Wander.jsx             # Case study page
├── constants/
│   └── WritingPieces.js       # Writing content data
└── App.jsx                    # Main app routes
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd my-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view the site.

## 📝 Content Management

### Adding Writing Pieces

Update `src/constants/WritingPieces.js`:

```javascript
"new-story": {
  title: "Your Story Title",
  subtitle: "Story Type",
  content: `Your story content here...`,
  audioFile: "/writing/audio-file.mp3", // optional
  coverImage: "/writing/cover-image.png", // optional
  pdfFile: "/writing/article.pdf", // optional
  pdfPages: [1, 2, 3] // optional page numbers to embed inline
}
```

### Adding Projects

Add projects to the respective page files with this structure:

```javascript
{
  id: "project-id",
  title: "Project Title",
  description: "Project description",
  image: "./project-image.jpg",
  type: "Project Type",
  theme: "Project Theme"
}
```

## 🎨 Customization

### Colors

The primary brand color is defined as `#a2003b`. Update in:

- `src/components/PageLayout.jsx` for headers
- Tailwind config for additional brand colors

### Fonts

Primary fonts: Impact, Poppins, sans-serif

## 📦 Building for Production

```bash
npm run build
```

Creates optimized production build in the `dist` folder.

Generated output folders (`dist`, `build`) are treated as build artifacts and should not be committed.

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/repository-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:

```bash
npm run deploy
```

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🔧 Available Scripts

- `npm start` - Development server
- `npm run dev` - Development server
- `npm test` - Run tests
- `npm run build` - Production build
- `npm run preview` - Preview production build locally
- `npm run audit` - Run npm security audit
- `npm run audit:fix` - Attempt automatic npm security fixes
- `npm run audit:lighthouse` - Run one-command Lighthouse performance audit
- `npm run audit:all` - Run npm audit and Lighthouse audit in sequence

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal portfolio, but feedback and suggestions are welcome! Feel free to open an issue or submit a pull request.

## 📞 Contact

<!-- - Website: [Your Website]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- Twitter: [Your Twitter] -->

---

Built with ❤️ using React and Tailwind CSS
