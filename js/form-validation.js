document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

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

  fields.forEach((field) => {
    const value = document.getElementById(field.id).value;
    // const inputElement = document.querySelector(`.${field.inputClass}>label`);
    const errorElement = document.querySelector(`.${field.errorClass}`);

    if (value === "" || (field.pattern && !field.pattern.test(value))) {
      // inputElement.classList.add("error");
      errorElement.style.display = "block";
      formIsValid = false;
    } else {
      // inputElement.classList.remove("error");
      errorElement.style.display = "none";
    }
  });

  if (formIsValid) {
    // Clear the input fields

    fields.forEach((field) => {
      const inputElement = document.querySelector(`.${field.inputClass}`);
      inputElement.value = "";
    });

    // Display the success message

    const successMessage = document.querySelector(
      ".contact__form-success-message"
    );
    successMessage.style.display = "block";

    // Hide the success message after 3 seconds

    setTimeout(function () {
      successMessage.style.display = "none";
    }, 3000);
  } else {
    return false;
  }
});
