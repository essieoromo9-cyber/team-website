!/usr/bin/env bash
Git work for Lab 2: commits each part with a co-author trailer, then pushes.
Run from INSIDE your cloned team-website folder, after copying these files in.
Usage: edit the 4 values below, then:  bash git-setup.sh
set -e

ESTHER_NAME="Esther Isai Oromo Saturlino"
ESTHER_EMAIL="ESTHER-GITHUB-EMAIL@example.com"   # email added to Esther's GitHub account
MARY_NAME="Mary Bion Anyang Kuany"
MARY_EMAIL="MARY-GITHUB-EMAIL@example.com"       # email added to Mary's GitHub account

Whoever runs this is the commit author; the other person is the co-author.
Esther (Partner A) drives Parts 0, 2, 4; Mary (Partner B) drives Parts 1, 3.
commit() {  # commit "message" "Co-author Name" "co-author email"
  git commit -m "$1" -m "Co-authored-by: $2 <$3>"
}

git config user.name  "$ESTHER_NAME"
git config user.email "$ESTHER_EMAIL"
git add README.md DEPLOY.md git-setup.sh css js
commit "Set up project structure" "$MARY_NAME" "$MARY_EMAIL"

git config user.name  "$MARY_NAME"
git config user.email "$MARY_EMAIL"
git add index.html
commit "Add home page structure" "$ESTHER_NAME" "$ESTHER_EMAIL"

git config user.name  "$ESTHER_NAME"
git config user.email "$ESTHER_EMAIL"
git add projects.html contact.html faq.html
commit "Add projects, contact and FAQ pages" "$MARY_NAME" "$MARY_EMAIL"

git config user.name  "$MARY_NAME"
git config user.email "$MARY_EMAIL"
git add images
commit "Add team photos" "$ESTHER_NAME" "$ESTHER_EMAIL"

git add -A
git diff --cached --quiet || commit "Personalise site and complete README" "$ESTHER_NAME" "$ESTHER_EMAIL"

git push
echo "Done. Now enable GitHub Pages: Settings > Pages > Deploy from branch > main > / (root)."
