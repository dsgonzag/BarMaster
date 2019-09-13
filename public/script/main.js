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
      console.log(imagenes);

    });

    for (let i=0;i<tagImagenes.length;i++){
      if(imagenes[i].categoria=="reguladores"){
        tagImagenes[i].className+=' reguladores'
        $("#reguladores").append(tagImagenes[i])
      }else if(imagenes[i].categoria=="dañinos"){
        tagImagenes[i].className+=' dañinos'
        $("#dañinos").append(tagImagenes[i])
      }else if(imagenes[i].categoria=="energeticos"){
        tagImagenes[i].className+=' energeticos'
        $("#energeticos").append(tagImagenes[i])
      }else if(imagenes[i].categoria=="contructores"){
        tagImagenes[i].className+=' contructores'
        $("#contructores").append(tagImagenes[i])
      }
    }

    var puntajeJuego = 0;
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

    $(".alimentos").draggable({
      helper:"clone"
    });

    $(".lonchCont").droppable({
      accept: ".alimentos",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=> {
          if($(ui.draggable).attr('id')==element.id){
            ui.draggable.detach();

            if(contadorLonchera<4){

              if ($ (ui.draggable).hasClass("dañinos")) {
                puntajeJuego += element.puntos;
                $(".puntaje").text(puntajeJuego.toString())

                contadorLonchera++
                if (contadorLonchera >= 4)
                {
                  window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                  muybien.play();
                }

                oh_no.play();
                guarda_puntaje(element.puntos);
              }

              if ($ (ui.draggable).hasClass("contructores")) {
                puntajeJuego += element.puntos;
                $( ".cont1" ).append(ui.draggable);
                $(".puntaje").text(puntajeJuego.toString())

                contadorLonchera++
                if (contadorLonchera >= 4)
                {
                  window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                  muybien.play();
                }

                acierto.play();
                guarda_puntaje(element.puntos);
              }

              if ($ (ui.draggable).hasClass("energeticos")) {
                puntajeJuego += element.puntos;
                $( ".cont2" ).append(ui.draggable);
                $(".puntaje").text(puntajeJuego.toString())

                contadorLonchera++
                if (contadorLonchera >= 4)
                {
                  window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                  muybien.play();
                }

                acierto.play();
                guarda_puntaje(element.puntos);
              }

              if ($ (ui.draggable).hasClass("reguladores")) {
                puntajeJuego += element.puntos;
                $( ".cont3" ).append(ui.draggable);
                $(".puntaje").text(puntajeJuego.toString())

                contadorLonchera++
                if (contadorLonchera >= 4)
                {
                  window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                  muybien.play();
                }

                acierto.play();
                guarda_puntaje(element.puntos);
              }
            }
          }
        })
      },
    });

    $("#contructores").droppable({
      accept: ".contructores",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=>{
          if($(ui.draggable).attr('id')==element.id){
            $( "#contructores" ).append( ui.draggable  );
            $('#descarga').hide( "slow");
            puntajeJuego -= element.puntos;
            $(".puntaje").text(puntajeJuego.toString())
            guarda_puntaje(element.puntos);
            contadorLonchera--;
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
            puntajeJuego -= element.puntos;
            $(".puntaje").text(puntajeJuego.toString())
            guarda_puntaje(element.puntos);
            contadorLonchera--;
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
            puntajeJuego -= element.puntos;
            $(".puntaje").text(puntajeJuego.toString())
            //guarda_puntaje(element.puntos);
            guarda_puntaje(puntajeJuego);
            contadorLonchera--;
          }});
          return
    }})
});

function guarda_puntaje(puntaje){
  var url = "/puntaje";
  var param =
  {
    puntos: puntaje,
    nivel: 1
  };

  $.post(url, param, function(data){

  });
}

});
