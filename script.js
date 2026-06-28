const ariModal = document.getElementById("ari-modal");
const mothersdayModal = document.getElementById("mothersday-modal");
const closeBtnImg = document.querySelector(".close-modal img");

function openModal(modal) {
  const modalContent = modal.querySelector(".modal-content");

  modalContent.style.left = "";
  modalContent.style.top = "";
  modalContent.style.position = "";

  modalContent.classList.remove("dragging");

  modal.classList.add("show-modal");
}

// open + close modals
document.addEventListener("click", (e) => {

  // open Ari modal
  if (e.target.closest("#ari-card")) {
    openModal(ariModal);
  }

  // open Mother's Day modal
  if (e.target.closest("#mothersday-card")) {
    openModal(mothersdayModal);
  }

  // close button
  if (e.target.closest(".close-modal")) {

    ariModal.classList.remove("show-modal");
    mothersdayModal.classList.remove("show-modal");

    document.querySelectorAll(".modal-content").forEach((modalContent) => {
      modalContent.classList.remove("dragging");
    });
  }

  // click outside Ari modal
  if (e.target === ariModal) {

    ariModal.classList.remove("show-modal");

    document.querySelectorAll(".modal-content").forEach((modalContent) => {
      modalContent.classList.remove("dragging");
    });
  }

  // click outside Mother's Day modal
  if (e.target === mothersdayModal) {

    mothersdayModal.classList.remove("show-modal");

    document.querySelectorAll(".modal-content").forEach((modalContent) => {
      modalContent.classList.remove("dragging");
    });
  }
});

// X button hover effect
document.querySelectorAll(".close-modal img").forEach((img) => {

  img.addEventListener("mouseenter", () => {
    img.src = "assets/images/x_button_hover.png";
  });

  img.addEventListener("mouseleave", () => {
    img.src = "assets/images/x_button.png";
  });
});

// draggable modals
document.querySelectorAll(".modal-header").forEach((modalHeader) => {

  const modalContent = modalHeader.closest(".modal-content");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  modalHeader.addEventListener("mousedown", (e) => {

    isDragging = true;

    const rect = modalContent.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    modalContent.classList.add("dragging");
  });

  document.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    modalContent.style.position = "fixed";

    modalContent.style.left = `${e.clientX - offsetX}px`;
    modalContent.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {

    isDragging = false;

    modalContent.classList.remove("dragging");
  });
});

const aboutSection = document.getElementById("about");
const leftCloud = document.querySelector(".cloud-left");
const rightCloud = document.querySelector(".cloud-right");

window.addEventListener("scroll", () => {
  const aboutHeight = aboutSection.offsetHeight;

  let progress = window.scrollY / aboutHeight;

  progress = Math.min(Math.max(progress, 0), 1);

  const moveAmount = progress * 100;

  leftCloud.style.transform = `translateX(-${moveAmount}%)`;
  rightCloud.style.transform = `translateX(${moveAmount}%)`;
});

// status //

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

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
      formStatus.textContent = "Message sent successfully ✨";
      formStatus.classList.add("success");
      contactForm.reset();
    } else {
      formStatus.textContent = "Oops, something went wrong. Try again 💌";
      formStatus.classList.add("error");
    }
  } catch {
    formStatus.textContent = "Network error. Try again in a moment 💌";
    formStatus.classList.add("error");
  }

  setTimeout(() => {
    formStatus.textContent = "";
    formStatus.classList.remove("success", "error");
  }, 3500);
});

// scroll reveal animations

const revealSections = document.querySelectorAll(".reveal-section");

function revealOnScroll() {
  revealSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("show-section");
    }
  });
}

revealSections.forEach((section) => {
  if (section.id !== "about") {
    section.classList.add("reveal-ready");
  } else {
    section.classList.add("show-section");
  }
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

revealOnScroll();

// contact box expand / shrink on scroll

const contactBox = document.querySelector(".contact-box");

function animateContactBox() {
  if (!contactBox) return;

  const boxTop = contactBox.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (boxTop < windowHeight * 0.75) {
    contactBox.classList.remove("contact-collapsed");
  } else {
    contactBox.classList.add("contact-collapsed");
  }
}

window.addEventListener("scroll", animateContactBox);
window.addEventListener("load", animateContactBox);

animateContactBox();

const discordCopyLink = document.getElementById("discord-copy-link");

if (discordCopyLink) {
  discordCopyLink.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("_.yunoo");
      alert("Discord username copied: _.yunoo");
    } catch {
      alert("Could not copy Discord username.");
    }
  });
}

document
  .querySelector(".featured-project-image")
  .addEventListener("click", () => {
    document
      .getElementById("ari-modal")
      .classList.add("show-modal");
  });

  // featured project carousel

const featuredProjects = [
  {
    title: "Airi The Desktop Companion",
    description:
      "A desktop AI companion with personality-driven interactions and custom responses.",
    tech: "JavaScript / Electron / Node.js",
    image: "assets/project-previews/ari-home.png",
    github: "https://github.com/zahara-robinson/Ai-Companion.git",
    alt: "Ari Desktop Companion Preview"
  },
  {
    title: "Mother's Day Gift Quest",
    description:
      "A cozy Game Boy-inspired web game about collecting gifts and creating a heartfelt story experience.",
    tech: "HTML / CSS / JavaScript",
    image: "assets/project-previews/mothers-day.png",
    github: "https://github.com/zahara-robinson/mama-cat-quest.git",
    alt: "Mother's Day Gift Quest Preview"
  }
];

let currentFeaturedProject = 0;

const featuredImage = document.getElementById("featured-project-image");
const featuredLink = document.getElementById("featured-project-link");
const featuredTitle = document.getElementById("featured-project-title");
const featuredDescription = document.getElementById("featured-project-description");
const featuredTech = document.getElementById("featured-project-tech");

const nextProjectBtn = document.getElementById("next-project");
const prevProjectBtn = document.getElementById("prev-project");

function updateFeaturedProject() {
  const project = featuredProjects[currentFeaturedProject];

  featuredImage.src = project.image;
  featuredImage.alt = project.alt;
  featuredLink.href = project.github;
  featuredTitle.textContent = project.title;
  featuredDescription.textContent = project.description;
  featuredTech.textContent = project.tech;
}

nextProjectBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentFeaturedProject = (currentFeaturedProject + 1) % featuredProjects.length;
  updateFeaturedProject();
});

prevProjectBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentFeaturedProject =
    (currentFeaturedProject - 1 + featuredProjects.length) % featuredProjects.length;
  updateFeaturedProject();
});