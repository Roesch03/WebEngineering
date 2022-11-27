window.addEventListener("load", function (){

    console.log("create Table Vorlesungstermine")

    let data = getDataFromLocalStorage('vorlesungstermin')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Vorlesung</th><th>Datum</th><th>Start</th><th>Ende</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.vorlesung+"</td>"
        HTML += "<td>"+item.datum+"</td>"
        HTML += "<td>"+item.start+"</td>"
        HTML += "<td>"+item.ende+"</td>"
        HTML += "<td scope='col'><img src='assets/edit.png' width='25px'></button><img src='assets/delete.png'width='25px'></button></tr>"
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableVorlesungstermine").innerHTML = HTML;
});