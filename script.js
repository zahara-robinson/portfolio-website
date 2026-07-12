/* GLOBAL SETTINGS */

const DISCORD_USERNAME = "_.yunoo";


/* HELPER FUNCTIONS */

/**
 * Copies text to the user's clipboard.
 * Uses the Clipboard API when available,
 * with a fallback for older browsers or local files.
 */
async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const temporaryInput = document.createElement("textarea");

    temporaryInput.value = text;
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";

    document.body.appendChild(temporaryInput);

    temporaryInput.select();
    temporaryInput.setSelectionRange(0, temporaryInput.value.length);

    const copied = document.execCommand("copy");

    temporaryInput.remove();

    return copied;
  }
}


/* DISCORD COPY BUTTONS */

const desktopDiscordLink = document.getElementById("discord-copy-link");
const mobileDiscordLink = document.getElementById("mobile-discord-copy");

async function handleDiscordCopy(event) {
  event.preventDefault();

  const copied = await copyTextToClipboard(DISCORD_USERNAME);

  if (copied) {
    alert(`Discord username copied: ${DISCORD_USERNAME}`);
  } else {
    alert(`Could not copy automatically. My Discord is: ${DISCORD_USERNAME}`);
  }
}

if (desktopDiscordLink) {
  desktopDiscordLink.addEventListener("click", handleDiscordCopy);
}

if (mobileDiscordLink) {
  mobileDiscordLink.addEventListener("click", handleDiscordCopy);
}


/* MOBILE NAVIGATION */

const mobileMenuButton = document.getElementById("mobile-menu-btn");
const mobileNavigation = document.getElementById("mobile-nav");

function closeMobileMenu() {
  if (!mobileMenuButton || !mobileNavigation) return;

  mobileNavigation.classList.remove("open");
  mobileMenuButton.classList.remove("open");

  mobileMenuButton.textContent = "☰";
  mobileMenuButton.setAttribute("aria-expanded", "false");
}

function openMobileMenu() {
  if (!mobileMenuButton || !mobileNavigation) return;

  mobileNavigation.classList.add("open");
  mobileMenuButton.classList.add("open");

  mobileMenuButton.textContent = "✕";
  mobileMenuButton.setAttribute("aria-expanded", "true");
}

if (mobileMenuButton && mobileNavigation) {
  mobileMenuButton.setAttribute("aria-expanded", "false");
  mobileMenuButton.setAttribute("aria-controls", "mobile-nav");
  mobileMenuButton.setAttribute("aria-label", "Open navigation menu");

  mobileMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = mobileNavigation.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileNavigation.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  mobileNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("click", () => {
    closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 770) {
      closeMobileMenu();
    }
  });
}


/* FEATURED PROJECT CAROUSEL */

const featuredProjects = [
  {
    title: "Ari Desktop Companion",

    description:
      "A desktop AI companion with personality-driven interactions and custom responses.",

    tech: "JavaScript / Electron / Node.js",

    image: "assets/project-previews/ari-home.png",

    github:
      "https://github.com/zahara-robinson/Ai-Companion.git",

    alt: "Preview of Ari Desktop Companion"
  },

  {
    title: "Mother's Day Gift Quest",

    description:
      "A cozy Game Boy-inspired web game about collecting gifts and creating a heartfelt story experience.",

    tech: "HTML / CSS / JavaScript",

    image: "assets/project-previews/mothers-day.png",

    github:
      "https://github.com/zahara-robinson/mama-cat-quest.git",

    alt: "Preview of Mother's Day Gift Quest"
  }
];

let currentFeaturedProjectIndex = 0;
let projectAnimationIsRunning = false;

const featuredProjectFrame = document.querySelector(
  ".featured-project-frame"
);

const featuredProjectImage = document.getElementById(
  "featured-project-image"
);

const featuredProjectTitleLink = document.getElementById(
  "featured-project-title-link"
);

const featuredProjectTitle = document.getElementById(
  "featured-project-title"
);

const featuredProjectDescription = document.getElementById(
  "featured-project-description"
);

const featuredProjectTech = document.getElementById(
  "featured-project-tech"
);

const nextProjectButton = document.getElementById("next-project");
const previousProjectButton = document.getElementById("prev-project");

const projectDots = document.querySelectorAll(".project-dot");


/**
 * Changes the visible project information.
 */
function renderFeaturedProject() {
  const project = featuredProjects[currentFeaturedProjectIndex];

  if (featuredProjectImage) {
    featuredProjectImage.src = project.image;
    featuredProjectImage.alt = project.alt;
  }

  if (featuredProjectTitleLink) {
    featuredProjectTitleLink.href = project.github;
  }

  if (featuredProjectTitle) {
    featuredProjectTitle.textContent = project.title;
  }

  if (featuredProjectDescription) {
    featuredProjectDescription.textContent = project.description;
  }

  if (featuredProjectTech) {
    featuredProjectTech.textContent = project.tech;
  }

  projectDots.forEach((dot, index) => {
    dot.classList.toggle(
      "active",
      index === currentFeaturedProjectIndex
    );
  });
}


