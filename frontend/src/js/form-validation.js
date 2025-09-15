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
    errorMessages: {
      REQUIRED: "Please enter a name",
    },
  },
  {
    id: "email",
    errorClass: "contact__form-error-email",
    inputClass: "contact__form-inputs-item--email",
    emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessages: {
      REQUIRED: "Please enter an email address",
      INVALID: "Please enter a valid email address",
    },
  },
  {
    id: "message",
    errorClass: "contact__form-error-message",
    inputClass: "contact__form-inputs-item--message",
    errorMessages: {
      REQUIRED: "Please enter a message",
    },
  },
];

// Validate form frontend
function validateForm() {
  let formIsValid = true;

  fields.forEach((field) => {
    const value = document.getElementById(field.id).value.trim();
    const errorElement = document.querySelector(`.${field.errorClass}`);
    let errorMessage = "";

    if (!value) {
      errorMessage = field.errorMessages.REQUIRED;
    } else if (field.emailPattern && !field.emailPattern.test(value)) {
      errorMessage = field.errorMessages.INVALID;
    }

    if (errorMessage) {
      errorElement.style.display = "block";
      errorElement.textContent = errorMessage;
      errorElement.setAttribute("aria-live", "assertive");
      formIsValid = false;
    } else {
      errorElement.style.display = "none";
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

      errorElement.style.display = "block";
      errorElement.textContent = `${message} (Backend)`;
      errorElement.setAttribute("aria-live", "assertive");
    } else {
      errorElement.style.display = "none";
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
    const inputElement =
      document.querySelector(`.${field.inputClass} input`) ||
      document.querySelector(`.${field.inputClass} textarea`);
    if (inputElement) {
      inputElement.value = "";
    }
  });
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

    if (validateForm()) {
      toggleLoading(true);

      try {
        // Execute reCAPTCHA to get the token
        const token = await window.grecaptcha.execute(
          "6LeVl8orAAAAAJkAyH4MRlTaKwcAr_bZfYRH55vc",
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
        if (error.response && error.response.status === 400) {
          // Validation errors from backend
          const errors = JSON.parse(error.response.data.body).errors;
          showBackendValidationErrors(errors);
        } else {
          handleNetworkError(error);
        }
      } finally {
        toggleLoading(false);
      }
    }
  });
});
