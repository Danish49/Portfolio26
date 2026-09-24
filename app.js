const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelectorAll(".nav-link, .mobile-menu a");
const sections = document.querySelectorAll("main section[id]");
const reveals = document.querySelectorAll(".reveal");
const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");

menuToggle?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    document.querySelectorAll(".desktop-nav .nav-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

form?.addEventListener("submit", () => {
  status.textContent = "Sending your message…";
});

window.addEventListener("scroll", () => {
  document.querySelector(".site-header")?.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });
