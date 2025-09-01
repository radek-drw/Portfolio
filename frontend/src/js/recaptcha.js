grecaptcha.ready(function () {
  grecaptcha
    .execute("6Ld_zIkqAAAAAD87jsWzmh0p7jWPxz7EZDzRZycP", { action: "submit" })
    .then(function (token) {
      document.getElementById("recaptchaToken").value = token;
    });
});
