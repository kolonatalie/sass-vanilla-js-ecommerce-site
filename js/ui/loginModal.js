import { setupPasswordToggle } from './passwordToggle.js';
import { setupLoginViewSwitcher, switchModalView } from './loginViewSwitcher.js';


export function setupLoginModal() {
  const modalBtn = document.querySelector(".modal-btn");
  const modal = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".close-btn");

  modalBtn.addEventListener("click", function () {
    modal.classList.add("open-modal");
  });
  closeBtn.addEventListener("click", function () {
    modal.classList.remove("open-modal");
    switchModalView('login');
  });

  setupPasswordToggle();
  setupLoginViewSwitcher(modal);
}