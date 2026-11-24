Git and deployment steps (Lab 2, Parts 0 and 6)

Replace PARTNER-A-USERNAME, names and emails with real ones.

1. Create the repository (Partner A)
1. On GitHub create a **public** repository named `team-website` with *Add a README file* ticked.
2. Settings > Collaborators > Add people > invite Partner B.
3. Clone it:

```bash
git clone https://github.com/PARTNER-A-USERNAME/team-website.git
cd team-website
code .
```

2. Add this project
Copy everything from this folder (`index.html`, `projects.html`, `faq.html`, `contact.html`, `css/`, `js/`, `images/`, `README.md`, `git-setup.sh`) into the cloned folder, replacing the generated README.

3. Commit with credit for both partners
Quickest way: open `git-setup.sh`, put in both GitHub emails, then run `bash git-setup.sh` inside the cloned folder. It makes one commit per part with the right co-author and pushes. Or do it by hand:

Repeat after each part, switching whose name is in the trailer.

```bash
git add .
git commit -m "Set up project structure" -m "Co-authored-by: Partner Name <partner-email@example.com>"
git push
```

Suggested commit messages, matching the lab checkpoints:
- Set up project structure
- Add home page structure
- Add projects and contact pages
- Style the site with a shared stylesheet
- Add interactivity with JavaScript
- Personalise site and add extensions
- Complete README

Partner B should run `git pull` before every work session.

4. Test before deploying
- Paste each page into https://validator.w3.org/ and fix any errors.
- Open the site with Live Server, check the Console for red errors.
- Use only the keyboard on every page; focus must always be visible.
- At 375 px width (Ctrl+Shift+M) nothing overflows and the menu works.
- Run Lighthouse; Accessibility must be 90 or higher on every page.

5. Publish with GitHub Pages
1. `git status` should say *nothing to commit, working tree clean*.
2. Repository Settings > Pages > Source: **Deploy from a branch**, branch `main`, folder `/ (root)`, Save.
3. After a minute or two the site is live at `https://PARTNER-A-USERNAME.github.io/team-website/`.
4. Test every page on a phone and a laptop.

6. Submit
Both partners submit the repository URL and the live GitHub Pages URL on the course portal before the next lab.
