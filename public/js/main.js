$.getJSON("json/archivo.json", function(data){
    var items = [];
    
    $.each(data, function(key, val){
        items.push("<tr>");
        items.push("<td id=''"+key+"''>"+val.Name+"</td>");
        items.push("<td id=''"+key+"''>"+val.City+"</td>");
        items.push("<td id=''"+key+"''>"+val.Country+"</td>");
        items.push("</tr>");
    });
 $("<tbody/>", {html: items.join("")}).appendTo("table");   
});
