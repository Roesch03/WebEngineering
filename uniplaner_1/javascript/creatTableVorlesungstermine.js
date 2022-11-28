window.addEventListener("load", function (){

    console.log("create Table Vorlesungstermine")

    let type = 'vorlesungstermin'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Vorlesung</th><th>Datum</th><th>Start</th><th>Ende</th></tr>";

    console.log(data)
    for(element of data){
        
        HTML += "<tr><td>"+getItemById(getDataFromLocalStorage("vorlesung"), element.vorlesung).bezeichnung+"</td>"
        HTML += "<td>" + element.datum + "</td>"
        HTML += "<td>"+element.start+"</td>"
        HTML += "<td>"+element.ende+"</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableVorlesungstermine").innerHTML = HTML;
    setSelcetionvorlesung()
});

function setSelcetionvorlesung(){
    let data = getDataFromLocalStorage('vorlesung')
    console.log(data)
    var HTML = ""
    for(item of data){
        console.log(item.bezeichnung)
        HTML += "<option value=" + item.id + ">" + item.bezeichnung + "</option>";
    }
    document.getElementById("selectVorlesung").innerHTML = HTML;
}