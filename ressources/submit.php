<?php


// $secret = "6Leg6YUdAAAAANE_d0DyY35FZgz9JdDgJtp_tcOs";
// $url = "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=" . $_POST["g-recaptcha-response"];
// $verify = json_decode(file_get_contents($url));

// $mailFrom = $_POST['your-email'];
// $name = $_POST['your-name'];
// // $to = '';
// $subject = $_POST['your-subject'];
// $body = $_POST['your-message'];
// $headers[] = "From: $name <$mailFrom>";


// // Mail it
// if ($verify->success) {
//   // (C) SEND MAIL

//   foreach ($_POST as $k => $v) {
//     if ($k != "g-recaptcha-response") {
//       $body;
//     }
//   }

//   $postdata = http_build_query(
//     array(
//       'name' => 'imad',
//       'email' => 'cc',
//       'message' => 'hello'
//     )
//   );
//   $opts = array(
//     'http' =>
//     array(
//       'method' => 'POST',
//       'header' => 'Content-type: application/x-www-form-urlencoded',
//       'content' => $postdata
//     )
//   );
//   $context = stream_context_create($opts);
//   $result = file_get_contents('https://formsubmit.co/', false, $context);
//   echo $result;


//   // if (!mail($to, $subject, $body, implode("\r\n", $headers))) {
//   //   $error = "Failed to send email";
//   // };
// } else {
//   return false;
// }
