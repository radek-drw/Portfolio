import {
  validateForm,
  toggleLoading,
  handleSuccessResponse,
  showErrorToast,
  handleServerError,
  handleError,
} from "../src/js/form-validation";

import { ERROR_MESSAGES } from "../src/js/form-validation";

// jest.mock("navigator", () => ({
//   onLine: true,
// }));

describe("Contact Form Validation", () => {
  test("validateForm returns true for valid form", () => {
    document.body.innerHTML = `
          <form id="contact-form">
            <input type="text" id="name" value="John Doe" />
            <input type="email" id="email" value="john@example.com" />
            <textarea id="message">Hello, world!</textarea>
          </form>
          <div class="contact__form-error-name"></div>
          <div class="contact__form-error-email"></div>
          <div class="contact__form-error-message"></div>
        `;

    expect(validateForm()).toBe(true);
  });

  test("validateForm returns false for invalid form", () => {
    document.body.innerHTML = `
        <form id="contact-form">
          <input type="text" id="name" value="" />
          <input type="email" id="email" value="invalid-email" />
          <textarea id="message"></textarea>
        </form>
        <div class="contact__form-error-name"></div>
        <div class="contact__form-error-email"></div>
        <div class="contact__form-error-message"></div>
      `;

    expect(validateForm()).toBe(false);
  });
});

describe("Loading Indicator", () => {
  test("toggleLoading shows and hides loading indicator", () => {
    document.body.innerHTML = `
        <div id="loading-overlay"></div>
        <div id="loader"></div>
      `;

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
});

describe("Success Message", () => {
  test("handleSuccessResponse clears form fields and shows success message", () => {
    document.body.innerHTML = `
        <form id="contact-form">
          <input type="text" class="contact__form-inputs-item--name" value="John Doe" />
          <input type="email" class="contact__form-inputs-item--email" value="john@example.com" />
          <textarea class="contact__form-inputs-item--message">Hello, world!</textarea>
        </form>
        <div class="contact__form-success-message"></div>
      `;

    handleSuccessResponse();

    const nameInput = document.querySelector(
      ".contact__form-inputs-item--name"
    );
    const emailInput = document.querySelector(
      ".contact__form-inputs-item--email"
    );
    const messageInput = document.querySelector(
      ".contact__form-inputs-item--message"
    );
    const successMessageElement = document.querySelector(
      ".contact__form-success-message"
    );

    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(messageInput.value).toBe("");
    expect(successMessageElement.style.display).toBe("block");
  });
});

describe("Error Handling", () => {
  test("showErrorToast displays an error message in the toast", () => {
    document.body.innerHTML = `
        <div id="toast"></div>
      `;

    showErrorToast(ERROR_MESSAGES.NO_INTERNET);
    expect(document.getElementById("toast").style.display).toBe("block");
    expect(document.getElementById("toast").textContent).toBe(
      ERROR_MESSAGES.NO_INTERNET
    );
  });

  test("handleServerError displays the correct error message based on the status code", () => {
    document.body.innerHTML = `
        <div id="toast"></div>
      `;

    handleServerError(404);
    expect(document.getElementById("toast").textContent).toBe(
      ERROR_MESSAGES.RESOURCE_NOT_FOUND
    );

    handleServerError(500);
    expect(document.getElementById("toast").textContent).toBe(
      ERROR_MESSAGES.SERVER_ERROR
    );

    handleServerError(400);
    expect(document.getElementById("toast").textContent).toBe(
      ERROR_MESSAGES.FORM_SEND_ERROR
    );
  });

  test("handleError logs the error and displays a generic error message", () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    document.body.innerHTML = `
        <div id="toast"></div>
      `;

    handleError(new Error("Test error"));
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error:",
      new Error("Test error")
    );
    expect(document.getElementById("toast").textContent).toBe(
      ERROR_MESSAGES.UNEXPECTED_ERROR
    );

    consoleErrorSpy.mockRestore();
  });
});
