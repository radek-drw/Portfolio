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

document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Check for internet connection
    if (!navigator.onLine) {
      showErrorToast("No internet connection!");
      return;
    }

    // Loop through each field to validate
    fields.forEach((field) => {
      const value = document.getElementById(field.id).value;
      const errorElement = document.querySelector(`.${field.errorClass}`);

      // Check if the field is empty or doesn't match the pattern (if applicable)
      if (value === "" || (field.pattern && !field.pattern.test(value))) {
        errorElement.style.display = "block";
        formIsValid = false;
      } else {
        errorElement.style.display = "none";
      }
    });

    // If the form is valid, proceed to send data to the server
    if (formIsValid) {
      // Show loading animation
      toggleLoading(true);

      try {
        const formData = new FormData(document.getElementById("contact-form"));

        // Send form data to the server
        const response = await fetch("send_email.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          handleSuccessResponse();
          toggleLoading(false);
        } else {
          // Handle server errors
          console.error("Server error:", response.status);
          if (response.status === 404) {
            showErrorToast("The requested resource was not found.");
          } else if (response.status >= 500) {
            showErrorToast(
              "An internal server error occurred. Please try again later."
            );
          } else {
            showErrorToast(
              "An error occurred while sending the form. Please try again later."
            );
          }
          toggleLoading(false);
        }
      } catch (error) {
        // Handle network errors and other client-side errors
        console.error("Error:", error);
        showErrorToast("An unexpected error occurred. Please try again later.");
        toggleLoading(false);
      }
    }
  });

function toggleLoading(isLoading) {
  const loading = document.getElementById("loader");
  const loadingContainer = document.getElementById("dark-background");

  if (isLoading) {
    loading.style.display = "block";
    loadingContainer.style.display = "block";
  } else {
    loading.style.display = "none";
    loadingContainer.style.display = "none";
  }
}

function handleSuccessResponse() {
  // Clear form fields
  fields.forEach((field) => {
    const inputElement =
      document.querySelector(`.${field.inputClass} input`) ||
      document.querySelector(`.${field.inputClass} textarea`);
    inputElement.value = "";
  });

  // Show success message
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
  }, 8000);
}
