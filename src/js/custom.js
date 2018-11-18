$(document).ready(function(){

  // MASKED INPUT
  jQuery(function($){
    // $('#popup-input').mask("+7 (999) 999-99-99");
    $('input.contact-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    $('input.modal-input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    // $('#main-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (XXX) XXX-XX-XX"});
  });

  //$('#optionsForm').validator();


  function sendAjaxForm(url, form, modal) {
    console.log(url, form);
    $.ajax({
      url:     url, //url страницы 
      type:     "POST", //метод отправки
      data: $(form).serialize(),
      // dataType: "html", //формат данных
      // data: $(form).serialize(),  // Сеарилизуем объект
      success: function(response) { //Данные отправлены успешно

        var messageText = response.message;
        console.log('Ок. Данные отправлены ' + messageText);

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
    console.log('modal closed');
    var modal =  $(this).closest('.modal');

    $(modal).find('.content').css({'display': 'block', 'transition': 'display .5s'});
    $(modal).find('.content__sent').css({'display': 'none', 'transition': 'display 1s'});
  
    return true; 
  });
  $('.content button.close').on("click", function(e) {
    //e.preventDefault();
    console.log('modal closed');
    var modal =  $(this).closest('.modal');

    $(modal).find('label.user_phone').css({'color': '#ffffff'});
  
    return true; 
  });


  $( "input[name='user_phone']").keydown(function() {
    //console.log( "keydown" );
   
    var modal =  $(this).closest('.modal');
    $(modal).find('label.user_phone').css({'color': '#ffffff'});
    // user_name_label = $(this).parent().find('label.user_name');
    //   if(user_name_label) {
    //       //console.log('user_name_label '+ user_name_label);
    //       user_name_label.css('color', 'transparent');
    //       $(this).css('border-color', '#777777');
    //   }
    //   else {
    //       //console.log('Не могу получить user_name_label');
    //   }
      
      
  });
  

  $('.optionsModal__call').on("click", function(e) {
    e.preventDefault();
    console.log('modal options call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#optionsModal');

    //console.log('modal', modal);

    if(validateForm(form)) {

      sendAjaxForm(url, form, modal);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });


  $('.mainModal__call').on("click", function(e) {
    e.preventDefault();
    console.log('modal main call');

    var form = $(this).closest('form');
    var url = 'php/send.php';
    var modal =  $(this).closest('#mainModal');

    //console.log('modal', modal);

    if(validateForm(form)) {

      sendAjaxForm(url, form, modal);
      
    }
    else {
      $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
    }
  
    return false; 
  });








  // Download form 

  // Отправка формы
  function submitUpload(e) {
    e.preventDefault();
    console.log('upload ');

    // var $photos = $('.js-photos'),
    //     formdata = new FormData;

    // // Добавление файлов в formdata
    // $photos.each(function(index, $photo) {
    //     if ($photo.files.length) {
    //         formdata.append('photos[]', $photo.files[0]);
    //     }
    // });

    // // Отправка на сервер
    // $.ajax({
    //     url: 'php/upload.php',
    //     data: formdata,
    //     type: 'POST',
    //     dataType: 'json',
    //     processData: false,
    //     contentType: false,
    //     success: function(responce) {
    //         console.log('responce from server: ', responce);
    //     }
    // });
}



//Clicks

// $('.optionsModal__call').on("click", function(e) {
//   e.preventDefault();
//   console.log('modal options call');

//   var form = $(this).closest('form');
//   var url = 'php/send.php';
//   var modal =  $(this).closest('#optionsModal');

//   //console.log('modal', modal);

//   if(validateForm(form)) {

//     sendAjaxForm(url, form, modal);
    
//   }
//   else {
//     $(form).find('label.user_phone').css({'color': 'red', 'transition': 'color .3s'});
//   }

//   return false; 
// });

$('.uploadModal__bton').on("click", function(e) {
  e.preventDefault();
  console.log('click modal');

  
  return false;



});



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
      console.log(userPhone);
      form_data.append('phone', userPhone);
      console.log(form_data[0], form_data[1]);
      
    
      $.ajax({
        url: 'php/upload.php',
        //dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(response){
            //alert(php_script_response);
            console.log('uploaded');
            var messageText = response.message;
            console.log('Ок. Данные отправлены ' + messageText);

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

  $('.project-form__buton').on("click", function() {
 
    //e.preventDefault();

    console.log('upload started');
    //TODO validation upload file
    var file_doc = $('.inputfile').prop('files')[0];

    if(!file_doc) {
      console.log('empty upload');
      // $('.inputfile__label').text("Прикрепите файл");
      // $('.inputfile__label').css('color', 'red');

    } 
    // else {
      $('#uploadModal').modal('show');
    // }
      

    //submitUpload();


    return false; 

  });





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