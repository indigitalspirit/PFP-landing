$(document).ready(function(){

  // MASKED INPUT
  jQuery(function($){
    // $('#popup-input').mask("+7 (999) 999-99-99");
    $('input.contact-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    $('input.modal-input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    // $('#main-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (XXX) XXX-XX-XX"});
  });

  //$('#optionsForm').validator();


  function sendAjaxForm(url, form, modal, extraData) {
    //console.log(url, form, $(form).serialize() + extraData);
    $.ajax({
      url:     url, //url страницы 
      type:     "POST", //метод отправки
      data: $(form).serialize() + extraData,
      // dataType: "html", //формат данных
      // data: $(form).serialize(),  // Сеарилизуем объект
      success: function(response) { //Данные отправлены успешно

        var messageText = response.message;
        console.log("Данные отправлены \n" + messageText);

        $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
        $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
        $(form).find('label.user_phone').css({'color': '#ffffff'});
        $(form)[0].reset();
        
  
      },

      error: function(response) { // Данные не отправлены
          console.log('Ошибка. Данные не отправлены.'+response.responseText);
          /*** Вызываем окно ошибки */
          // $('.modal-error').fadeIn();
         
      } 
    });
  }

  function validateForm(form) {
    //TODO: fadein\fadeout\buttons disabled
    var user_name = form.find("input[name='user_phone']").val();
    
    return user_name;

  }

  $('.content__sent button.close').on("click", function(e) {
    //e.preventDefault();
    //console.log('modal closed');
    var modal =  $(this).closest('.modal');

    $(modal).find('.content').css({'display': 'block', 'transition': 'display .5s'});
    $(modal).find('.content__sent').css({'display': 'none', 'transition': 'display 1s'});
  
    return true; 
  });
  $('.content button.close').on("click", function(e) {
    //e.preventDefault();
    //console.log('modal closed');
    var modal =  $(this).closest('.modal');

    $(modal).find('label.user_phone').css({'color': '#ffffff'});
  
    return true; 
  });


  $( "input[name='user_phone']").keydown(function() {
    //console.log( "keydown" );
   
    var modal =  $(this).closest('.modal');
    $(modal).find('label.user_phone').css({'color': '#ffffff'});
    var form =  $(this).closest('form');
    $(form).find('label.user_phone').css({'color': 'transparent'});
          
  });

  $( "input[name='user_email']").keydown(function() {
    //console.log( "keydown" );
   
  
    var form =  $(this).closest('form');
    $(form).find('label.user_email').css({'color': 'transparent'});
          
  });
  
///////////////////////////////////////
///////////////////////////////////////
  $('.optionsModal__call').on("click", function(e) {
    e.preventDefault();
    console.log('modal options call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#optionsModal');

    //console.log('modal', modal);

    if(validateForm(form)) {

      var remarkData = '&options=three';
      sendAjaxForm(url, form, modal, remarkData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });


  $('.optionsModal__whatsapp').on("click", function(e) {
    e.preventDefault();
    console.log('modal options whatsapp');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#optionsModal');

    //console.log('modal', modal);

    if(validateForm(form)) {

      var remarkData = '&whatsapp=call&options=three';
      sendAjaxForm(url, form, modal, remarkData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });

  

///////////////////////////////////////////
  $('.mainModal__call').on("click", function(e) {
    e.preventDefault();
    console.log('modal main call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#mainModal');
    var remarkData = '';
    //console.log('modal', modal);

    if(validateForm(form)) {

      sendAjaxForm(url, form, modal, remarkData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });
  $('.mainModal__whatsap').on("click", function(e) {
    e.preventDefault();
    console.log('modal main whatsap call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#mainModal');

    //console.log('modal', modal);

    if(validateForm(form)) {
      
      var whatsapData = '&whatsapp=call';

      sendAjaxForm(url, form, modal, whatsapData);
      
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
    console.log('modal tz call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#tzModal');
    var remarkData = '&options=tz';
    //console.log('modal', modal);

    if(validateForm(form)) {

      sendAjaxForm(url, form, modal, remarkData);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });
  $('.tzModal__whatsap').on("click", function(e) {
    e.preventDefault();
    console.log('modal tz whatsap call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#tzModal');

    //console.log('modal', modal);

    if(validateForm(form)) {
      
      var whatsapData = '&whatsapp=call&options=tz';

      sendAjaxForm(url, form, modal, whatsapData);
      
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

      $.ajax({
        url:     url, //url страницы 
        type:     "POST", //метод отправки
        data: $(form).serialize() + remarkData,
        // dataType: "html", //формат данных
        // data: $(form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
  
          var messageText = response.message;
          console.log("Данные отправлены \n" + messageText);
  
          // $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
          // $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
          $(form).find('label.user_email').css({'color': 'transparent'});
          $(form)[0].reset();
          $('#successModal').modal('show');

          
    
        },
  
        error: function(response) { // Данные не отправлены
            console.log('Ошибка. Данные не отправлены.'+response.responseText);
            /*** Вызываем окно ошибки */
            // $('.modal-error').fadeIn();
           
        } 
    });
      
    }
    else {
      $(form).find('label.user_email').css({'color': 'red', 'transition': 'color .3s'});
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
    // var modal =  $(this).closest('#mainModal');

    //console.log('modal', modal);

    if(validateForm(form)) {

      var remarkData = '&options=enginier';
      //sendAjaxForm(url, form, modal, remarkData);

      $.ajax({
        url:     url, //url страницы 
        type:     "POST", //метод отправки
        data: $(form).serialize() + remarkData,
        // dataType: "html", //формат данных
        // data: $(form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
  
          var messageText = response.message;
          console.log("Данные отправлены \n" + messageText);
  
          $(form).find('label.user_phone').css({'color': 'transparent'});
          $(form)[0].reset();
          $('#successModal').modal('show');

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

  $('.contact-form__whatsapp').on("click", function(e) {
    e.preventDefault();
    console.log('contact-form whatsapp call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    // var modal =  $(this).closest('#mainModal');

    //console.log('modal', modal);

    if(validateForm(form)) {

      var remarkData = '&whatsapp=enginier';//&whatsapp=enginier
      //sendAjaxForm(url, form, modal, remarkData);

      $.ajax({
        url:     url, //url страницы 
        type:     "POST", //метод отправки
        data: $(form).serialize() + remarkData,
        // dataType: "html", //формат данных
        // data: $(form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
  
          var messageText = response.message;
          console.log("Данные отправлены \n" + messageText);
  
          $(form).find('label.user_phone').css({'color': 'transparent'});
          $(form)[0].reset();
          $('#successModal').modal('show');

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
///////////////////////////
/////////////////////////////////////
  

$('.uploadModal__call').on("click", function(e) {
  e.preventDefault();
  console.log('modal upload call');


  var form = $(this).closest('form');
  var modal =  $(this).closest('#uploadModal');


    var file_doc = $('.inputfile').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_doc);
    

    if(validateForm(form)) {
      var userPhone = $(form).find('input').val();
      form_data.append('options', 'three');
      //console.log(userPhone);
      form_data.append('user_phone', userPhone);
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
            console.log("Данные отправлены \n" + messageText, response);

            $(modal).find('.content').css({'display': 'none', 'transition': 'display .5s'});
            $(modal).find('.content__sent').css({'display': 'block', 'transition': 'display 1s'});
            $(form).find('label.user_phone').css({'color': '#ffffff'});
            $(form)[0].reset();
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

$('.uploadModal__whatsapp').on("click", function(e) {
  e.preventDefault();
  console.log('modal upload call');


  var form = $(this).closest('form');
  var modal =  $(this).closest('#uploadModal');


    var file_doc = $('.inputfile').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_doc);
    

    if(validateForm(form)) {
      var userPhone = $(form).find('input').val();
      //var options = "&options=three";
      //console.log(userPhone);
      form_data.append('options', 'three');
      form_data.append('whatsapp', 'call');
      form_data.append('user_phone', userPhone);
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

///////////////////////
////////////////////////

  


  
  $('.calcModal__call').on("click", function(e) {
 
    e.preventDefault();

    //e.preventDefault();
    console.log('modal calc');


    var form = $(this).closest('form');
    var modal =  $(this).closest('#calcModal');



    if(validateForm(form)) {
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



    if(validateForm(form)) {
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