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
$(".project-form__button").click(
  function(){
    console.log('upload ');
    submitUpload();
  });

    


});