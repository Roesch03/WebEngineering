window.addEventListener("load", function (){

    console.log("create Table Vorlesungen")

    let data = getDataFromLocalStorage('vorlesung')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Modul</th><th>Dauer</th><th>Studiengang</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.bezeichnung+"</td>"
        HTML += "<td>"+item.modul+"</td>"
        HTML += "<td>"+item.dauer+"</td>"
        HTML += "<td>"+item.studiengang+"</td></tr>"
    }

    HTML += "</table>";
    document.getElementById("tableVorlesung").innerHTML = HTML;
});