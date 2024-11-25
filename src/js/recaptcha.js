grecaptcha.ready(function () {
  grecaptcha
    .execute("6Ld_zIkqAAAAAD87jsWzmh0p7jWPxz7EZDzRZycP", {
      action: "contact_form",
    })
    .then(function (token) {
      document.getElementById("g-recaptcha-response").value = token;
    });
});
