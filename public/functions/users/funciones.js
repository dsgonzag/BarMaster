//Formulario
var form = $('#form');

//Mensajes del formulario
var errorHandler1 = $('.errorHandler', form);
var successHandler1 = $('.successHandler', form);

//Agrega y quita boton eliminar y validaciones
var removeButton = $('.remove-event', form);
var removeErrors = $('.form-group', form);

//Metodo post para guardar o actualiar datos
function post()
{
  var data = form.serialize();
  var url = "/administrator/users/store";

  $.post(url, data, function(result){
    $("#txt_id").val(result.id);
    $("#mensaje_correcto").html(result.message);
    successHandler1.show();
    errorHandler1.hide();
    refresh_table();

    setTimeout( function(){
      limpiar_form();
    }, 2000 );
  }).fail( function(result) {
    $("#mensaje_correcto").html(result.message);
    successHandler1.hide();
    errorHandler1.show();
  });
}

//Metodo read para consultar un registro especifico
function read(id)
{
  limpiar_form();
  $("#txt_id").val(id);

  var data= form.serialize();
  var url="/administrator/users/read";

  $.post(url, data, function(result){
    $("#txt_nombre").val(result.result.nombre);
    $("#txt_email").val(result.result.username);
    $("#txt_pass").val(result.result.pass);

    $("#mensaje_correcto").html(result.message);
    removeButton.show();
    successHandler1.show();
    errorHandler1.hide();
  }).fail( function(result) {
    $("#mensaje_correcto").html(result.message);
    successHandler1.hide();
    errorHandler1.show();
  });
}

//Metodo remove form para eliminar un registro desde el formulario
function remove_form()
{
  var data= form.serialize();
  var url="/administrator/users/remove";

  $.post(url, data, function(result){
    $("#mensaje_correcto").html(result.message);
    successHandler1.show();
    errorHandler1.hide();
    setTimeout( function(){
      limpiar_form();
    }, 2000 );
    refresh_table();
  }).fail( function(result) {
    $("#mensaje_correcto").html(result.message);
    successHandler1.hide();
    errorHandler1.show();
  });
}

//Metodo remove grid para eliminar un registro desde la tabla grid
function remove_grid(id)
{
  $("#txt_id").val(id);

  var data= form.serialize();
  var url="/administrator/users/remove";

  $.post(url, data, function(result){
    alert(result.message);
  }).fail( function(result) {
    $.blockUI({ message : result.message });
    setTimeout( function(){
      $.unblockUI();
    }, 2000 );
  });
}

//Metodo limiar form para limpiar los campos y mensajes del formulario
function limpiar_form()
{
  removeButton.hide();
  removeErrors.removeClass('has-error');
  $('.help-block').remove();

  successHandler1.hide();
  errorHandler1.hide();

  document.getElementById("txt_id").value="";
  $("#txt_nombre").val("");
  $("#txt_email").val("");
  $("#txt_pass").val("");
}

//Metodo para refrescar la tabla con datos
function refresh_table()
{
  oTable.ajax.reload();
}
