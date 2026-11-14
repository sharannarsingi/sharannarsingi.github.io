# SHARAN.EXE — The Game World Portfolio

A single-page React portfolio with a futuristic side-scrolling game-world aesthetic.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Open this folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL printed in the terminal (usually http://localhost:5173).

## Personalise before publishing

Open `src/App.jsx` and replace:

- `your.email@example.com` with your email address.
- GitHub and LinkedIn profile URLs with your real profiles.
- Each project's `github` value with its actual repository URL.
- Review all project descriptions and skill claims for accuracy.

Add your resume PDF to `public/resume.pdf`. The Resume button downloads that file.

## Build for deployment

```bash
npm run build
```

The production website is generated in the `dist` folder. You can deploy this folder using Vercel or Netlify. For Vercel, import the GitHub repository and keep the default Vite build settings.

## Notes

This is a frontend-only portfolio. A custom Java backend is not required for navigation, project showcases, or email contact links. A real contact form can be added later using a form service or a backend endpoint if needed.
