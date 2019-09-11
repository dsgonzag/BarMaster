var conten=document.getElementById("contenFrutas");

var datos=JSON.parse(localStorage.getItem("frutas"));

var mostra="";

for (var img in datos) {
  var celda = document.createElement("div");

    celda.className="misfrutas";
    //esto como es un arreglo datos[]

  var imagenFrutar = document.createElement("img");
  if(datos[img].nombre.substring(0,4)=="data"){
    imagenFrutar.src=datos[img].nombre;
    imagenFrutar.className="rounded-circle personalImg";
  }else
  imagenFrutar.src='../img/'+datos[img].nombre+'';
  imagenFrutar.setAttribute("onclick","sesion("+img+")");
  var link = document.createElement("a");
  link.href='instrucciones.html';
//le metemos los valores al div celda es um div

celda.appendChild(link);

link.appendChild(imagenFrutar);
conten.appendChild(celda); //agrega los avatares

//console.log(datos[img]);
}

//crea una variable avatar
function sesion(indice){
  var frutas;
frutas= datos[indice];

//  localStorage.clear();
  localStorage.setItem("sesion",JSON.stringify(frutas));

}

var descargar=document.getElementById("export-button");
descargar.addEventListener('click', exportJSON);

function exportJSON() {
    //var IEwindow = window.open();
    //IEwindow.document.write('sep=,\r\n' + JSON.stringify(objJSON));
    //IEwindow.document.close();
    //IEwindow.document.execCommand('SaveAs', true, "datos.json");
    //IEwindow.close();

    let dataStr ="frutas=["+ JSON.stringify(datos)+"]\n";

    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = '../objetos.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
