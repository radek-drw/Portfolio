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
  },
  {
    id: "email",
    errorClass: "contact__form-error-email",
    inputClass: "contact__form-inputs-item--email",
    pattern: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
  },
  {
    id: "message",
    errorClass: "contact__form-error-message",
    inputClass: "contact__form-inputs-item--message",
  },
];

// FORM VALIDATION FUNCTIONS
function validateForm() {
  let formIsValid = true;
  fields.forEach((field) => {
    const value = document.getElementById(field.id).value;
    const errorElement = document.querySelector(`.${field.errorClass}`);

    if (value === "" || (field.pattern && !field.pattern.test(value))) {
      errorElement.style.display = "block";
      errorElement.setAttribute("aria-live", "assertive");
      formIsValid = false;
    } else {
      errorElement.style.display = "none";
    }
  });
  return formIsValid;
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
        const token = await new Promise((resolve, reject) => {
          grecaptcha.ready(() => {
            grecaptcha
              .execute("6Ld_zIkqAAAAAD87jsWzmh0p7jWPxz7EZDzRZycP", {
                action: "submit",
              })
              .then(resolve)
              .catch(reject);
          });
        });

        // Add the token to the form data
        const formData = Object.fromEntries(new FormData(form));
        formData.recaptcha_token = token;

        const response = await axios.post(
          "http://localhost:5000/send_email",
          formData
        );

        // parsing body (cause Lambda returns JSON)
        const data = JSON.parse(response.data.body);

        if (response.status === 200 && data.success) {
          handleSuccessResponse();
        } else {
          handleErrorResponse(response.status);
        }
      } catch (error) {
        handleNetworkError(error);
      } finally {
        toggleLoading(false);
      }
    }
  });
});
