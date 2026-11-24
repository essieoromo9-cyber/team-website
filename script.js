/* =====================================================
   Byte Bridge script (CSC 216, Lab 2)
   Loaded on every page with `defer`, so the HTML is
   fully parsed before any of this code runs.
   ===================================================== */

/* ---------- 1. Shared: runs on every page ---------- */

// Put the current year in the footer.
const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Open and close the navigation menu on small screens.
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Dark mode, remembered across pages and visits.
// If nothing is saved yet, follow the operating system's preference (Extension E2).
const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'team-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

function getStartingTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    return saved;
  }
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return systemPrefersDark ? 'dark' : 'light';
}

applyTheme(getStartingTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}

/* ---------- 2. Projects page ---------- */

const projects = [
  { title: 'Personal landing page', category: 'html', description: 'A single semantic HTML page with headings, lists and links.' },
  { title: 'Responsive card grid', category: 'css', description: 'A layout that goes from one column on phones to three on laptops.' },
  { title: 'Tip calculator', category: 'js', description: 'Reads two inputs and updates the total as you type.' },
  { title: 'Accessible contact form', category: 'html', description: 'Labelled fields, helpful errors and keyboard-friendly controls.' },
  { title: 'Dark mode toggle', category: 'js', description: 'Switches the colour theme and remembers the choice.' },
  { title: 'Flexbox navigation bar', category: 'css', description: 'A header that collapses into a menu button on small screens.' },
  // Our own projects (Part 5), including the new "git" category.
  { title: 'Team repository workflow', category: 'git', description: 'A shared GitHub repository where we commit after every part and credit each other as co-authors.' },
  { title: 'GitHub Pages deployment', category: 'git', description: 'Publishing this site live straight from the main branch of our repository.' },
  { title: 'Contrast-checked colour palette', category: 'css', description: 'A custom blue theme for light and dark mode, tested for at least 4.5 : 1 text contrast.' }
];

const categoryNames = { html: 'HTML', css: 'CSS', js: 'JavaScript', git: 'Git' };

const projectList = document.querySelector('#project-list');
const projectCount = document.querySelector('#project-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('#project-search');

// The page remembers the current filter and search text (Extension E3).
let currentFilter = 'all';
let currentQuery = '';

function renderProjects() {
  const query = currentQuery.trim().toLowerCase();

  const visible = projects.filter((project) => {
    const matchesCategory = currentFilter === 'all' || project.category === currentFilter;
    const matchesSearch =
      query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  projectList.replaceChildren();

  if (visible.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-message';
    empty.textContent = 'No projects match your search. Try a different word or filter.';
    projectList.append(empty);
  }

  visible.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'card';

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = categoryNames[project.category];

    const heading = document.createElement('h3');
    heading.textContent = project.title;

    const text = document.createElement('p');
    text.textContent = project.description;

    card.append(tag, heading, text);
    projectList.append(card);
  });

  projectCount.textContent = `Showing ${visible.length} of ${projects.length} projects`;
}

if (projectList) {
  renderProjects();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      currentFilter = button.dataset.filter;
      renderProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentQuery = searchInput.value;
      renderProjects();
    });
  }
}

/* ---------- 3. Contact page ---------- */

const form = document.querySelector('#contact-form');

if (form) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const charCount = document.querySelector('#char-count');
  const statusEl = document.querySelector('#form-status');

  // Draft saving (Extension E4): keep half-written messages for when the visitor returns.
  const DRAFT_KEY = 'team-message-draft';

  const savedDraft = localStorage.getItem(DRAFT_KEY);
  if (savedDraft) {
    messageInput.value = savedDraft;
    charCount.textContent = savedDraft.length;
  }

  // Live character counter, and save the draft on every change.
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
    localStorage.setItem(DRAFT_KEY, messageInput.value);
  });

  // Show (or clear) the error message under one field.
  function showError(input, message) {
    const errorEl = document.querySelector(`#${input.id}-error`);
    errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  // Check every field. Returns true only if all are valid.
  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      showError(nameInput, '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Enter an email address like name@example.com.');
      isValid = false;
    } else {
      showError(emailInput, '');
    }

    if (messageInput.value.trim().length < 20) {
      showError(messageInput, 'Your message needs at least 20 characters.');
      isValid = false;
    } else {
      showError(messageInput, '');
    }

    return isValid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusEl.textContent = '';

    if (!validateForm()) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const firstName = nameInput.value.trim().split(' ')[0];
    statusEl.textContent = `Thanks, ${firstName}! Your message is ready. (We connect this form to a real server later.)`;
    form.reset();
    localStorage.removeItem(DRAFT_KEY);
    charCount.textContent = '0';
  });
}
