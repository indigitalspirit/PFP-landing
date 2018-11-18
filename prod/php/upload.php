<?php 

if(isset($_POST["phone"])) {

  // configure
  $from = 'anastasia-pavlova.com';
  $sendTo = 'nastya-pavlova-93@yandex.ru'; // Add Your Email
  $subject = 'Новое сообщение с моего сайта';
  $fields = array('name' => 'Name', 'subject' => 'Subject', 'email' => 'Email', 'phone' => 'Phone', 'message' => 'Message'); // array variable name => Text to appear in the email
  $okMessage = 'Спасибо, сообщение отправлено! Я отвечу вам в ближайшее время.';
  // 'Contact form successfully submitted. Thank you, I will get back to you soon!';
  $errorMessage = 'При отправке сообщения возникла ошибка. Пожалуйста, попробуйте позднее.';
  //'There was an error while submitting the form. Please try again later';

  // let's do the sending

  $user_phone = htmlentities($_POST['phone']);

  try
  {
      $emailText = "Новое сообщение с anastasia-pavlova.com \n========\n";
      //"You have new message from contact form\n=============================\n";

      // foreach ($_POST as $key => $value) {

      //     if (isset($fields[$key])) {
      //         $emailText .= "$fields[$key]: $value\n";
      //     }
      // }
      $emailText .= "Телефон: $user_phone\n";

      // $headers = array('Content-Type: text/plain; charset="UTF-8";',
      //     'From: ' . $from,
      //     'Reply-To: ' . $from,
      //     'Return-Path: ' . $from,
      // );
      
      //mail($sendTo, $subject, $emailText, implode("\n", $headers));

      // $responseArray = array('type' => 'success', 'message' => $okMessage);
      $responseArray = array('type' => 'success', 'message' => $emailText);
  }
  catch (\Exception $e)
  {
      $responseArray = array('type' => 'danger', 'message' => $errorMessage);
  }

  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
      $encoded = json_encode($responseArray);

      header('Content-Type: application/json');

      echo $encoded;
  }
  else {
      echo $responseArray['message'];
  }

 if ( 0 < $_FILES['file']['error'] ) {
    $responseArray['message'] = 'file problems';
    echo $responseArray['message'];
  }
   else {
   move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
  }

}
else {
  $responseArray = array('type' => 'danger', 'message' => 'empty POST');
  echo $responseArray['message'];

}

  
?>