const ERROR_MESSAGES = {
  NO_INTERNET: "No internet connection!",
  FORM_SEND_ERROR:
    "An error occurred while sending the form. Please try again later.",
  RESOURCE_NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "An internal server error occurred. Please try again later.",
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

// Exported functions
export function validateForm() {
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

export function toggleLoading(isLoading) {
  const loadingOverlay = document.getElementById("loading-overlay");
  const loader = document.getElementById("loader");
  loadingOverlay.style.display = isLoading ? "block" : "none";
  loader.style.display = isLoading ? "block" : "none";
}

export function handleSuccessResponse() {
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

export function showErrorToast(message) {
  const toast = document.getElementById("toast");
  toast.style.display = "block";
  toast.textContent = message;
  setTimeout(() => {
    toast.style.display = "none";
  }, 8000);
}

export function handleServerError(status) {
  let message = ERROR_MESSAGES.FORM_SEND_ERROR;
  if (status === 404) {
    message = ERROR_MESSAGES.RESOURCE_NOT_FOUND;
  } else if (status >= 500) {
    message = ERROR_MESSAGES.SERVER_ERROR;
  }
  showErrorToast(message);
}

export function handleError(error) {
  console.error("Error:", error);
  showErrorToast(ERROR_MESSAGES.UNEXPECTED_ERROR);
}

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
        const formData = new FormData(form);
        formData.append("recaptcha_token", token);

        const response = await fetch("send_email.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          handleSuccessResponse();
        } else {
          handleServerError(response.status);
        }
      } catch (error) {
        handleError(error);
      } finally {
        toggleLoading(false);
      }
    }
  });
});
