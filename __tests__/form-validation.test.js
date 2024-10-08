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

  test("validateForm should return false if email format is incorrect", () => {
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "invalid-email";
    document.getElementById("message").value = "Hello";

    expect(validateForm()).toBe(false);

    expect(
      document.querySelector(".contact__form-error-email").style.display
    ).toBe("block");
  });

  test("validateForm should return true if email format is correct", () => {
    document.getElementById("name").value = "Jane Doe";
    document.getElementById("email").value = "jane@example.com";
    document.getElementById("message").value = "Hello, this is a valid email.";

    expect(validateForm()).toBe(true);

    expect(
      document.querySelector(".contact__form-error-email").style.display
    ).toBe("none");
  });

  test("validateForm should return false if name field is empty", () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("message").value = "Hello";

    expect(validateForm()).toBe(false);

    expect(
      document.querySelector(".contact__form-error-name").style.display
    ).toBe("block");
  });

  test("validateForm should return false if message field is empty", () => {
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("message").value = "";

    expect(validateForm()).toBe(false);

    expect(
      document.querySelector(".contact__form-error-message").style.display
    ).toBe("block");
  });

  test("validateForm should return false if email field is empty", () => {
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "Hello";

    expect(validateForm()).toBe(false);

    expect(
      document.querySelector(".contact__form-error-email").style.display
    ).toBe("block");
  });

  test("validateForm should return true if all fields are valid", () => {
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("message").value = "Hello";

    expect(validateForm()).toBe(true);

    // Check that no error messages are displayed
    expect(
      document.querySelector(".contact__form-error-name").style.display
    ).toBe("none");
    expect(
      document.querySelector(".contact__form-error-email").style.display
    ).toBe("none");
    expect(
      document.querySelector(".contact__form-error-message").style.display
    ).toBe("none");
  });

  test("handleSuccessResponse should hide success message after delay", async () => {
    jest.useFakeTimers();

    handleSuccessResponse();

    expect(
      document.querySelector(".contact__form-success-message").style.display
    ).toBe("block");

    jest.advanceTimersByTime(4000);

    expect(
      document.querySelector(".contact__form-success-message").style.display
    ).toBe("none");

    jest.useRealTimers();
  });

  test("showErrorToast should hide toast message after timeout", async () => {
    jest.useFakeTimers();

    showErrorToast("Test error message");

    expect(document.getElementById("toast").style.display).toBe("block");
    expect(document.getElementById("toast").textContent).toBe(
      "Test error message"
    );

    jest.advanceTimersByTime(8000);

    expect(document.getElementById("toast").style.display).toBe("none");

    jest.useRealTimers();
  });

  test("Form submission should handle server error (500) and display the correct error message", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("message").value = "Hello";

    document.dispatchEvent(new Event("DOMContentLoaded"));

    const form = document.getElementById("contact-form");

    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");

    form.dispatchEvent(submitEvent);

    await Promise.resolve();

    expect(preventDefaultSpy).toHaveBeenCalled();

    expect(document.getElementById("toast").style.display).toBe("block");
    expect(document.getElementById("toast").textContent).toBe(
      "An internal server error occurred. Please try again later."
    );

    global.fetch.mockRestore();
    preventDefaultSpy.mockRestore();
  });

  test("Form submission should display no internet connection error when offline", async () => {
    Object.defineProperty(navigator, "onLine", {
      value: false,
      writable: true,
    });

    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "john@example.com";
    document.getElementById("message").value = "Hello";

    document.dispatchEvent(new Event("DOMContentLoaded"));

    const form = document.getElementById("contact-form");

    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");

    form.dispatchEvent(submitEvent);

    await Promise.resolve();

    expect(preventDefaultSpy).toHaveBeenCalled();

    expect(document.getElementById("toast").style.display).toBe("block");
    expect(document.getElementById("toast").textContent).toBe(
      "No internet connection!"
    );

    Object.defineProperty(navigator, "onLine", {
      value: true,
      writable: true,
    });

    preventDefaultSpy.mockRestore();
  });

  test("Form submission should handle successful response and display success message", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      })
    );

    document.getElementById("name").value = "Jane Doe";
    document.getElementById("email").value = "jane@example.com";
    document.getElementById("message").value = "This is a test message";

    document.dispatchEvent(new Event("DOMContentLoaded"));

    const form = document.getElementById("contact-form");

    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");

    form.dispatchEvent(submitEvent);

    await Promise.resolve();

    expect(preventDefaultSpy).toHaveBeenCalled();

    expect(
      document.querySelector(".contact__form-success-message").style.display
    ).toBe("block");

    expect(document.getElementById("name").value).toBe("");
    expect(document.getElementById("email").value).toBe("");
    expect(document.getElementById("message").value).toBe("");

    global.fetch.mockRestore();
    preventDefaultSpy.mockRestore();
  });
});
