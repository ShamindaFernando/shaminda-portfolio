const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    }
  });
}

const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-art, .about-copy, .page-intro, .section-heading, .info-card, .learning-item, .case-study, .interest-card, .footer-contact"
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach((element) => {
    const siblingIndex = Array.from(element.parentElement.children).indexOf(element);
    element.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 4) * 90}ms`);
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

  document.documentElement.classList.add("has-reveal");
}

const disqusThread = document.querySelector("#disqus_thread");

if (disqusThread) {
  const disqusStatus = document.querySelector("#disqus-status");
  const shortname = document.body.dataset.disqusShortname || "";

  if (!/^[a-z0-9][a-z0-9-]*$/i.test(shortname)) {
    disqusStatus.textContent = "Comments are not connected yet. Add your Disqus shortname to this page, then publish it on a domain registered in Disqus.";
  } else {
    disqusStatus.textContent = "Comments are hosted by Disqus. Please keep the discussion respectful.";
    window.disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = "shaminda-profile-comments";
    };

    const disqusScript = document.createElement("script");
    disqusScript.src = `https://${shortname}.disqus.com/embed.js`;
    disqusScript.async = true;
    document.body.appendChild(disqusScript);
  }
}
