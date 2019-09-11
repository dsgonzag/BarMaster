$(document).ready(function() {

  var ruta="../"
  var imagenes=[]
  var tagImagenes=[]

  var url = "/getAlimentos";
  var param = [];

  $.post(url, param, function(data){
    $.each(data.result, function(key, val){
      var img= document.createElement("img")

      img.src=val.rutaImg;
      img.className= 'alimentos'
      img.id=val.id
      puntos=parseInt(val.puntos, 10);
      let newElement ={
        id:val.id,
        puntos:puntos,
        rutaImg:val.rutaImg,
        name:val.name,
        sonido:val.sonido,
        categoria:val.categoria
      }

      imagenes.push(newElement)
      tagImagenes.push(img)

    });

    for (let i=0;i<tagImagenes.length;i++){
      if(imagenes[i].categoria=="reguladores"){
        tagImagenes[i].className+=' reguladores'
        $("#bar").append(tagImagenes[i])
      }else if(imagenes[i].categoria=="dañinos"){
        tagImagenes[i].className+=' dañinos'
        $("#bar").append(tagImagenes[i])
      }else if(imagenes[i].categoria=="energeticos"){
        tagImagenes[i].className+=' energeticos'
        $("#bar").append(tagImagenes[i])
      }else if(imagenes[i].categoria=="contructores"){
        tagImagenes[i].className+=' contructores'

        $("#bar").append(tagImagenes[i])
      }
    }

    var puntajeJuego = 0 ;
    var contadorLonchera=0
    var audioElement = document.createElement('audio');

    var au = $('<audio id="audi" src="audio/intro.mp3" autoplay type="audio/mpeg" loop="true" balance=-1></audio>');
    $("body").append(au);

    var audioAlimento = document.createElement('audio');
    var acierto = document.createElement('audio');
    var oh_no= document.createElement('audio');
    var muybien = document.createElement('audio');
    var ganaste = document.createElement('audio');

    acierto.setAttribute('src', 'audio/acierto.mp3');
    oh_no.setAttribute('src', 'audio/oh_no.mp3');
    muybien.setAttribute('src', 'audio/muybien.mp3');
    ganaste.setAttribute('src', 'audio/ganador.mp3');


    /*
    $("a.external").click(function() { url = $(this).attr("href"); window.open(url, '_blank'); return false; });*/
    $(".alimentos").mousedown(function(event){
        var audio="";
        imagenes.forEach(element=>{
          if($(this).attr('id')==element.id){
              audio = element.sonido;
          }
        })
        audioAlimento.setAttribute('src', 'audio/'+audio);
        audioAlimento.play();
    });

    /*$(".alimentos").draggable({

      helper:"clone",
      drag: function(event, ui)
      {
        imagenes.forEach(element=>{
          if($(this).attr('id')==element.id){
            if(element.sonido == "sonidoHambur"){
              $('#dañinos').find( this).each(function() {
                if (verificadorHambur == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorHambur = true;
                }
              });
              audiohamburguesa.play();
              return
            }
            if(element.sonido == "sonidoHotDog") {
              $('#dañinos').find( this).each(function() {
                if (verificadorHotdog == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorHotdog = true;
                }
              });
              audioHotdog.play();
              return
            }
            if(element.sonido== "sonidoCola") {
              $('#dañinos').find( this).each(function() {
                if (verificadorCola == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorCola = true;
                }
              });
              audioCocacola.play();
              return
            }

            if(element.sonido== "sonidoLeche") {
              $('#contructores').find( this).each(function() {
                if (verificadorLeche == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorLeche = true;
                }
              });
              audioLeche.play();
              return
            }
            if(element.sonido == "sonidoYogurt") {
              $('#contructores').find( this).each(function() {

                if (verificadorYogurt == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorYogurt = true;
                }
              });
              audioYogurt.play();
              return
            }
            if(element.sonido == "sonidoTostada") {
              $('#energeticos').find( this).each(function() {

                if (verificadorTostada == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorTostada = true;
                }
              });
              audioTostada.play();
              return
            }
            if(element.sonido == "sonidoCake") {
              $('#energeticos').find( this).each(function() {
                if (verificadorCake == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorCake = true;
                }
              });
              audioCake.play();
              return
            }
            if(element.sonido == "sonidoSandia") {
              $('#reguladores').find( this).each(function() {
                if (verificadorSandia == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorSandia = true;
                }
              });
              audioSandia.play();
              return
            }
            if(element.sonido == "sonidoManzana") {
              $('#reguladores').find( this).each(function() {
                if (verificadorManzana == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorManzana = true;
                }
              });
              audioManzana.play();
              return
            }
            if(element.sonido == "sonidoGuineo") {
              $('#reguladores').find( this).each(function() {
                if (verificadorGuineo == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorGuineo = true;
                }
              });
              audioGuineo.play();
              return
            }
          }
        })
      }
    });*/

    $(".alimentos").draggable({
      helper:"clone"
    });

    $("#contructores").droppable({
      accept: ".contructores",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=>{
          if($(ui.draggable).attr('id')==element.id){
            $( "#contructores" ).append( ui.draggable  );
            $('#descarga').hide( "slow");
            puntajeJuego += Math.abs(element.puntos);
            $(".puntaje").text(puntajeJuego.toString())
            guarda_puntaje(element.puntos);
            contadorLonchera++;
            if (contadorLonchera == imagenes.length)
            {
              window.location.href = "/Puntaje?" + "puntos=" + (puntajeJuego + parseInt($("#puntajeNivel1").val()));
              muybien.play();
            }
          }});
          return
    }})

    $("#energeticos").droppable({
      accept: ".energeticos",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=>{
          if($(ui.draggable).attr('id')==element.id){
            $( "#energeticos" ).append( ui.draggable  );
            $('#descarga').hide( "slow");
            puntajeJuego += Math.abs(element.puntos);
            $(".puntaje").text(puntajeJuego.toString())
            guarda_puntaje(element.puntos);
            contadorLonchera++;
            if (contadorLonchera == imagenes.length)
            {
              window.location.href = "/Puntaje?" + "puntos=" + (puntajeJuego + parseInt($("#puntajeNivel1").val()));
              muybien.play();
            }
          }});
          return
    }})

    $("#reguladores").droppable({
      accept: ".reguladores",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=>{
          if($(ui.draggable).attr('id')==element.id){
            $( "#reguladores" ).append( ui.draggable  );
            $('#descarga').hide( "slow");
            puntajeJuego += Math.abs(element.puntos);
            $(".puntaje").text(puntajeJuego.toString())
            guarda_puntaje(element.puntos);
            contadorLonchera++;

            if (contadorLonchera == imagenes.length)
            {
              window.location.href = "/Puntaje?" + "puntos=" + (puntajeJuego + parseInt($("#puntajeNivel1").val()));
              muybien.play();
            }
          }});
          return
    }})

    $("#dañinos").droppable({
      accept: ".dañinos",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=>{
          if($(ui.draggable).attr('id')==element.id){
            $( "#dañinos" ).append( ui.draggable  );
            $('#descarga').hide( "slow");
            puntajeJuego += Math.abs(element.puntos);
            $(".puntaje").text(puntajeJuego.toString())
            guarda_puntaje(element.puntos);
            contadorLonchera++;

            if (contadorLonchera == imagenes.length)
            {
              window.location.href = "/Puntaje?" + "puntos=" + (puntajeJuego + parseInt($("#puntajeNivel1").val()));
              muybien.play();
            }
          }});
          return
    }})
});

      function guarda_puntaje(puntaje){
        var url = "/puntaje";
        var param =
        {
          puntos: puntaje,
          nivel: 2
        };

        $.post(url, param, function(data){

        });
      }
});
