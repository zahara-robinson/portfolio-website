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