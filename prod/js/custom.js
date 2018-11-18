$(document).ready(function(){

  // MASKED INPUT
  jQuery(function($){
    // $('#popup-input').mask("+7 (999) 999-99-99");
    $('input.contact-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    $('input.modal-input').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    // $('#main-form__input').mask("+7 (999) 999-99-99",{placeholder:"+7 (XXX) XXX-XX-XX"});
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

$('.uploadModal__button').on("click", function(e) {
  e.preventDefault();
  console.log('click modal');

  
  return false;



});


$('.mainModal__call').on("click", function(e) {
  e.preventDefault();
  console.log('modal main call');


  return false; 
});

$('.uploadModal__call').on("click", function(e) {
  e.preventDefault();
  console.log('modal upload call');

  var form_data = new FormData();

  var file_doc = $('.inputfile').prop('files')[0];

  if(!file_doc) {
    console.log('empty upload file');
    // $('.inputfile__label').text("Прикрепите файл");
    // $('.inputfile__label').css('color', 'red');

  } 
  else {
    form_data.append('file', file_doc);
  }


  

//   var data_to_select = {
//     'device_model': device_model,
//     'device_type': device_type
// };


  $.ajax({
      url: 'php/upload.php',
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      // data: $(form).serialize(),  // Сеарилизуем объект
      // dataType: "json", //формат данных
      // data: $.param(data_to_select), 
      type: 'post',
      success: function(php_script_response){
          //alert(php_script_response);
          console.log(' Данные загружены.');
          $('#uploadModal').modal('hide');
      },

      error: function(response) { // Данные не отправлены
          console.log('Ошибка. Данные не отправлены.'+response.responseText);
      }

    });


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