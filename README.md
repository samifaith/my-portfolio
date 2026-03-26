# Portfolio Website

A modern, responsive portfolio website showcasing my work in writing, development, design, and media. Built with React and styled with Tailwind CSS.

## 🚀 Features

- **Multi-section Portfolio**: Writing, Development, Design, and Media sections
- **Interactive Cards**: Dynamic gradient cards with hover effects
- **Audio Integration**: Embedded podcast episodes with custom audio players
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modal System**: Full-screen project viewing experience
- **Story Pages**: Individual pages for writing pieces with rich typography

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── PageLayout.js          # Consistent layout wrapper
│   └── ProjectCard.js         # Reusable card component
├── pages/
│   ├── WritingPage.js         # Writing portfolio section
│   ├── DevelopmentPage.js     # Development projects
│   ├── DesignPage.js          # Design portfolio
│   └── MediaPage.js           # Media projects
├── constants/
│   └── WritingPieces.js       # Writing content data
└── App.js                     # Main app component
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

4. Open [http://localhost:3000](http://localhost:3000) to view the site.

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

- `src/components/PageLayout.js` for headers
- Tailwind config for additional brand colors

### Fonts

Primary fonts: Impact, Poppins, sans-serif

## 📦 Building for Production

```bash
npm run build
```

Creates optimized production build in the `dist` folder.

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
