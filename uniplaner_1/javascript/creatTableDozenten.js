window.addEventListener("load", function (){

    console.log("create Table Dozenten")

    let data = getDataFromLocalStorage('dozent')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Name</th><th>Email</th><th>Alter</th><th>GitHub</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.name+"</td>"
        HTML += "<td>"+item.email+"</td>"
        HTML += "<td>"+item.alter+"</td>"
        HTML += "<td>"+item.github+"</td>"
        HTML += "<td scope='col'><img src='assets/edit.png' width='25px'></button><img src='assets/delete.png'width='25px'></button></tr>"
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableDozenten").innerHTML = HTML;
});