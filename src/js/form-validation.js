document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

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

  let formIsValid = true;

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

  // If the form is valid, proceed to clear the fields and show success message
  if (formIsValid) {
    fields.forEach((field) => {
      console.log("sent form"); // Log form submission for debugging
      const inputElement = document.querySelector(`.${field.inputClass}>input`);
      inputElement.value = "";
    });

    const successMessage = document.querySelector(
      ".contact__form-success-message"
    );
    successMessage.style.display = "block";

    // Hide the success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  } else {
    // If the form is invalid, stop further actions
    return false;
  }
});
