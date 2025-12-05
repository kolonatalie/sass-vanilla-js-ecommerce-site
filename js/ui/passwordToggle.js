export function setupPasswordToggle() {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeSlashIcon = document.getElementById('eye-slash-icon');

  if (passwordInput && eyeIcon && eyeSlashIcon) {
    eyeIcon.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      if (type === 'text') {
        eyeIcon.style.display = 'none';
        eyeSlashIcon.style.display = 'block';
      } else {
        eyeIcon.style.display = 'block';
        eyeSlashIcon.style.display = 'none';
      }
    });

    eyeSlashIcon.addEventListener('click', function () {
      passwordInput.setAttribute('type', 'password');

      eyeIcon.style.display = 'block';
      eyeSlashIcon.style.display = 'none';
    });
  }
}