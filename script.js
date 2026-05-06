const ariCard = document.getElementById("ari-card");
const ariModal = document.getElementById("ari-modal");
const closeBtnImg = document.querySelector(".close-modal img");

document.addEventListener("click", (e) => {
    if (e.target.closest("#ari-card")) {
        ariModal.classList.add("show-modal");
  }

    if (e.target.closest(".close-modal")) {
        ariModal.classList.remove("show-modal");
  }

    if (e.target === ariModal) {
        ariModal.classList.remove("show-modal");
  }
});

closeBtnImg.addEventListener("mouseenter", () => {
  closeBtnImg.src = "assets/images/x_button_hover.png";
});

closeBtnImg.addEventListener("mouseleave", () => {
  closeBtnImg.src = "assets/images/x_button.png";
});