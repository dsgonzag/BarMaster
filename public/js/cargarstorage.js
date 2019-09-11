var frutasVerificando=localStorage.getItem("frutas");
if(frutasVerificando==null || frutasVerificando=="undefined"){
var arrayFrutas=JSON.parse(frutas);

localStorage.setItem("frutas",JSON.stringify(arrayFrutas));

}

