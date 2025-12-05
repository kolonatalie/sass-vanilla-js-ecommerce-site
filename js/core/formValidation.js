function showError(inputElement, errorElement) {
  let message = '';

  if (inputElement.validity.valueMissing) {
    message = `${inputElement.name} is required`;
  } else if (inputElement.validity.typeMismatch) {

    if (inputElement.type === 'email') {
      message = 'Please enter a valid email address';
    } else {
      message = `Please enter a valid ${inputElement.type}`;
    }
  } else if (inputElement.validity.patternMismatch) {

    if (inputElement.type === 'email') {
      message = 'Enter valid email e.g. name@example.com';
    } else {
      message = 'Please match the required format';
    }
  }

  errorElement.textContent = message;
  inputElement.classList.add('invalid-input');
  errorElement.classList.add('show');
}


function setupValidation(inputElement, errorElement) {
  inputElement.addEventListener('invalid', function (event) {
    event.preventDefault();
    showError(inputElement, errorElement);
  });

  inputElement.addEventListener('input', function () {
    if (inputElement.validity.valid) {
      inputElement.classList.remove('invalid-input');
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    } else {
      showError(inputElement, errorElement);
    }
  });
}


export function initializeFormValidation() {

  const requiredInputs = document.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    const errorElement = document.querySelector(`#${input.id}-error`);

    if (errorElement) {
      setupValidation(input, errorElement);
    }
  });
}