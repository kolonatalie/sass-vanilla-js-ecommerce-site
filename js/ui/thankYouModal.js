const MODAL = 'thank-you-modal-overlay';
const CLOSE_BTN = 'thank-you-close-btn';
const OPEN_CLASS = 'open-modal';
const autoClose = 3000;


export function showThankYouModal() {
  const modal = document.getElementById(MODAL);
  const closeBtn = document.getElementById(CLOSE_BTN);

  if (!modal) return;

  const closeModal = () => modal.classList.remove(OPEN_CLASS);
  modal.classList.add(OPEN_CLASS);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal, { once: true });
  }
  modal.addEventListener('click', (e) => {
    if (e.target.id === MODAL) {
      closeModal();
    }
  }, { once: true });

  setTimeout(() => {
    closeModal();
  }, autoClose);
}