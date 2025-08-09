// === Sticky Navigation ===
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const header = document.querySelector("header");
  if (!nav || !header) return;

  const navOffset = header.offsetHeight;
  nav.classList.toggle("sticky", window.scrollY >= navOffset);
});

// === Smooth Scroll for Anchor Links ===
document.addEventListener("DOMContentLoaded", () => {
  // Set saved or default language
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);

  // Smooth scroll for internal links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const offset = document.querySelector("nav").offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
});

// === Translations ===
const translations = {
  en: {
    pageTitle: "Home",
    studioTitle: "Studio Name / Architect Name",
    tagline: "Simple architecture portfolio",
    navHome: "Home",
    navIntro: "Introduction",
    navProjectsInterior: "Interior Design",
    navProjectsExterior: "Exterior Design",
    navProjectsBIM: "BIM Projects",
    navContact: "Contact",
    welcome: "Welcome",
    introText: "This is a simple architecture portfolio showcasing key works, design philosophies, and contact details. Feel free to browse through the site to learn more.",
    featuredProjects: "Featured Projects",
    viewAllProjects: "View All Projects",
    introHeading: "Introduction",
    footerRights: "All rights reserved.",
    projectOneTitle: "Modern Villa",
    projectOneText: "Minimalist home design focused on open light and sustainable materials.",
    projectTwoTitle: "Urban Pavilion",
    projectTwoText: "Public structure merging nature and geometry in a vibrant city center.",
    contactHeading: "Communication",
    contactText: "If you'd like to get in touch about collaborations, feedback, or job opportunities, feel free to email me at"
  },
  fr: {
    pageTitle: "Accueil",
    studioTitle: "Nom du Studio / Nom de l’Architecte",
    tagline: "Portfolio d’architecture",
    navHome: "Accueil",
    navIntro: "Introduction",
    navProjectsInterior: "Design Intérieur",
    navProjectsExterior: "Design Extérieur",
    navProjectsBIM: "Projets BIM",
    navContact: "Contact",
    welcome: "Bienvenue",
    introText: "Ceci est un portfolio d'architecture simple présentant des œuvres clés, des philosophies de conception et des coordonnées.",
    featuredProjects: "Projets en vedette",
    viewAllProjects: "Voir tous les projets",
    introHeading: "Introduction",
    footerRights: "Tous droits réservés.",
    projectOneTitle: "Villa Moderne",
    projectOneText: "Conception de maison minimaliste axée sur la lumière naturelle et les matériaux durables.",
    projectTwoTitle: "Pavillon Urbain",
    projectTwoText: "Structure publique fusionnant nature et géométrie dans un centre-ville vibrant.",
    contactHeading: "Communication",
    contactText: "Si vous souhaitez me contacter pour une collaboration, un retour ou des opportunités professionnelles, n'hésitez pas à m'écrire à"
  }
};

// === Apply Language to DOM ===
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = translations[lang]?.[key];
    if (translation) el.textContent = translation;
  });
  localStorage.setItem("language", lang);
}

//animation

// Fade-in on scroll for elements with 'fade-in-section' class
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in-section");

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // fade-in only once
      }
    });
  }, {
    threshold: 0.1
  });

  faders.forEach(fader => appearOnScroll.observe(fader));
});

// Image Modal Logic
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const cards = document.querySelectorAll(".project-card img");

  cards.forEach(card => {
    card.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      modalImg.alt = this.alt;
    });
  });

  window.closeModal = function () {
    modal.style.display = "none";
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentImages = [];
  let currentIndex = 0;

  function openModal(images, index = 0) {
    currentImages = images;
    currentIndex = index;
    modal.style.display = "block";
    modalImg.src = currentImages[currentIndex];
  }

  window.closeModal = function () {
    modal.style.display = "none";
  };

  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex];
  }

  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  // Attach click listener to all project cards
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      const imageList = card.getAttribute("data-images").split(",");
      openModal(imageList);
    });
  });
});
