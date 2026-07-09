/**
 * main.js — Gabriel Davinche Manalu Portfolio
 * Custom JS: preloader, navbar, scroll-top, hero role rotator,
 *            AOS init, skill bars, project filter.
 */

(function () {
  "use strict";

  /* ============================================================
     1. PRELOADER
     ============================================================ */
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 400);
    });
  }

  /* ============================================================
     2. NAVBAR — sticky shadow + mobile toggle
     ============================================================ */
  const header = document.getElementById("header");

  // Add shadow on scroll
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navList      = document.querySelector(".navmenu ul");

  if (mobileToggle && navList) {
    mobileToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("mobile-open");
      mobileToggle.classList.toggle("bi-list", !open);
      mobileToggle.classList.toggle("bi-x",    open);
    });

    // Close on link click
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("mobile-open");
        mobileToggle.classList.add("bi-list");
        mobileToggle.classList.remove("bi-x");
      });
    });
  }

  /* ============================================================
     3. SCROLL TOP BUTTON
     ============================================================ */
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    function toggleScrollTop() {
      scrollTopBtn.classList.toggle("active", window.scrollY > 300);
    }

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    toggleScrollTop(); // initial check
  }

  /* ============================================================
     4. HERO ROLE ROTATOR (index.html only)
     ============================================================ */
  const heroRoleEl = document.getElementById("heroRole");
  if (heroRoleEl) {
    const roles = [
      "AI & Machine Learning Enthusiast",
      "UI/UX Designer",
      "Computer Vision Engineer",
      "Problem Solver",
    ];
    let roleIndex = 0;

    function rotateRole() {
      // Fade out
      heroRoleEl.classList.add("fade-out");
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        heroRoleEl.textContent = roles[roleIndex];
        heroRoleEl.classList.remove("fade-out");
      }, 400);
    }

    setInterval(rotateRole, 2800);
  }

  /* ============================================================
     5. AOS INIT
     ============================================================ */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 550,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }

  /* ============================================================
     6. SKILL BAR ANIMATION (about.html)
     Uses IntersectionObserver — no Waypoints dependency
     ============================================================ */
  const skillsWrapper = document.querySelector(".skills-animation");
  if (skillsWrapper) {
    const animateBars = () => {
      skillsWrapper.querySelectorAll(".skill-bar").forEach((bar) => {
        const target = bar.getAttribute("aria-valuenow");
        bar.style.width = target + "%";
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(skillsWrapper);
  }

  /* ============================================================
     7. PROJECT FILTER (experience.html)
     Lightweight show/hide — no Isotope needed
     ============================================================ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll("#projectsGrid [data-category]");

  if (filterBtns.length && projectItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active state
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectItems.forEach((item) => {
          const cat = item.getAttribute("data-category");
          const show = filter === "all" || cat === filter;

          item.style.transition = "opacity 0.25s ease, transform 0.25s ease";

          if (show) {
            item.style.display = "";
            // Micro-delay to allow display change before opacity
            requestAnimationFrame(() => {
              item.style.opacity = "1";
              item.style.transform = "translateY(0)";
            });
          } else {
            item.style.opacity = "0";
            item.style.transform = "translateY(8px)";
            setTimeout(() => {
              if (btn.getAttribute("data-filter") !== "all" &&
                  item.getAttribute("data-category") !== btn.getAttribute("data-filter")) {
                item.style.display = "none";
              }
            }, 250);
          }
        });
      });
    });
  }

  /* ============================================================
     8. EXPERIENCE TAB SCROLL HIGHLIGHT
     Highlights the tab whose section is in view
     ============================================================ */
  const expTabs    = document.querySelectorAll(".exp-tab");
  const expSections = document.querySelectorAll("#projects, #certificates, #organizations, #achievements");

  if (expTabs.length && expSections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            expTabs.forEach((tab) => {
              tab.classList.toggle(
                "active",
                tab.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-72px 0px 0px 0px" }
    );

    expSections.forEach((section) => sectionObserver.observe(section));
  }

  /* ============================================================
     9. CONTACT FORM — loading state (contact.html)
     ============================================================ */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      const btn      = document.getElementById("submitBtn");
      const btnText  = btn?.querySelector(".btn-text");
      const btnLoad  = btn?.querySelector(".btn-loading");
      if (btn && btnText && btnLoad) {
        btnText.classList.add("d-none");
        btnLoad.classList.remove("d-none");
        btn.disabled = true;
      }
    });
  }

})();
