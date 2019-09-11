//Formulario
var form = $('#form');

//Mensajes del formulario
var errorHandler1 = $('.errorHandler', form);
var successHandler1 = $('.successHandler', form);

//Metodo post para guardar o actualiar datos
function post()
{
  var data  = $('#form').serialize();
  var url = "/login";

  $.post(url, data, function(result){
    $("#mensaje_correcto").html(result.message);
    if (result.status == 200){
      setTimeout( function(){
        successHandler1.hide();
        $("#form")[0].reset();
      }, 3000 );
      window.location.href = "/instrucciones";
    }
  }).fail( function(result) {
    $("#mensaje_error").html(result.responseJSON.message);
    successHandler1.hide();
    errorHandler1.show();
  });
}
