<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$config = require '../../config.php';

function sanitizeString($input) {
    return filter_var(trim($input), FILTER_SANITIZE_STRING);
}

function sanitizeEmail($email) {
    return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
}

function validateInput($name, $email, $message) {
    $errors = array();

    if (empty($name)) {
        $errors['name'] = 'Name is required';
    }

    if (empty($email)) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

    if (empty($message)) {
        $errors['message'] = 'Message is required';
    }

    return $errors;
}

// Function to send email using PHPMailer
function sendEmail($name, $email, $message, $config) {
    $mail = new PHPMailer(true);

    try {
        // Configure SMTP settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_username'];
        $mail->Password = $config['smtp_password'];
        $mail->SMTPSecure = 'tls';
        $mail->Port = $config['smtp_port'];

        // Set email recipients and content
        $mail->setFrom($config['smtp_username'], $name);
        $mail->addAddress('rdrweski@gmail.com');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'Contact Form Submission';
        $mail->Body    = htmlspecialchars($message);
        $mail->AltBody = htmlspecialchars($message);

        // Send the email
        $mail->send();
        return array('success' => true);
    } catch (Exception $e) {
        // Log error if email sending fails
        error_log('Mailer Error: ' . $mail->ErrorInfo);
        return array('success' => false, 'error' => 'Message could not be sent. Please try again later.');
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = sanitizeString($_POST['name']);
    $email = sanitizeEmail($_POST['email']);
    $message = sanitizeString($_POST['message']);

    $errors = validateInput($name, $email, $message);

    // If there are validation errors, display them as an HTML list
    if (!empty($errors)) {
        echo '<ul>';
        foreach ($errors as $error) {
            echo '<li>' . htmlspecialchars($error) . '</li>';
        }
        echo '</ul>';
        exit;
    }

    $result = sendEmail($name, $email, $message, $config);
}

?>
