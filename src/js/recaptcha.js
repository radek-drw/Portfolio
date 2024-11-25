grecaptcha.ready(function () {
  grecaptcha
    .execute("""", {
      action: "contact_form",
    })
    .then(function (token) {
      document.getElementById("g-recaptcha-response").value = token;
    });
});
