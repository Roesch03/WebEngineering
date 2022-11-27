window.addEventListener("load", function (){

    console.log("create Table Semester")

    let data = getDataFromLocalStorage('semester')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Studiengang</th><th>Datum</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.bezeichnung+"</td>"
        HTML += "<td>"+item.studiengang+"</td>"
        HTML += "<td>"+item.datum+"</td></tr>"
    }

    HTML += "</table>";
    document.getElementById("tableSemester").innerHTML = HTML;
});