/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");

  menuToggle.textContent = "☰";
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

/* =========================
   DARK AND LIGHT THEME
========================= */

const themeToggle = document.getElementById("themeToggle");

let currentTheme = "light";

try {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    currentTheme = savedTheme;
  }
} catch (error) {
  console.warn("Browser storage is unavailable.");
}

function applyTheme(theme) {
  currentTheme = theme;

  document.body.classList.toggle("dark-theme", theme === "dark");

  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  const newTheme = currentTheme === "light" ? "dark" : "light";

  applyTheme(newTheme);

  try {
    localStorage.setItem("portfolio-theme", newTheme);
  } catch (error) {
    console.warn("Theme could not be saved.");
  }
});

/* =========================
   PROJECT DATA
========================= */

const projects = [
  {
    title: "Personal Portfolio Website",

    description:
      "A responsive personal website introducing my background, skills and projects.",

    category: "websites",

    technologies: ["HTML", "CSS", "JavaScript"],

    url: "https://portfolio-web-fawn-three.vercel.app",
  },

  {
    title: "tic tac toe game",

    description: "old project. made 2 years ago",

    category: "websites",

    technologies: ["REACT"],

    url: "https://silly-heliotrope-085a4f.netlify.app",
  },

  {
    title: "Folio Browse",

    description:
      "Folio Browse is a lightweight React app for discovering developer portfolios. It gives you a curated archive of portfolios, searchable by name or tagline, with quick alphabet navigation and a randomizer for browsing inspiration.",

    category: "javascript",

    technologies: ["REACT", "TAILWIND"],

    url: "https://tacesept.github.io/folio-browse/",
  },

  {
    title: "To-Do List App",

    description:
      "A task management application that allows users to add and remove tasks.",

    category: "javascript",

    technologies: ["HTML", "CSS", "JavaScript"],

    url: "https://tacesept.github.io/todo-app-html-css-js/",
  },
];

/* =========================
   RENDER PROJECT CARDS
========================= */

const projectsGrid = document.getElementById("projectsGrid");
const resultCount = document.getElementById("resultCount");

function renderProjects(category = "all") {
  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((project) => project.category === category);

  projectsGrid.replaceChildren();

  filteredProjects.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const number = document.createElement("div");
    number.className = "project-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "project-category";
    categoryLabel.textContent =
      project.category === "websites" ? "Website" : "JavaScript App";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const technologies = document.createElement("div");
    technologies.className = "project-tech";

    project.technologies.forEach((tech) => {
      const tag = document.createElement("span");
      tag.textContent = tech;

      technologies.appendChild(tag);
    });

    const link = document.createElement("a");

    link.className = "project-link";
    link.href = project.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View Live Page →";

    card.append(number, categoryLabel, title, description, technologies, link);

    projectsGrid.appendChild(card);
  });

  resultCount.textContent = `${filteredProjects.length} projects found`;
}

/* =========================
   PROJECT CATEGORY FILTERS
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((btn) => {
      const isActive = btn === button;

      btn.classList.toggle("active", isActive);
    });

    renderProjects(selectedCategory);
  });
});

// Display all projects when the page loads.
renderProjects();

/* =========================
   CONTACT FORM VALIDATION
========================= */

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const charCount = document.getElementById("charCount");
const formStatus = document.getElementById("formStatus");

/* Update character count */

function updateCharacterCount() {
  const length = messageInput.value.length;

  charCount.textContent = `${length} / 500 characters`;
}

messageInput.addEventListener("input", updateCharacterCount);

/* Validate individual fields */

function validateName() {
  const value = nameInput.value.trim();

  if (value.length < 2) {
    nameError.textContent = "Name must contain at least 2 characters.";

    return false;
  }

  nameError.textContent = "";

  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(value)) {
    emailError.textContent = "Please enter a valid email address.";

    return false;
  }

  emailError.textContent = "";

  return true;
}

function validateMessage() {
  const value = messageInput.value.trim();

  if (value.length < 20) {
    messageError.textContent = "Message must contain at least 20 characters.";

    return false;
  }

  if (value.length > 500) {
    messageError.textContent = "Message cannot exceed 500 characters.";

    return false;
  }

  messageError.textContent = "";

  return true;
}

/* Clear errors when fields become valid */

nameInput.addEventListener("input", () => {
  validateName();
  formStatus.textContent = "";
});

emailInput.addEventListener("input", () => {
  validateEmail();
  formStatus.textContent = "";
});

messageInput.addEventListener("input", () => {
  validateMessage();
  formStatus.textContent = "";
});

/* Handle form submission */

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent = "";

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (!isNameValid) {
    nameInput.focus();

    return;
  }

  if (!isEmailValid) {
    emailInput.focus();

    return;
  }

  if (!isMessageValid) {
    messageInput.focus();

    return;
  }

  // Demo only: no message is sent to a server.

  formStatus.textContent = "Demo only. Your message has not been sent.";

  contactForm.reset();

  updateCharacterCount();
});

/* =========================
   CURRENT FOOTER YEAR
========================= */

document.getElementById("currentYear").textContent = new Date().getFullYear();
