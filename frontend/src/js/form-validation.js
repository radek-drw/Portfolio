import axios from "axios";

// ERROR MESSAGES CONSTANTS
const ERROR_MESSAGES = {
  // Shown when the user has no internet connection (offline).
  NO_INTERNET: "No internet connection!",

  // Generic fallback when the form could not be sent (non-specific error).
  FORM_SEND_ERROR:
    "An error occurred while sending the form. Please try again later.",

  // Shown when the requested resource (API endpoint) is not found (HTTP 404).
  RESOURCE_NOT_FOUND: "The requested resource was not found.",

  // Shown when the server returns an internal error (HTTP 500+).
  SERVER_ERROR: "An internal server error occurred. Please try again later.",

  // Shown when something unexpected happens (e.g. network/JS error).
  UNEXPECTED_ERROR: "An unexpected error occurred. Please try again later.",
};

const fields = [
  {
    id: "name",
    errorClass: "contact__form-error-name",
    inputClass: "contact__form-inputs-item--name",
    maxLength: 50,
    errorMessages: {
      REQUIRED: "Please enter a name",
      TOO_LONG: "Name is too long",
    },
  },
  {
    id: "email",
    errorClass: "contact__form-error-email",
    inputClass: "contact__form-inputs-item--email",
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 254,
    errorMessages: {
      REQUIRED: "Please enter an email address",
      INVALID: "Please enter a valid email address",
      TOO_LONG: "Email address is too long",
    },
  },
  {
    id: "message",
    errorClass: "contact__form-error-message",
    inputClass: "contact__form-inputs-item--message",
    maxLength: 2000,
    errorMessages: {
      REQUIRED: "Please enter a message",
      TOO_LONG: "Message is too long",
    },
  },
];

function showError(errorElement, message) {
  errorElement.style.display = "block";
  errorElement.textContent = message;
  errorElement.setAttribute("aria-live", "assertive");
}

function hideError(errorElement) {
  errorElement.style.display = "none";
  errorElement.textContent = "";
  errorElement.removeAttribute("aria-live");
}

// Validate form fields: required, email format, max length
function validateForm() {
  let formIsValid = true;

  fields.forEach((field) => {
    const value = document.getElementById(field.id).value.trim();
    const errorElement = document.querySelector(`.${field.errorClass}`);
    let message = "";

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

function showBackendValidationErrors(errors) {
  fields.forEach((field) => {
    const errorElement = document.querySelector(`.${field.errorClass}`);

    if (errors[field.id]) {
      const code = errors[field.id]; // e.g. "REQUIRED" or "INVALID"
      const message = field.errorMessages[code];
      showError(errorElement, message);
    } else {
      hideError(errorElement);
    }
  });
}

function toggleLoading(isLoading) {
  const loadingOverlay = document.getElementById("loading-overlay");
  const loader = document.getElementById("loader");
  loadingOverlay.style.display = isLoading ? "block" : "none";
  loader.style.display = isLoading ? "block" : "none";
}

function handleSuccessResponse() {
  fields.forEach((field) => {
    const errorElement = document.querySelector(`.${field.errorClass}`);
    hideError(errorElement);
  });
  document.getElementById("contact-form").reset();

  const successMessage = document.querySelector(
    ".contact__form-success-message"
  );
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 4000);
}

function showErrorToast(message) {
  const toast = document.getElementById("toast");
  toast.style.display = "block";
  toast.textContent = message;
  setTimeout(() => {
    toast.style.display = "none";
  }, 4000);
}

function handleErrorResponse(status) {
  let message;

  if (status === 404) {
    message = ERROR_MESSAGES.RESOURCE_NOT_FOUND;
  } else if (status >= 500) {
    message = ERROR_MESSAGES.SERVER_ERROR;
  } else {
    message = ERROR_MESSAGES.FORM_SEND_ERROR;
  }
  showErrorToast(message);
}

function handleNetworkError(error) {
  console.error("Error:", error);
  showErrorToast(ERROR_MESSAGES.UNEXPECTED_ERROR);
}

// EVENT LISTENER
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      showErrorToast(ERROR_MESSAGES.NO_INTERNET);
      return;
    }

    if (true) {
      toggleLoading(true);

      try {
        // Execute reCAPTCHA to get the token
        const token = await window.grecaptcha.execute(
          """",
          { action: "submit" }
        );

        const formData = Object.fromEntries(new FormData(form));

        formData.recaptchaToken = token;

        const response = await axios.post(
          "https://r0du11twd4.execute-api.eu-west-1.amazonaws.com/contact",
          formData
        );

        const data = response.data;

        if (response.status === 200 && data.success) {
          handleSuccessResponse();
        } else {
          handleErrorResponse(response.status);
        }
      } catch (error) {
        const data = error.response?.data;

        // Validation errors (invalid input fields)
        if (error.response.status === 400 && !data.success) {
          showBackendValidationErrors(data.errors);
          // Failed reCAPTCHA verification
        } else if (error.response.status === 403 && !data.success) {
          showErrorToast(data.message);
        } else {
          handleNetworkError(error);
        }
      } finally {
        toggleLoading(false);
      }
    }
  });
});
