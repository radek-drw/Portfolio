const { showErrorToast } = require("../src/js/form-validation");

describe("Contact Form Functionality", () => {
  test("showErrorToast displays the correct message", () => {
    const errorMessage = "An error occurred";
    global.document = {
      getElementById: jest.fn(() => ({
        style: {
          display: "none",
        },
        textContent: "",
      })),
    };

    showErrorToast(errorMessage);

    expect(global.document.getElementById).toHaveBeenCalledWith("toast");
    expect(global.document.getElementById().textContent).toBe(errorMessage);
    expect(global.document.getElementById().style.display).toBe("block");
  });

  test("showErrorToast hides the toast after 8 seconds", () => {
    const errorMessage = "An error occurred";
    const originalTimeout = global.setTimeout;
    global.setTimeout = jest.fn();
    global.document = {
      getElementById: jest.fn(() => ({
        style: {
          display: "none",
        },
        textContent: "",
      })),
    };

    showErrorToast(errorMessage);

    expect(global.setTimeout).toHaveBeenCalledWith(expect.any(Function), 8000);
    global.setTimeout.mock.calls[0][0]();
    expect(global.document.getElementById().style.display).toBe("none");
    global.setTimeout = originalTimeout;
  });
});
