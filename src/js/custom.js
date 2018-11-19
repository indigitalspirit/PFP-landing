$(document).ready(function(){

  /////////////////////////////
  // MASKED INPUT
  jQuery(function($){
    $('input.contact-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    $('input.modal-input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
  });

  /////////////////////////////////////
  // Modal windows content manipulations
  $('.content__sent button.close').on("click", function(e) {
    e.preventDefault();
    
    var modal =  $(this).closest('.modal');
    $(modal).find('.content').css({'display': 'block', 'transition': 'display .5s'});
    $(modal).find('.content__sent').css({'display': 'none', 'transition': 'display 1s'});
  
    return true; 
  });

  $('.fail button.close').on("click", function(e) {
    e.preventDefault();
  
    var modal =  $(this).closest('.modal');

    $(modal).find('.content').css({'display': 'block', 'transition': 'display .5s'});
    $(modal).find('.fail').css({'display': 'none', 'transition': 'display 1s'});
  
    return true; 
  });


  $('.content button.close').on("click", function(e) {
    e.preventDefault();
    var modal =  $(this).closest('.modal');

    $(modal).find('label.user_phone').css({'color': '#ffffff'});
  
    return true; 
  });

  //Clean phone and email inputs
  $( "input[name='user_phone']").keydown(function() {
    
   
    var modal =  $(this).closest('.modal');
    $(modal).find('label.user_phone').css({'color': '#ffffff'});
    var form =  $(this).closest('form');
    $(form).find('label.user_phone').css({'color': 'transparent'});
          
  });

  $( "input[name='user_email']").keydown(function() {
    
   
   //$(this).text('');
    var form =  $(this).closest('form');
    $(form).find('label.user_email').css({'color': 'transparent'});
          
  });




  //////////////////////////////////////////////////
  //Ajax answer handler 
  function showResponse(messageType, messageText, modal, form) {
    if(messageType == 'success') {
      console.log("Данные отправлены \n" + messageText, messageType);

      $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
      $(form).find('label.user_phone').css({'color': '#ffffff'});
      $(form)[0].reset();
    }
    else if(messageType == 'bad_type') {
      console.log("Плохой тип файла \n" + messageText, messageType);
      $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
      
      $(form).find('label.user_phone').css({'color': '#ffffff'});

      $(form)[0].reset();
      //$('#project-form')[0].reset();
    }
    else {
      console.log("Не удалось загрузить файл. \n" + messageText, messageType);
      $(modal).find('.fail .modal-title').text('Не удалось загрузить файл.');
      $(modal).find('.fail .modal-subtitle').text('Попробуйте позже');

      $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
      $(modal).find('.fail').css({'display': 'block', 'transition': 'display 1s'});
      
      $(form).find('label.user_phone').css({'color': '#ffffff'});

      $(form)[0].reset();
      //$('#project-form')[0].reset();
      
    }
    
    
  }
  
  //Ajax sender
  function sendAjaxForm(form, modal, extraData) {
    
    $.ajax({
      url:     "php/send.php", //url страницы 
      type:     "POST", //метод отправки
      data: $(form).serialize() + extraData,
      success: function(response) { //Данные отправлены успешно

        var messageText = response.message;
        var messageType = response.type;
        // console.log("Данные отправлены \n" + messageText);

        // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
        // $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
        // $(form).find('label.user_phone').css({'color': '#ffffff'});
        // $(form)[0].reset();
        showResponse(messageType, messageText, modal, form);
        
      },

      error: function(response) { // Данные не отправлены
          //console.log('Ошибка. Данные не отправлены.'+response.responseText);
          /*** Вызываем окно ошибки */
          showResponse('error', messageText, modal, form);
         
      } 
    });
  }

  //Ajax uploader
  function uploadAjax(form, modal, whatsapp) {
  
    var file_doc = $('.inputfile').prop('files')[0];
  
    var form_data = new FormData();
    
    form_data.append('file', file_doc);
    
  
    if(validateForm(form, 'user_phone')) {
  
      var userPhone = $(form).find('input').val();
  
      form_data.append('options', 'three');
      form_data.append('user_phone', userPhone);
  
      if(whatsapp)
        form_data.append('whatsapp', 'call');
    
    
      $.ajax({
        url: 'php/upload.php',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            
          var messageText = response.message;
          var messageType = response.type;
  
          showResponse(messageType, messageText, modal, form);
            
        },
        error: function(response) { 
          console.log('Ошибка. Данные не отправлены.'+response.responseText);
          /*** Вызываем окно ошибки */
          showResponse('error', messageText, modal, form);
      } 
      });
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    
  }


  //Validate phone and email
  function validateForm(form, inputName) {
    //TODO: fadein\fadeout\buttons disabled
    var element_str = 'input[name=' + inputName + ']';
    var element_val = form.find(element_str).val();
    
    return element_val;

  }

  
///////////////////////////////////////
///////////////////////////////////////
  $('.optionsModal__call').on("click", function(e) {
    e.preventDefault();
    //console.log('modal options call');

    var form = $(this).closest('form');
    var modal =  $(this).closest('#optionsModal');
    


    if(validateForm(form, 'user_phone')) {

      var remarkData = '&options=three';
      sendAjaxForm(form, modal, remarkData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });


  $('.optionsModal__whatsapp').on("click", function(e) {
    e.preventDefault();

    var form = $(this).closest('form');
    var modal =  $(this).closest('#optionsModal');

    if(validateForm(form, 'user_phone')) {
      var remarkData = '&whatsapp=call&options=three';
      sendAjaxForm(form, modal, remarkData);
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  

///////////////////////////////////////////
  $('.mainModal__call').on("click", function(e) {
    e.preventDefault();

    var form = $(this).closest('form');
    var modal =  $(this).closest('#mainModal');
    var remarkData = '';

    if(validateForm(form, 'user_phone')) {

      sendAjaxForm(form, modal, remarkData);
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  $('.mainModal__whatsap').on("click", function(e) {
    e.preventDefault();
 

    var form = $(this).closest('form');
    var modal =  $(this).closest('#mainModal');

    if(validateForm(form, 'user_phone')) {
      
      var whatsapData = '&whatsapp=call';

      sendAjaxForm(form, modal, whatsapData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  /////////////////////////////////////////


  ///////////////////////////////////////////
  $('.tzModal__call').on("click", function(e) {
    e.preventDefault();
  
    var form = $(this).closest('form');
   
    var modal =  $(this).closest('#tzModal');
    var remarkData = '&options=tz';
    //console.log('modal', modal);

    if(validateForm(form, 'user_phone')) {

      sendAjaxForm(form, modal, remarkData);
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  $('.tzModal__whatsap').on("click", function(e) {
    e.preventDefault();


    var form = $(this).closest('form');
    var modal =  $(this).closest('#tzModal');

    //console.log('modal', modal);

    if(validateForm(form, 'user_phone')) {
      
      var whatsapData = '&whatsapp=call&options=tz';

      sendAjaxForm(form, modal, whatsapData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  /////////////////////////////////////////



//////////////////////////////////////////
  $('.pricelist-form__call').on("click", function(e) {
    e.preventDefault();
    console.log('pricelist-form call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    // var modal =  $(this).closest('#mainModal');

    //console.log('modal', modal);
    var user_email = form.find("input[name='user_email']").val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

    if(user_email && re.test(user_email)) {

      var remarkData = '&options=price';

      // sendAjaxForm(form, modal, remarkData);

      $.ajax({
        url:     'php/send.php', //url страницы 
        type:     "POST", //метод отправки
        data: $(form).serialize() + remarkData,
        // dataType: "html", //формат данных
        // data: $(form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
          var messageType = response.type;
          var messageText = response.message;

          if(messageType == 'success') {
            console.log("Данные отправлены \n" + messageText, messageType);
      
            $(form).find('label.user_email').css({'color': 'transparent'});
            $(form)[0].reset();
            $('#successModal').modal('show');

          }
         
          else {
            //console.log("Не удалось загрузить файл. \n" + messageText, messageType);
            $('#successModal').find('.fail .modal-title').text('Возникла ошибка.');
            $('#successModal').find('.fail .modal-subtitle').text('Попробуйте позже');
        
            $('#successModal').find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $('#successModal').find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_email').css({'color': 'transparent'});
            $(form)[0].reset();

            $('#successModal').modal('show');
          }
  
          // var messageText = response.message;
          // console.log("Данные отправлены \n" + messageText);
  
          // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
          // $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
          
          
    
        },
  
        error: function(response) { // Данные не отправлены
            console.log('Ошибка. Данные не отправлены.'+response.responseText);
            /*** Вызываем окно ошибки */
            $('#successModal').find('.fail .modal-title').text('Возникла ошибка.');
            $('#successModal').find('.fail .modal-subtitle').text('Попробуйте позже');
        
            $('#successModal').find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $('#successModal').find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_email').css({'color': 'transparent'});
            $(form)[0].reset();

            $('#successModal').modal('show');
           
        } 
    });
      
    }
    else {
      $(form).find('label.user_email').css({'color': 'red', 'transition': 'color .3s'});
      //$(form).find('input').text('');
      //console.log('empty');
    }
  
    return false; 
  });

/////////////////////////////////
////////////////////////////////
  $('.contact-form__call').on("click", function(e) {
    e.preventDefault();
    console.log('contact-form call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    

    if(validateForm(form, 'user_phone')) {

      var remarkData = '&options=enginier';
      //sendAjaxForm(url, form, modal, remarkData);

      $.ajax({
        url:     url, //url страницы 
        type:     "POST", //метод отправки
        data: $(form).serialize() + remarkData,
        // dataType: "html", //формат данных
        // data: $(form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
  
          var messageType = response.type;
          var messageText = response.message;

          if(messageType == 'success') {
            console.log("Данные отправлены \n" + messageText, messageType);
      
            $(form).find('label.user_phone').css({'color': 'transparent'});
            $(form)[0].reset();
            $('#successModal').modal('show');

          }
         
          else {
            //console.log("Не удалось загрузить файл. \n" + messageText, messageType);
            $('#successModal').find('.fail .modal-title').text('Возникла ошибка.');
            $('#successModal').find('.fail .modal-subtitle').text('Попробуйте позже');
        
            $('#successModal').find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $('#successModal').find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_phone').css({'color': 'transparent'});
            $(form)[0].reset();

            $('#successModal').modal('show');
          }
  
          

        },
  
        error: function(response) { // Данные не отправлены
            console.log('Ошибка. Данные не отправлены.'+response.responseText);
            /*** Вызываем окно ошибки */
            // $('.modal-error').fadeIn();
            $('#successModal').find('.fail .modal-title').text('Возникла ошибка.');
            $('#successModal').find('.fail .modal-subtitle').text('Попробуйте позже');
        
            $('#successModal').find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $('#successModal').find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_phone').css({'color': 'transparent'});
            $(form)[0].reset();

            $('#successModal').modal('show');
        } 
    });
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  $('.contact-form__whatsapp').on("click", function(e) {
    e.preventDefault();
    console.log('contact-form whatsapp call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    // var modal =  $(this).closest('#mainModal');

    //console.log('modal', modal);

    if(validateForm(form, 'user_phone')) {

      var remarkData = '&whatsapp=enginier';//&whatsapp=enginier
      //sendAjaxForm(url, form, modal, remarkData);

      $.ajax({
        url:     url, //url страницы 
        type:     "POST", //метод отправки
        data: $(form).serialize() + remarkData,
        // dataType: "html", //формат данных
        // data: $(form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
  
          var messageType = response.type;
          var messageText = response.message;

          if(messageType == 'success') {
            console.log("Данные отправлены \n" + messageText, messageType);
      
            $(form).find('label.user_phone').css({'color': 'transparent'});
            $(form)[0].reset();
            $('#successModal').modal('show');

          }
         
          else {
            //console.log("Не удалось загрузить файл. \n" + messageText, messageType);
            $('#successModal').find('.fail .modal-title').text('Возникла ошибка.');
            $('#successModal').find('.fail .modal-subtitle').text('Попробуйте позже');
        
            $('#successModal').find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $('#successModal').find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_phone').css({'color': 'transparent'});
            $(form)[0].reset();

            $('#successModal').modal('show');
          }
  
          

        },
  
        error: function(response) { // Данные не отправлены
            console.log('Ошибка. Данные не отправлены.'+response.responseText);
            /*** Вызываем окно ошибки */
            // $('.modal-error').fadeIn();
            $('#successModal').find('.fail .modal-title').text('Возникла ошибка.');
            $('#successModal').find('.fail .modal-subtitle').text('Попробуйте позже');
        
            $('#successModal').find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $('#successModal').find('.fail').css({'display': 'block', 'transition': 'display 1s'});
            
            $(form).find('label.user_phone').css({'color': 'transparent'});
            $(form)[0].reset();

            $('#successModal').modal('show');
        }  
    });
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });
///////////////////////////
/////////////////////////////////////
  


$('.uploadModal__call').on("click", function(e) {
  e.preventDefault();
  console.log('modal upload call');

  var form = $(this).closest('form');
  var modal =  $(this).closest('#uploadModal');

  uploadAjax(form, modal, whatsapp=true);

  return false; 
  
});

$('.uploadModal__whatsapp').on("click", function(e) {
  e.preventDefault();
  console.log('modal upload call');

  var form = $(this).closest('form');
  var modal =  $(this).closest('#uploadModal');

  uploadAjax(form, modal, whatsapp=true);

  return false; 
});

///////////////////////
////////////////////////

  


  
  $('.calcModal__call').on("click", function(e) {
 
    e.preventDefault();

    //e.preventDefault();
    console.log('modal calc');


    var form = $(this).closest('form');
    var modal =  $(this).closest('#calcModal');



    if(validateForm(form, 'user_phone')) {
      var form_data = new FormData();

      var userPhone = $(form).find('input').val();
      var square = $('#calc-form').find('input#input_square').val();
      var baget = $('#calc-form').find('input#input_baget').val();
      var material = $('#calc-form').find('select#input_material').val();
      var time = $('#calc-form').find('input#input_time').val();
      var remarkData = "calc";

      console.log(square, baget, material, time, remarkData);

      form_data.append('user_phone', userPhone);
      form_data.append('options', remarkData);
      form_data.append('square', square);
      form_data.append('baget', baget);
      form_data.append('material', material);
      form_data.append('time', time);

      

      //console.log(form_data[0], form_data[1]);
      
    
      $.ajax({
        url: 'php/send.php',
        //dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            //alert(php_script_response);
            //console.log('uploaded');
            var messageText = response.message;
            console.log("Данные отправлены \n" + messageText);

            $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
            $(form).find('label.user_phone').css({'color': '#ffffff'});
            $(form)[0].reset();
            $('#calc-form')[0].reset(); 
            $('#calc-form output.baget').val(30000); 
            $('#calc-form output.square').val(0); 
            $('#calc-form output').css('left', '0'); 


        },
        error: function(response) { // Данные не отправлены
          console.log('Ошибка. Данные не отправлены.'+response.responseText);
          /*** Вызываем окно ошибки */
          // $('.modal-error').fadeIn();
        
      } 
      });
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }

  
    return false; 

  });

  $('.calcModal__whatsapp').on("click", function(e) {
 
    e.preventDefault();

    //e.preventDefault();
    console.log('modal calc');


    var form = $(this).closest('form');
    var modal =  $(this).closest('#calcModal');



    if(validateForm(form, 'user_phone')) {
      var form_data = new FormData();

      var userPhone = $(form).find('input').val();
      var square = $('#calc-form').find('input#input_square').val();
      var baget = $('#calc-form').find('input#input_baget').val();
      var material = $('#calc-form').find('select#input_material').val();
      var time = $('#calc-form').find('input#input_time').val();
      var remarkData = "calc";

      console.log(square, baget, material, time, remarkData);

      form_data.append('user_phone', userPhone);
      form_data.append('options', remarkData);
      form_data.append('whatsapp', 'call');
      form_data.append('square', square);
      form_data.append('baget', baget);
      form_data.append('material', material);
      form_data.append('time', time);

      

      //console.log(form_data[0], form_data[1]);
      
    
      $.ajax({
        url: 'php/send.php',
        //dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            //alert(php_script_response);
            //console.log('uploaded');
            var messageText = response.message;
            console.log("Данные отправлены \n" + messageText);

            $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
            $(form).find('label.user_phone').css({'color': '#ffffff'});
            $(form)[0].reset();
            $('#calc-form')[0].reset();  
            $('#calc-form output.baget').val(30000); 
            $('#calc-form output.square').val(0); 
            $('#calc-form output').css('left', '0'); 
        },
        error: function(response) { // Данные не отправлены
          console.log('Ошибка. Данные не отправлены.'+response.responseText);
          /*** Вызываем окно ошибки */
          // $('.modal-error').fadeIn();
        
      } 
      });
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }

  
    return false; 

  });


  //////////////////////////
  ///////////////////////


  // $('.calc-form__button').on("click", function(e) {
 
  //   e.preventDefault();

  //   var user_name = form.find("input[name='user_phone']").val();

  // });

  //Floors background tabs manipulations
  $(".floors-features .nav-link").click(
    function(){
      console.log('tab-click ');
      var imgName = '';
      switch(this.id) {
        case 'floors-oil-tab':
          imgName = 'oil';
          break;
        case 'floors-farm-tab':
          imgName = 'farm';
          break;
        case 'floors-food-tab':
          imgName = 'food';
          break;
        case 'floors-chemistry-tab':
          imgName = 'chemistry';
          break;
        case 'floors-drugs-tab':
          imgName = 'drugs';
          break;
        case 'floors-logs-tab':
          imgName = 'logs';
          break;
        default:
          imgName = 'oil';
      }

      $(".floors").css({'background-image': 'url(images/floors/floors-' + imgName + '.png)'});
      
      $(".tab-pane.fade").css({'transition': 'opacity .3s'});

   

      
    });
    


});