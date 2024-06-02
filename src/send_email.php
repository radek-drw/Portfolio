<?php
// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form fields validation
    $errors = array();

    // Check the "name" field
    if (empty($_POST['name'])) {
        $errors['name'] = 'Name is required';
    }

    // Check the "email" field
    if (empty($_POST['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

    // Check the "message" field
    if (empty($_POST['message'])) {
        $errors['message'] = 'Message is required';
    }

    // If there are errors, return them to the client
    if (!empty($errors)) {
        echo json_encode(array('success' => false, 'errors' => $errors));
        exit;
    }

    // Get data from the form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Create a new PHPMailer object
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'ssl0.ovh.net';
        $mail->SMTPAuth = true;
        $mail->Username = 'contact@radek-drweski.com';
        $mail->Password = '""';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('contact@radek-drweski.com', $name);
        $mail->addAddress('rdrweski@gmail.com');
        $mail->addReplyTo($email, $name);

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Here is the subject';
        $mail->Body    = $message;
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        // Send the message
        $mail->send();
        echo json_encode(array('success' => true));
    } catch (Exception $e) {
        // Error handling
        echo json_encode(array('success' => false, 'error' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo));
    }
}
?>
