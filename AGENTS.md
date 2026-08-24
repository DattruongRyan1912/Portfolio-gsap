# Portfolio GSAP — Project Rules

## Updating and deploying the existing Site

- Treat `.openai/hosting.json` as the source of truth for Sites hosting. Reuse its existing `project_id` for every update; do not create a new Site during normal maintenance.
- Keep the current Sites URL stable: `https://dat-truong-backend.prouder-pushes7b.chatgpt.site/`. Do not rename or delete the Site unless the user explicitly requests it.
- A push to `git@github.com:DattruongRyan1912/Portfolio-gsap.git` does not update the Sites deployment automatically.
- Before publishing a change, run `npm exec tsc -- --noEmit`, `npm run lint`, `npm run build`, and `npm audit --omit=dev`. Also verify the root route, metadata, and Open Graph asset.
- Commit the exact validated source and push `main` to GitHub only when the user has authorized the remote push.
- Package the successful build, save a new Sites version using the exact pushed commit SHA, and deploy that version to the existing Sites `project_id`.
- Wait for the Sites deployment to report `succeeded` before handing it off. Keep the previous deployment live if the new version fails.
- Preserve owner-only access by default. Making the Site public requires separate explicit approval from the user.
