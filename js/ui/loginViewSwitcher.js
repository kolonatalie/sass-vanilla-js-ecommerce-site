export function switchModalView(view) {
  const loginContent = document.getElementById('login-form-content');
  const forgotContent = document.getElementById('forgot-password-content');

  if (view === 'forgot') {
    if (loginContent) loginContent.style.display = 'none';
    if (forgotContent) forgotContent.style.display = 'block';
  } else {
    if (loginContent) loginContent.style.display = 'block';
    if (forgotContent) forgotContent.style.display = 'none';
  }
}

export function setupLoginViewSwitcher(modalElement) {
  const forgotLink = document.getElementById('forgot-password-link');
  const backToLoginLink = document.getElementById('back-to-login-link');

  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchModalView('forgot');
    });
  }

  if (backToLoginLink) {
    backToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchModalView('login');
    });
  }

  const resetBtn = document.querySelector('.reset-btn');
  const resetForm = document.getElementById('reset-password-form');

  if (resetForm && resetBtn) {
    resetForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('reset-email');
      if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        return;
      }
      resetForm.reset();
      if (modalElement) modalElement.classList.remove("open-modal");
      switchModalView('login');
    });
  }
}