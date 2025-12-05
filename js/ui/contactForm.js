export function showThankYou() {

  const contactForm = document.getElementById('contact-form-box');
  const thankYouMessage = document.querySelector('.thank-you-message');

  if (contactForm && thankYouMessage) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (contactForm.checkValidity()) {
        contactForm.style.display = 'none';
        thankYouMessage.style.display = 'block';

        setTimeout(() => {
          thankYouMessage.classList.add('show');
        }, 10);
      }
    });
  }
}