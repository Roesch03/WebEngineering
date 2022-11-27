window.addEventListener("load", function (){

    console.log("create Table Studiengang")

    let data = getDataFromLocalStorage('studiengang')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Studiengangsleiter</th></tr>";


    for(item of data){
        HTML += "<tr><td align=center>"+item.bezeichnung+"</td>"
        HTML += "<td align=center>"+item.studiengangsleiter+"</td></tr>"
    }

    HTML += "</table>";
    document.getElementById("tableStudiengang").innerHTML = HTML;
});