<?php
// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$config = require '../../config.php';

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $errors = array();

    if (empty($_POST['name'])) {
        $errors['name'] = 'Name is required';
    }

    if (empty($_POST['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    }

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

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_username'];
        $mail->Password = $config['smtp_password'];
        $mail->SMTPSecure = 'tls';
        $mail->Port = $config['smtp_port'];

        // Recipients
        $mail->setFrom($config['smtp_username'], $name);
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
