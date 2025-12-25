document.addEventListener("DOMContentLoaded", () => {
  // --- Project carousel ---
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const projectCards = document.querySelectorAll(".project-card");

  let currentProjectIndex = 0;
  const totalProjects = projectCards.length;

  function updateProjectDisplay() {
    projectCards.forEach((card, index) => {
      card.classList.toggle("active-project", index === currentProjectIndex);
    });
    if (prevBtn) prevBtn.disabled = currentProjectIndex === 0;
    if (nextBtn) nextBtn.disabled = currentProjectIndex === totalProjects - 1;
  }

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      if (currentProjectIndex < totalProjects - 1) {
        currentProjectIndex++;
        updateProjectDisplay();
      }
    });

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      if (currentProjectIndex > 0) {
        currentProjectIndex--;
        updateProjectDisplay();
      }
    });

  updateProjectDisplay();

  // --- Smooth scrolling for internal links (progressive enhancement) ---
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        // close mobile nav if open
        const nav = document.getElementById("navMenu");
        if (nav && nav.classList.contains("show")) nav.classList.remove("show");
      }
    });
  });

  // --- Intersection Observer: toggle .in-view for scroll up/down animations ---
  const animatedEls = document.querySelectorAll(
    ".about-me-section, .education-section, .projects-section, .contact-section, .section-title, .content-box, .info-item, .timeline-item, .project-card, .contact-details-box, .lets-connect-box, .contact-form-col, .input-group"
  );

  if ("IntersectionObserver" in window && animatedEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedEls.forEach((el) => io.observe(el));
  } else {
    // Fallback: add in-view immediately
    animatedEls.forEach((el) => el.classList.add("in-view"));
  }
});

// --- Menu toggle for mobile ---
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (!nav) return;
  nav.classList.toggle("show");
}

// --- Smooth scroll helper ---
function smoothScroll(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
    const nav = document.getElementById("navMenu");
    if (nav && nav.classList.contains("show")) nav.classList.remove("show");
  }
}
