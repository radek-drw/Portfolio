<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    if ($name && $email && $message) {
        $to = "rdrweski@gmail.com";
        $subject = "New message from $name";
        $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send email.";
        }
    } else {
        echo "Invalid input.";
    }
} else {
    echo "Invalid request method.";
}
?>
