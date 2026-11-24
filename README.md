Byte Bridge: Lab 2 Website

Live site:https://essieoromo9.github.io/team-website/

Team
| Name | Registration no. | GitHub username |
|------|------------------|-----------------|
| Esther Isai Oromo Saturlino | COM/6000/24 | Essieoromo9 |
| Mary Bion Anyang Kuany | COM/6273/24 | Bion Anyang |

Who drove each part
- Part 0, 2, 4: Esther Isai Oromo Saturlino (Partner A)
- Part 1, 3: Mary Bion Anyang Kuany (Partner B)

Personalisation
- Our colours: light theme primary `#1d4ed8` (primary-dark `#1e3a8a`); dark theme primary `#8fb4ff` (primary-dark `#c3d6ff`). Contrast checked: white on `#1d4ed8` is 6.7 : 1, `#0b1220` on `#8fb4ff` is 9.04 : 1, body text on background is well above 4.5 : 1.
- Projects we added: Team repository workflow (git), GitHub Pages deployment (git), Contrast-checked colour palette (css). New category: Git.
- Extension challenge(s) completed: E1 (FAQ page), E2 (follow system theme), E3 (search projects), E4 (save a draft message), E6 (real photos in `images/`, each under 150 KB with width, height and alt text).

Reflection
1. A `<button>` is focusable and can be activated with Enter and Space by default, and it tells assistive technology that it is a button. A clickable `<div>` loses both, so keyboard-only users and screen-reader users could not open the menu, and we would have to rebuild that behaviour ourselves with `tabindex`, key listeners and ARIA roles.
2. Without `defer`, the browser stops parsing the HTML when it reaches the script in the head and runs it immediately. At that moment the elements below it, such as `#year` and `.nav-toggle`, do not exist yet, so `querySelector` returns `null` and the script fails or does nothing. `defer` downloads the script while parsing continues and runs it only after the whole document is parsed.
3. `innerHTML` interprets its input as HTML. If visitors could type project titles, someone could enter markup containing a script or an event handler, and it would run in other visitors' browsers. This is cross-site scripting (XSS), and it could steal data or change the page. `textContent` treats everything as plain text, so it is safe.
4. Client-side checks only help honest users. Anyone can turn off JavaScript, edit the page in DevTools, or send a request directly with a tool like curl and skip our checks completely. The server is the only place we control, so it must validate and sanitise the same data again.
5. An origin is the combination of protocol, host and port, and `localStorage` is kept separately for each origin. Home and Contact share the origin `http://127.0.0.1:5500`, so they share the saved theme. A double-clicked file uses `file://`, which is a different origin, so it has its own separate storage and does not see the theme saved by Live Server.
6. The header, navigation and footer are copied into every HTML page. Changing the team name or adding a page means editing every file, and missing one leaves the site inconsistent. It can be avoided with components or templates in a framework, a static site generator with includes, or JavaScript that inserts the shared header and footer.

Extension question (E6)
Should the alt text repeat the person's name when the name is already in the heading right below the photo? No. A screen reader would read the name twice, so the alt describes the image instead (for example hairstyle and clothing), and the heading supplies the name.
