export function showToast(message, type = 'success', duration = 4000) {
  
  const container = document.getElementById('toast-container');
  if (!container) {
    return;
  }

  const toast = document.createElement('div');
  toast.classList.add('toast', type);
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('visible');
  }, 10); 

  setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    }, { once: true });
  }, duration);
}