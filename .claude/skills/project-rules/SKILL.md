---
name: project-rules
description: Ground rules for the Smart Store UI design-refinement project. Use whenever building or editing any page, component, or token in this repo.
---

# Smart Store UI — ground rules

Context: internal design-refinement pages for a live product whose codebase we cannot access. Pages are shared as Vercel links in messages, Jira and Figma.

1. **Tokens are the source of truth.** Colors, fonts, radii and spacing come from `src/styles/tokens.css` via Tailwind utilities. No hardcoded hex or one-off px values in pages. Need a new value? Add a token and mark it `PROPOSED`.
2. **Inherited vs proposed.** Anything copied from the live style guide is "inherited"; anything we change is "proposed". Make the difference visible (token comments, a label or note on the page) so reviewers can tell them apart.
3. **Mock data only.** Never call the live Lambda or its APIs from this repo. Never commit cookies, tokens, session data, or real user and cart details (e.g. names, store accounts).
4. **Every page stands alone.** It works at its own URL with no login, deterministic mock data, and no dependency on other experimental pages. The site stays `noindex`.
5. **Accessibility floor.** Semantic HTML, text contrast ≥ 4.5:1, visible focus states, tap targets ≥ 44px. If a proposal fixes an a11y issue in the live UI, say so.
6. **Responsive check.** Verify at 375, 768 and 1280px before sharing.
7. **Next.js 16 differs from older versions.** Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code (see `AGENTS.md`).
8. **Share via previews.** One branch per page or experiment, so each gets its own Vercel preview link. `main` is the stable baseline. Run `npm run build` and `npm run lint` before pushing.
