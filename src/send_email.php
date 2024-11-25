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

function validateRecaptcha($token, $config) {
    // $recaptcha_secret = $config['recaptcha_secret_key'];
    $recaptcha_secret = '6Ld_zIkqAAAAAIWo49x4TCeD7vPX9rajgWaCmN0s';
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$token}");
    $captcha_result = json_decode($verify);

    return $captcha_result->success && $captcha_result->score > 0.5;
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

function sendEmail($name, $email, $message, $config) {
    $mail = new PHPMailer(true);

    try {
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_username'];
        $mail->Password = $config['smtp_password'];
        $mail->SMTPSecure = 'tls';
        $mail->Port = $config['smtp_port'];

        $mail->setFrom($config['smtp_username'], $name);
        $mail->addAddress('rdrweski@gmail.com');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = 'Contact Form Submission';
        $mail->Body    = htmlspecialchars($message);
        $mail->AltBody = htmlspecialchars($message);

        $mail->send();
        return array('success' => true);
    } catch (Exception $e) {
        error_log('Mailer Error: ' . $mail->ErrorInfo);
        return array('success' => false, 'error' => 'Message could not be sent. Please try again later.');
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = sanitizeString($_POST['name']);
    $email = sanitizeEmail($_POST['email']);
    $message = sanitizeString($_POST['message']);
    $recaptcha_token = $_POST['g-recaptcha-response'];

    $errors = validateInput($name, $email, $message);

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }

    if (!validateRecaptcha($recaptcha_token, $config)) {
        echo json_encode(['success' => false, 'errors' => ['recaptcha' => 'Verification failed']]);
        exit;
    }

    $result = sendEmail($name, $email, $message, $config);
    echo json_encode($result);
}
?>