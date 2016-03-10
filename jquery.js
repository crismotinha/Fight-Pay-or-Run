jQuery.noConflict()
$(document).ready(function(){
  console.log("deu certo")
})

$(function(){
$('.trocar').on('click', function(){

	var valor = $('input').attr('name', 'nome').val();

	$("#form").html(valor);


})
})
