# Repo rules

## Verify before publishing

- Run node scripts/validate-markdown-tables.mjs and node scripts/check-links.mjs before every commit.
- Add a game only when the tool, its organization, or its community page presents it and the link resolves with HTTP 200.
- Record the count method, the primary source, and the checked date for every count claim.
- Label missing AI attribution explicitly; never assume a showcase game is AI-made.
- Never link a private repository from this public index.

## Writing

- Write Markdown in a straightforward, imperative style.
- Keep the README comparison table, the feature checklist, and the games.md catalog in one tool order.
- Regenerate or edit both files when a tool order or tool set changes.

## Site

- Rebuild the published pages with node scripts/build-site.mjs after every README.md or games.md change, then commit index.html, games.html, and poster.html.
- GitHub Pages serves the repository root of main, so the pages load svg/poster.svg directly.

## Poster

- Rebuild the animated poster with node svg/embed-assets.mjs svg/poster.template.svg svg/assets.json svg/poster.svg.
- Keep the transparent vector variant in svg/poster-unslop.svg with data-ink light or dark; regenerate its PNG exports with the Playwright check, not by hand.
- Keep svg/masters/ as the lossless source, record new prompts in svg/prompts.md, and recheck the preview and the standalone SVG after every poster change.

## Git

- Commit and push every completed change.
- Write an evidence-rich commit body and include the current chat ID as Chat-ID: <id>.
