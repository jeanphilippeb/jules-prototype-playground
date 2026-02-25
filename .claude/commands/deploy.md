Deploy the current prototype branch to Vercel via a GitHub Pull Request.

## Instructions

1. Run `bun dev` and verify the build has no errors.
2. Determine the current branch name. If on `main`, create a new branch:
   - Branch name format: `prototype/{username}/{slug}`
   - Read CLAUDE.local.md for the username.
3. Stage all changes and create a commit with a descriptive message.
4. Push the branch to GitHub.
5. Create a Pull Request using `gh pr create`:
   - Title: "Prototype: {name}"
   - Body: Brief description of the prototype with a screenshot link placeholder.
   - Label: "prototype" (create the label if it doesn't exist).
6. Output the PR URL and the Vercel preview URL format:
   - `https://jules-prototype-playground-git-{branch}-{owner}.vercel.app`

## Notes

- Vercel auto-deploys PR branches if connected.
- Each PR gets its own preview URL for stakeholder review.
- Never force-push or push to main directly.

$ARGUMENTS
