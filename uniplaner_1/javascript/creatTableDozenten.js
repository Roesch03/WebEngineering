window.addEventListener("load", function (){

    console.log("create Table Dozenten")

    let type = 'dozent'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Name</th><th>Email</th><th>Alter</th><th>GitHub</th></tr>";


    for(element of data){
        console.log(element.name)
        HTML += "<tr><td>"+element.name+"</td>"
        HTML += "<td>"+element.email+"</td>"
        HTML += "<td>"+element.alter+"</td>"
        HTML += "<td>"+element.github+"</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableDozenten").innerHTML = HTML;
});