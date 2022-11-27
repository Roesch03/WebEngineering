window.addEventListener("load", function (){

    console.log("create Table Studiengang")

    let data = getDataFromLocalStorage('studiengang')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Studiengangsleiter</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.bezeichnung+"</td>"
        HTML += "<td>"+item.studiengangsleiter+"</td>"
        HTML += "<td scope='col'><img src='assets/edit.png' width='25px'></button><img src='assets/delete.png'width='25px'></button></tr>"
    }

    HTML += "</table>";


    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableStudiengang").innerHTML = HTML;
});