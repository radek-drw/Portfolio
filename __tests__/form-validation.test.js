import {
  validateForm,
  toggleLoading,
  handleSuccessResponse,
  showErrorToast,
  handleServerError,
  handleError,
} from "../src/js/form-validation";

describe("Form Validation Tests", () => {
  document.body.innerHTML = `
    <form id="contact-form">
      <div class="contact__form-inputs-item--name">
        <input id="name" value="" />
      </div>
      <div class="contact__form-inputs-item--email">
        <input id="email" value="" />
      </div>
      <div class="contact__form-inputs-item--message">
        <textarea id="message"></textarea>
      </div>
      <div class="contact__form-error-name"></div>
      <div class="contact__form-error-email"></div>
      <div class="contact__form-error-message"></div>
      <div id="loader"></div>
      <div id="loading-overlay"></div>
      <div class="contact__form-success-message"></div>
      <div id="toast"></div>
    </form>
  `;

  test("validateForm should return false if fields are empty", () => {
    expect(validateForm()).toBe(false);
  });

  test("toggleLoading should show/hide loading elements", () => {
    toggleLoading(true);
    expect(document.getElementById("loading-overlay").style.display).toBe(
      "block"
    );
    expect(document.getElementById("loader").style.display).toBe("block");

    toggleLoading(false);
    expect(document.getElementById("loading-overlay").style.display).toBe(
      "none"
    );
    expect(document.getElementById("loader").style.display).toBe("none");
  });

  test("handleSuccessResponse should clear input fields and show success message", () => {
    // Set initial values for the inputs
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("message").value = "Hello";

    handleSuccessResponse();

    expect(document.getElementById("name").value).toBe("");
    expect(document.getElementById("email").value).toBe("");
    expect(document.getElementById("message").value).toBe("");

    expect(
      document.querySelector(".contact__form-success-message").style.display
    ).toBe("block");
  });

  test("showErrorToast should display toast with message", () => {
    showErrorToast("Test error message");

    expect(document.getElementById("toast").style.display).toBe("block");
    expect(document.getElementById("toast").textContent).toBe(
      "Test error message"
    );
  });

  test("handleServerError should display appropriate error message", () => {
    handleServerError(404);
    expect(document.getElementById("toast").textContent).toBe(
      "The requested resource was not found."
    );

    handleServerError(500);
    expect(document.getElementById("toast").textContent).toBe(
      "An internal server error occurred. Please try again later."
    );
  });

  test("handleError should log error and show unexpected error message", () => {
    console.error = jest.fn();

    handleError(new Error("Test error"));

    expect(console.error).toHaveBeenCalledWith(
      "Error:",
      new Error("Test error")
    );
    expect(document.getElementById("toast").textContent).toBe(
      "An unexpected error occurred. Please try again later."
    );
  });
});
