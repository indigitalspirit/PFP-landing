<?php 

if(isset($_POST["user_phone"]) || isset($_POST["user_email"]) ) {
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
  if(isset($_POST["user_email"])) 
    $user_email = htmlentities($_POST['user_email']);

  if(isset($_POST["user_phone"])) 
    $user_phone = htmlentities($_POST['user_phone']);



  if(isset($_POST["square"])) 
    $square = htmlentities($_POST['square']);
  
  if(isset($_POST["baget"])) 
    $baget = htmlentities($_POST['baget']);

  if(isset($_POST["material"])) 
    $material = htmlentities($_POST['material']);

  if(isset($_POST["time"])) 
    $time = htmlentities($_POST['time']);



  if(isset($_POST["whatsapp"])) {
    $whatsapp = htmlentities($_POST['whatsapp']);
    
  }

  if(isset($_POST["options"])) {
    $options = htmlentities($_POST['options']);
    
  }
    

  

  try
  {
      $emailText = "Новое сообщение от PFP-лендинг \n========\n";
      
      if($user_phone) 
        $emailText .= "Телефон: $user_phone\n";

      if($user_email) 
        $emailText .= "Email: $user_email\n";


      if($whatsapp || $options)
        $emailText .= "======= Примечания =======\n";

      if($whatsapp === 'call') 
        $emailText .= "Позвонить в WhatsApp\n";

      if($options === 'three')
        $emailText .= "Рассчет в 3 вариантах\n";
      
      if($options === 'price')
        $emailText .= "Выслать прайс на материалы\n";

      if($options === 'tz')
        $emailText .= "Разработка ТЗ\n";

      if($options === 'calc') {
        $emailText .= "Калькулятор\n";
        if($square) 
          $emailText .= "Площадь по полу: $square\n";

        if($baget) 
          $emailText .= "Бюджет: $baget\n";

        if($time) 
          $emailText .= "Сроки: $time\n";

        if($material) 
          $emailText .= "Материал покрытия: $material\n";

      }
        


      if($options === 'enginier')
        $emailText .= "Выезд инженера. Позвонить\n";

      if($whatsapp === 'enginier') 
        $emailText .= "Выезд инженера. WhatsApp\n";


      //file uploading

    if(isset($_FILES['file'])) {
      $client_file = '';
      //TODO валидация файла

      if ( 0 < $_FILES['file']['error'] ) {
        //$responseArray['message'] = 'file problems';
       // echo $responseArray['message'];
       // exit();
      }
      else {
        switch ($_FILES['file']['type']) {
          case 'application/pdf':
              //$newFilename .= '-document.pdf';
              break;
  
          case 'image/jpeg':
          
              break;
  
          case 'image/pjpeg':
              break;
  
          case 'image/png':
              break;
  
          case 'text/plain':
              break;    
  
          default:
              //echo 'Файл неподдерживаемого типа';
              $responseArray = array('type' => 'danger', 'message' => 'not supported file type');
              echo $responseArray['message'];
              exit;
      }
      move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
      $client_file = $_FILES['file']['name'];

      if($client_file)
        $emailText .= "Клиент прикрепил файл: $client_file\n";

      }
    }

      $responseArray = array('type' => 'success', 'message' => $emailText);

      
      
      $headers = array('Content-Type: text/plain; charset="UTF-8";',
          'From: ' . $from,
          'Reply-To: ' . $from,
          'Return-Path: ' . $from,
      );
      
      
      // mail($sendTo, $subject, $emailText, implode("\n", $headers));

      // $responseArray = array('type' => 'success', 'message' => $okMessage);
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

  

}
else {
  $responseArray = array('type' => 'danger', 'message' => 'empty POST');
  echo $responseArray['message'];

}



?>
