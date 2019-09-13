$(document).ready(function() {

  var ruta="../"
  var imagenes=[]
  var tagImagenes=[]
  var verificadorLeche = true;
  var verificadorYogurt = true;
  var verificadorTostada = true;
  var verificadorCake = true;
  var verificadorSandia = true;
  var verificadorManzana = true;
  var verificadorGuineo = true;
  var numConstructores=0, numEnergeticos=0, numReguladores=0;

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

    var audiohamburguesa = document.createElement('audio');
    audiohamburguesa.setAttribute('src', 'audio/hamburguesa.mp3');

    var audioHotdog = document.createElement('audio');
    audioHotdog.setAttribute('src', 'audio/hotdog.mp3');

    var audioCocacola = document.createElement('audio');
    audioCocacola.setAttribute('src', 'audio/cola.mp3');

    var audioLeche = document.createElement('audio');
    audioLeche.setAttribute('src', 'audio/leche.mp3');

    var audioYogurt = document.createElement('audio');
    audioYogurt.setAttribute('src', 'audio/yogurt.mp3');

    var audioTostada = document.createElement('audio');
    audioTostada.setAttribute('src', 'audio/tostada.mp3');

    var audioCake = document.createElement('audio');
    audioCake.setAttribute('src', 'audio/cake.mp3');

    var audioSandia = document.createElement('audio');
    audioSandia.setAttribute('src', 'audio/sandia.mp3');

    var audioManzana = document.createElement('audio');
    audioManzana.setAttribute('src', 'audio/manzana.mp3');

    var audioGuineo = document.createElement('audio');
    audioGuineo.setAttribute('src', 'audio/guineo.mp3');

    var acierto = document.createElement('audio');
    acierto.setAttribute('src', 'audio/acierto.mp3');

    var oh_no= document.createElement('audio');
    oh_no.setAttribute('src', 'audio/oh_no.mp3');

    var muybien = document.createElement('audio');
    muybien.setAttribute('src', 'audio/muybien.mp3');

    var ganaste = document.createElement('audio');
    ganaste.setAttribute('src', 'audio/ganador.mp3');


    /*
    $("a.external").click(function() { url = $(this).attr("href"); window.open(url, '_blank'); return false; });*/
    $(".alimentos").draggable({

      helper:"clone",
      drag: function(event, ui)
      {
        console.log($ (this).attr('id'))
        imagenes.forEach(element=>{
          if($(this).attr('id')==element.id){
            if(element.sonido == "sonidoHambur"){
              audiohamburguesa.play();
              return
            }
            if(element.sonido == "sonidoHotDog") {
              audioHotdog.play();
            }
            if(element.sonido== "sonidoCola") {
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
    });


    $(".lonchCont").droppable({
      accept: ".alimentos",
      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=> {
          if($(ui.draggable).attr('id')==element.id){
            console.log(element.puntos)
            console.log(puntajeJuego)
            ui.draggable.detach();
            let contene=element.id;

            console.log("contadorLonchera")
            console.log(contadorLonchera)

            if(contadorLonchera<4){

              //          if ($ (ui.draggable).hasClass( "dañinos") ) {
              //            $("#dañinos").append(ui.draggable)
              //           malo.play();
              //            return
              //          }
              if ($ (ui.draggable).hasClass("dañinos")) {
                $( ".cont1" ).append( ui.draggable  );
                oh_no.play();

                puntajeJuego += element.puntos;
                $(".puntaje").text(puntajeJuego.toString())
                guarda_puntaje(element.puntos);
                contadorLonchera++
                if (contadorLonchera >= 4)
                {
                  window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                  muybien.play();
                }

                return

              }

              if ($ (ui.draggable).hasClass("contructores")) {
                $( ".cont1" ).append( ui.draggable  );

                if (verificadorLeche == true && contene == 4) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorLeche = false;
                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }


                }
                if (verificadorYogurt == true && contene == 5) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorYogurt = false;
                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }


                }
                return
              }
              if ($ (ui.draggable).hasClass("energeticos")) {
                $( ".cont2" ).append( ui.draggable );
                if (verificadorTostada == true && contene == 6) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorTostada = false;
                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }


                }
                if (verificadorCake == true && contene == 7) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorCake = false;

                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }

                }
                return
              }

              if ($ (ui.draggable).hasClass("reguladores")) {
                $( ".cont3" ).append( ui.draggable /*, audioElement.play()*/ );

                if (verificadorSandia == true && contene == 8) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorSandia = false;
                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }


                }
                if (verificadorManzana == true && contene == 9) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorManzana = false;

                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }

                }
                if (verificadorGuineo == true && contene == 10) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera++
                  verificadorGuineo = false;

                  if (contadorLonchera >= 4)
                  {
                    window.location.href = "/bar2?" + "puntos=" + puntajeJuego;
                    muybien.play();
                  }

                }
                acierto.play();

                return
              }

            }
            else{
              let contenedor=element.categoria;
              console.log(contenedor)
              $("#"+contenedor).append( ui.draggable )
              // window.alert("lonchera llena tu puntaje es " +puntajeJuego );
              $(".puntaje2").text(puntajeJuego.toString())
              /* se cear el json  */
              createJSON();
              function createJSON() {
                var textRegu =  "";
                var textConst=  "";
                var textEnerg =  "";
                textRegu =  "";
                textConst=  "";
                textEnerg =  "";
                console.log(textEnerg)
                $('#lonchRegu').find( '.reguladores').each(function() {
                  imagenes.forEach(element=> {
                    if(element.id == this.id ){
                      textRegu += element.name +" "
                    }
                  })
                });
                var res = textRegu.slice(0, -1);
                let valores=res.split(" ");

                $('#lonchContru').find( '.contructores').each(function() {
                  imagenes.forEach(element=> {
                    if(element.id == this.id ){
                      textConst += element.name +" "
                    }
                  })
                });
                var res2 = textConst.slice(0, -1);
                let valores2=res2.split(" ");

                $('#lonchEnerg').find( '.energeticos').each(function() {
                  imagenes.forEach(element=> {
                    if(element.id == this.id ){
                      textEnerg += element.name +" "
                    }
                  })
                });
                var res3 = textEnerg.slice(0, -1);
                let valores3=res3.split(" ");


              }


              window.location.href = "/Puntaje?" + "puntos=" + puntajeJuego;
              hazArmado.play();
              $(".puntaje2").text(puntajeJuego.toString())
            }
          }
        })
        $(".puntaje").text(puntajeJuego.toString())
      },
    });

    $("#contructores").droppable({
      accept: ".contructores",

      hoverClass: 'hovering',
      drop: function( ev, ui ) {
        imagenes.forEach(element=>{
          if($(ui.draggable).attr('id')==element.id){
            let contene=element.id;
            $( "#contructores" ).append( ui.draggable  );
            $('#descarga').hide( "slow");

            if (verificadorLeche == false  && contene == 4) {
              puntajeJuego -= element.puntos;
              $(".puntaje").text(puntajeJuego.toString())
              guarda_puntaje(element.puntos);
              contadorLonchera--
              verificadorLeche = true;
            }
            if (verificadorYogurt == false  && contene == 5) {
              puntajeJuego -= element.puntos;
              $(".puntaje").text(puntajeJuego.toString())
              guarda_puntaje(element.puntos);
              contadorLonchera--
              verificadorYogurt = true;
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
                let contene=element.id;
                $( "#energeticos" ).append( ui.draggable  );
                $('#descarga').hide( "slow");
                if (verificadorTostada == false  && contene == 6) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorTostada = true;
                }
                if (verificadorCake == false  && contene == 7) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  guarda_puntaje(element.puntos);
                  contadorLonchera--
                  verificadorCake = true;
                }
              }});
              return
            }
          })
          $("#reguladores").droppable({
            accept: ".reguladores",
            hoverClass: 'hovering',
            drop: function( ev, ui ) {
              imagenes.forEach(element=>{
                if($(ui.draggable).attr('id')==element.id){
                  let contene=element.id;
                  $( "#reguladores" ).append( ui.draggable  );
                  $('#descarga').hide( "slow");
                  if (verificadorSandia == false  && contene == 8) {
                    puntajeJuego -= element.puntos;
                    $(".puntaje").text(puntajeJuego.toString())
                    guarda_puntaje(element.puntos);
                    contadorLonchera--
                    verificadorSandia = true;
                  }
                  if (verificadorManzana == false  && contene == 9) {
                    puntajeJuego -= element.puntos;
                    $(".puntaje").text(puntajeJuego.toString())
                    guarda_puntaje(element.puntos);
                    contadorLonchera--
                    verificadorManzana = true;
                  }
                  if (verificadorGuineo == false  && contene == 10 ) {
                    puntajeJuego -= element.puntos;
                    $(".puntaje").text(puntajeJuego.toString())
                    guarda_puntaje(element.puntos);
                    contadorLonchera--
                    verificadorGuineo = true;
                  }
                }});

                return
              }
            })

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

});
