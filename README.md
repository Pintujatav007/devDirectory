# DevDirectory

A responsive React single-page engineering directory for discovering developers, reading their posts, and sharing a new article after a simulated sign-in. It uses React 18, React Router 6, Axios, and JSONPlaceholder.

The interface is in English (India, `en-IN`). The protected `/admin` panel lists posts and provides a validated edit form. All 100 sample articles have clear local English copy; JSONPlaceholder's original demo text remains unchanged at the API. JSONPlaceholder simulates edits but does not persist them between reloads.

## Setup

The required repository name is `bca-frontend-devdirectory-<RollNumber>`. Replace `<RollNumber>` with your actual student roll number when creating the remote repository and rename the `name` value in `package.json` to match.

Requirements: Node.js 18 or newer and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The application reads public sample data from JSONPlaceholder. Sign-in is simulated locally and does not provide real account security. JSONPlaceholder accepts new posts and returns HTTP 201 but does not persist them on its server.

## Production build and preview

```sh
npm run build
npm run preview
```

Vite writes production files to `dist/`. Confirm the terminal reports a successful build and open the preview URL to inspect the production build.

## Deployment

Push the repository to a public GitHub or GitLab project after replacing the roll-number placeholder. Deploy the Vite project with a static host such as GitHub Pages, Netlify, or Vercel: set the build command to `npm run build`, the output directory to `dist`, and configure SPA rewrites so unknown paths serve `index.html`. Publish the actual repository and hosting URLs with your submission; none are included until you create and deploy them.

## Source map

- `src/services/api.js` is the single configured Axios client. User and post service modules share it.
- `src/context/AuthContext.jsx` stores the simulated session in local storage. The protected publishing route preserves its intended path, query, and hash through sign-in.
- `src/hooks/useDebounce.js` debounces name/company directory search.
- `src/components/` contains navigation, reusable user cards, route guard, loading skeletons, and alerts.
- `src/pages/` contains the overview, directory, profile, sign-in, publishing, admin editing panel, and not-found screens.

## Assignment report and evidence

Create the requested PDF report after running the app locally. Include an architecture diagram showing `App → Router → Pages → Components` and `Pages → Services → Axios client → JSONPlaceholder`, with AuthContext and the debounced search hook. Capture real screenshots for loading/empty, a network/API error, desktop, and mobile views; annotate each image with the state and viewport. Include a self-evaluation against the supplied rubric, plus the actual repository URL, deployed URL, and build/preview verification. Do not use invented screenshots, links, or verification claims.

## Commit history

Use meaningful Conventional Commit messages for your work, for example `feat: implement dynamic routing for user profile`, `fix: handle 404 response on invalid user id`, and `style: complete responsive layout for user card grid`.
