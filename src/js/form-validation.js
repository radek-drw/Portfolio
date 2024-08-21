document.addEventListener("DOMContentLoaded", function () {
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

  const ERROR_MESSAGES = {
    NO_INTERNET: "No internet connection!",
    FORM_SEND_ERROR:
      "An error occurred while sending the form. Please try again later.",
    RESOURCE_NOT_FOUND: "The requested resource was not found.",
    SERVER_ERROR: "An internal server error occurred. Please try again later.",
    UNEXPECTED_ERROR: "An unexpected error occurred. Please try again later.",
  };

  const form = document.getElementById("contact-form");
  const loader = document.getElementById("loader");
  const loadingOverlay = document.getElementById("loading-overlay");
  const successMessage = document.querySelector(
    ".contact__form-success-message"
  );
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check for internet connectivity
    if (!navigator.onLine) {
      showErrorToast(ERROR_MESSAGES.NO_INTERNET);
      return;
    }

    // Validate form fields before sending the form
    if (validateForm()) {
      toggleLoading(true); // Show loading indicator
      try {
        const formData = new FormData(form);
        const response = await fetch("send_email.php", {
          method: "POST",
          body: formData,
        }); // Send form data to server
        if (response.ok) {
          handleSuccessResponse();
        } else {
          handleServerError(response.status);
        }
      } catch (error) {
        handleError(error); // Handle network or unexpected errors
      } finally {
        toggleLoading(false); // Hide loading indicator
      }
    }
  });

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
    loadingOverlay.style.display = isLoading ? "block" : "none";
    loader.style.display = isLoading ? "block" : "none";
  }

  function handleSuccessResponse() {
    fields.forEach((field) => {
      const inputElement =
        document.querySelector(`.${field.inputClass} input`) ||
        document.querySelector(`.${field.inputClass} textarea`);
      inputElement.value = "";
    });
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 4000);
  }

  function showErrorToast(message) {
    toast.style.display = "block";
    toast.textContent = message;
    setTimeout(() => {
      toast.style.display = "none";
    }, 8000);
  }

  function handleServerError(status) {
    let message = ERROR_MESSAGES.FORM_SEND_ERROR;
    if (status === 404) {
      message = ERROR_MESSAGES.RESOURCE_NOT_FOUND;
    } else if (status >= 500) {
      message = ERROR_MESSAGES.SERVER_ERROR;
    }
    showErrorToast(message);
  }

  // Function to handle unexpected errors
  function handleError(error) {
    console.error("Error:", error);
    showErrorToast(ERROR_MESSAGES.UNEXPECTED_ERROR);
  }
});
