const MODAL_ID = 'confirm-clear-modal-overlay';
const OPEN_CLASS = 'open-modal';

function showConfirmationModal() {
  const modal = document.getElementById(MODAL_ID);
  if (modal) {
    modal.classList.add(OPEN_CLASS);
  }
}

function hideConfirmationModal() {
  const modal = document.getElementById(MODAL_ID);
  if (modal) {
    modal.classList.remove(OPEN_CLASS);
  }
}

export function setupClearCartConfirmation(clearCartCallback) {
  const yesBtn = document.getElementById('confirm-yes-btn');
  const noBtn = document.getElementById('confirm-no-btn');

  if (yesBtn) {
    yesBtn.addEventListener('click', () => {
      clearCartCallback();
      hideConfirmationModal();
    });
  }

  if (noBtn) {
    noBtn.addEventListener('click', () => {
      hideConfirmationModal();
    });
  }
  return showConfirmationModal;
}