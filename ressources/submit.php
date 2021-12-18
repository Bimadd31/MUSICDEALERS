<?php
// (A) PROCESS STATUS
$error = "";

// (B) VERIFY CAPTCHA
// 6Leg6YUdAAAAANE_d0DyY35FZgz9JdDgJtp_tcOs
$secret = "6Leg6YUdAAAAANE_d0DyY35FZgz9JdDgJtp_tcOs"; // CHANGE THIS TO YOUR OWN!
$url = "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=" . $_POST["g-recaptcha-response"];
$verify = json_decode(file_get_contents($url));

$mailFrom = $_POST['your-email'];
$name = $_POST['your-name'];
$to = "Papercut@user.com"; // ! CHANGE THIS TO YOUR OWN !
$subject = $_POST['your-subject'];
$body = $_POST['your-message'];
$headers[] = "From: $name <$mailFrom>";

// Mail it
if ($verify->success) {
  // (C) SEND MAIL

  foreach ($_POST as $k => $v) {
    if ($k != "g-recaptcha-response") {
      $body;
    };
  };


  if (!mail($to, $subject, $body, implode("\r\n", $headers))) {
    $error = "Failed to send email";
  };
} else {
  $error = "Invalid captcha";
};
?>;