/**
 * Changes the project using a left or right sliding animation.
 *
 * direction:
 * "next"     = slide current project left
 * "previous" = slide current project right
 */
function changeFeaturedProject(direction) {
  if (
    !featuredProjectFrame ||
    projectAnimationIsRunning
  ) {
    return;
  }

  projectAnimationIsRunning = true;

  const isNext = direction === "next";

  const exitClass = isNext
    ? "slide-out-left"
    : "slide-out-right";

  const enterClass = isNext
    ? "slide-in-right"
    : "slide-in-left";

  featuredProjectFrame.classList.add(exitClass);

  window.setTimeout(() => {
    if (isNext) {
      currentFeaturedProjectIndex =
        (currentFeaturedProjectIndex + 1) %
        featuredProjects.length;
    } else {
      currentFeaturedProjectIndex =
        (
          currentFeaturedProjectIndex -
          1 +
          featuredProjects.length
        ) % featuredProjects.length;
    }

    renderFeaturedProject();

    featuredProjectFrame.classList.remove(exitClass);
    featuredProjectFrame.classList.add(enterClass);

    window.setTimeout(() => {
      featuredProjectFrame.classList.remove(enterClass);
      projectAnimationIsRunning = false;
    }, 300);
  }, 280);
}


if (nextProjectButton) {
  nextProjectButton.addEventListener("click", () => {
    changeFeaturedProject("next");
  });
}

if (previousProjectButton) {
  previousProjectButton.addEventListener("click", () => {
    changeFeaturedProject("previous");
  });
}


/**
 * Lets users click the two slider bars directly.
 */
projectDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    if (
      index === currentFeaturedProjectIndex ||
      projectAnimationIsRunning
    ) {
      return;
    }

    const direction =
      index > currentFeaturedProjectIndex
        ? "next"
        : "previous";

    changeFeaturedProject(direction);
  });
});


/**
 * Optional keyboard support for the project carousel.
 */
document.addEventListener("keydown", (event) => {
  const projectsSection = document.getElementById("projects");

  if (!projectsSection) return;

  const projectsRect = projectsSection.getBoundingClientRect();

  const projectsAreVisible =
    projectsRect.top < window.innerHeight &&
    projectsRect.bottom > 0;

  if (!projectsAreVisible) return;

  if (event.key === "ArrowRight") {
    changeFeaturedProject("next");
  }

  if (event.key === "ArrowLeft") {
    changeFeaturedProject("previous");
  }
});


renderFeaturedProject();


/* CONTACT FORM */

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

function showFormStatus(message, statusType) {
  if (!formStatus) return;

  formStatus.textContent = message;

  formStatus.classList.remove("success", "error");
  formStatus.classList.add(statusType);

  window.setTimeout(() => {
    formStatus.textContent = "";
    formStatus.classList.remove("success", "error");
  }, 3500);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      ".contact-send-btn"
    );

    const originalButtonText = submitButton
      ? submitButton.textContent
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,

        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        showFormStatus(
          "Message sent successfully ✨",
          "success"
        );

        contactForm.reset();
      } else {
        showFormStatus(
          "Oops, something went wrong. Try again 💌",
          "error"
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);

      showFormStatus(
        "Network error. Try again in a moment 💌",
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}


/* CONTACT BOX SCROLL EFFECT */

const contactBox = document.querySelector(".contact-box");

function updateContactBoxAnimation() {
  if (!contactBox) return;

  const contactBoxTop =
    contactBox.getBoundingClientRect().top;

  const viewportHeight = window.innerHeight;

  const contactBoxShouldExpand =
    contactBoxTop < viewportHeight * 0.75;

  contactBox.classList.toggle(
    "contact-collapsed",
    !contactBoxShouldExpand
  );
}

window.addEventListener(
  "scroll",
  updateContactBoxAnimation,
  { passive: true }
);

window.addEventListener(
  "resize",
  updateContactBoxAnimation
);

window.addEventListener(
  "load",
  updateContactBoxAnimation
);

updateContactBoxAnimation();


/* SECTION SCROLL REVEAL */
const revealSections = document.querySelectorAll(
  ".reveal-section"
);

function revealSectionsOnScroll() {
  revealSections.forEach((section) => {
    const sectionTop =
      section.getBoundingClientRect().top;

    const revealPoint =
      window.innerHeight - 100;

    if (sectionTop < revealPoint) {
      section.classList.add("show-section");
    }
  });
}

revealSections.forEach((section) => {
  if (section.id === "about") {
    section.classList.add("show-section");
  } else {
    section.classList.add("reveal-ready");
  }
});

window.addEventListener(
  "scroll",
  revealSectionsOnScroll,
  { passive: true }
);

window.addEventListener(
  "resize",
  revealSectionsOnScroll
);

window.addEventListener(
  "load",
  revealSectionsOnScroll
);

revealSectionsOnScroll();


/* REDUCED MOTION SUPPORT */

const reducedMotionPreference = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (reducedMotionPreference.matches) {
  document
    .querySelectorAll(".reveal-section")
    .forEach((section) => {
      section.classList.add("show-section");
      section.classList.remove("reveal-ready");
    });

  if (contactBox) {
    contactBox.classList.remove("contact-collapsed");
  }
}