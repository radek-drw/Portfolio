grecaptcha.ready(function () {
  grecaptcha
    .execute("""", { action: "submit" })
    .then(function (token) {
      document.getElementById("recaptchaToken").value = token;
    });
});
