const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isOpen);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const textRevealSelector = [
  ".wordmark-caption",
  ".primary-nav a",
  ".hero .eyebrow",
  ".hero-summary",
  ".hero-actions a",
  ".proof-item",
  "main p:not(.hero-summary)",
  "main h2",
  "main h3",
  "main .eyebrow",
  "main .skill-label",
  "main .project-meta",
  "main .tag-list span",
  "main .timeline-date",
  "main .timeline-title > span",
  "main .training-list > span",
  ".contact-links a",
  ".site-footer > span",
  ".back-to-top"
].join(", ");
const textRevealItems = document.querySelectorAll(textRevealSelector);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const textRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-text-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

  textRevealItems.forEach((item, index) => {
    item.classList.add("text-reveal");
    item.style.transitionDelay = `${(index % 4) * 65}ms`;
    textRevealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  textRevealItems.forEach((item) => item.classList.add("is-text-visible"));
}