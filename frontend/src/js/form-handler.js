import axios from 'axios';

// ERROR MESSAGES
const ERROR_MESSAGES = {
  FORM_SEND_ERROR: 'An error occurred while sending the form. Please try again later.',
  RESOURCE_NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An internal server error occurred. Please try again later.',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again later.',
};

const fields = [
  {
    id: 'name',
    errorClass: 'contact__form-error-name',
    inputClass: 'contact__form-inputs-item--name',
    maxLength: 50,
    errorMessages: {
      REQUIRED: 'Please enter a name',
      TOO_LONG: 'Name is too long',
    },
  },
  {
    id: 'email',
    errorClass: 'contact__form-error-email',
    inputClass: 'contact__form-inputs-item--email',
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
    errorMessages: {
      REQUIRED: 'Please enter an email address',
      INVALID: 'Please enter a valid email address',
      TOO_LONG: 'Email address is too long',
    },
  },
  {
    id: 'message',
    errorClass: 'contact__form-error-message',
    inputClass: 'contact__form-inputs-item--message',
    maxLength: 2000,
    errorMessages: {
      REQUIRED: 'Please enter a message',
      TOO_LONG: 'Message is too long',
    },
  },
];

// UI helpers
function showError(errorElement, message) {
  errorElement.style.display = 'block';
  errorElement.textContent = message;
  errorElement.setAttribute('aria-live', 'assertive');
}

function hideError(errorElement) {
  errorElement.style.display = 'none';
  errorElement.textContent = '';
  errorElement.removeAttribute('aria-live');
}

function toggleLoading(elements, isLoading) {
  elements.loadingOverlay.style.display = isLoading ? 'block' : 'none';
  elements.loader.style.display = isLoading ? 'block' : 'none';
}

function handleSuccessResponse(elements) {
  Object.values(elements.errors).forEach(hideError);
  elements.form.reset();

  elements.successMessage.style.display = 'block';
  setTimeout(() => {
    elements.successMessage.style.display = 'none';
  }, 4000);
}

function showErrorToast(elements, message) {
  elements.toast.style.display = 'block';
  elements.toast.textContent = message;
  setTimeout(() => {
    elements.toast.style.display = 'none';
  }, 4000);
}

// Validation
function validateForm(elements) {
  let formIsValid = true;

  fields.forEach((field) => {
    const value = elements.inputs[field.id].value.trim();
    const errorElement = elements.errors[field.id];
    let message = '';

    if (!value) {
      message = field.errorMessages.REQUIRED;
    } else if (field.emailPattern && !field.emailPattern.test(value)) {
      message = field.errorMessages.INVALID;
    } else if (value.length > field.maxLength) {
      message = field.errorMessages.TOO_LONG;
    }

    if (message) {
      showError(errorElement, message);
      formIsValid = false;
    } else {
      hideError(errorElement);
    }
  });
  return formIsValid;
}

function showBackendValidationErrors(elements, errors) {
  fields.forEach((field) => {
    const errorElement = elements.errors[field.id];

    if (errors[field.id]) {
      const code = errors[field.id]; // e.g. "REQUIRED" or "INVALID"
      const message = field.errorMessages[code];
      showError(errorElement, message);
    } else {
      hideError(errorElement);
    }
  });
}

// Error handling
function handleErrorResponse(elements, status) {
  let message;

  if (status === 404) {
    message = ERROR_MESSAGES.RESOURCE_NOT_FOUND;
  } else if (status >= 500) {
    message = ERROR_MESSAGES.SERVER_ERROR;
  } else {
    message = ERROR_MESSAGES.FORM_SEND_ERROR;
  }
  showErrorToast(elements, message);
}

function handleNetworkError(elements, error) {
  if (!error.response) {
    // no response = no internet connection or network issue
    showErrorToast(elements, ERROR_MESSAGES.UNEXPECTED_ERROR);
  } else {
    showErrorToast(elements, ERROR_MESSAGES.SERVER_ERROR);
  }
}

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', () => {
  // Cache elements once
  const elements = {
    form: document.getElementById('contact-form'),
    toast: document.getElementById('toast'),
    loadingOverlay: document.getElementById('loading-overlay'),
    loader: document.getElementById('loader'),
    successMessage: document.querySelector('.contact__form-success-message'),
    errors: Object.fromEntries(
      fields.map((f) => [f.id, document.querySelector(`.${f.errorClass}`)])
    ),
    inputs: Object.fromEntries(fields.map((f) => [f.id, document.getElementById(f.id)])),
  };

  // Character counter for message textarea
  const textarea = elements.inputs.message;
  const charCount = document.getElementById('charCount');
  const maxLength = textarea.getAttribute('maxlength');

  textarea.addEventListener('input', () => {
    charCount.textContent = `${textarea.value.length}/${maxLength}`;
  });

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (validateForm(elements)) {
      toggleLoading(elements, true);

      try {
        // Execute reCAPTCHA to get the token
        const token = await window.grecaptcha.execute('6LeVl8orAAAAAJkAyH4MRlTaKwcAr_bZfYRH55vc', {
          action: 'submit',
        });

        const formData = Object.fromEntries(new FormData(elements.form));
        formData.recaptchaToken = token;

        const response = await axios.post(
          'https://vyv1rt79u4.execute-api.eu-west-1.amazonaws.com/prod/contact',
          formData
        );

        const data = response.data;

        if (response.status === 200 && data.success) {
          handleSuccessResponse(elements);
          elements.form.reset();
          charCount.textContent = `0/${maxLength}`;
        } else {
          handleErrorResponse(elements, response.status);
        }
      } catch (error) {
        const data = error.response?.data;

        // Backend validation errors (e.g. invalid input)
        if (error.response?.status === 400 && !data.success) {
          showBackendValidationErrors(elements, data.errors);
          // Forbidden or reCAPTCHA-related errors
        } else if (error.response?.status === 403 && !data.success) {
          showErrorToast(elements, data.message);
          // Network or unexpected errors
        } else {
          handleNetworkError(elements, error);
        }
      } finally {
        toggleLoading(elements, false);
      }
    }
  });
});
