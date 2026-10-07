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

## Git

- Commit and push every completed change.
- Write an evidence-rich commit body and include the current chat ID as Chat-ID: <id>.
