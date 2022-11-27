window.addEventListener("load", function (){

    console.log("create Table Dozenten")

    let data = getDataFromLocalStorage('dozent')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Name</th><th>Email</th><th>Alter</th><th>GitHub</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.name+"</td>"
        HTML += "<td>"+item.emial+"</td>"
        HTML += "<td>"+item.alter+"</td>"
        HTML += "<td>"+item.github+"</td></tr>"
    }

    HTML += "</table>";
    document.getElementById("tableDozenten").innerHTML = HTML;
});