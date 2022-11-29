window.addEventListener("load", function (){

    console.log("create Table Vorlesungstermine")

    let type = 'vorlesungstermin'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=1 width=100% class='table'><tr><th>Vorlesung</th><th>Datum</th><th>Start</th><th>Ende</th></tr>";

    console.log(data)
    for(element of data){  
        HTML += "<tr><td>"+getItemById(getDataFromLocalStorage("vorlesung"), element.vorlesung).bezeichnung+"</td>"
        HTML += "<td>" + element.datum + "</td>"
        HTML += "<td>"+element.start+"</td>"
        HTML += "<td>"+element.ende+"</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px" onclick="editVorlesungstermin(${element.id})"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableVorlesungstermine").innerHTML = HTML;
    setSelcetionvorlesung()
    styleTable(document.getElementById("tableVorlesungstermine"))
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

function editVorlesungstermin(id){
    console.log("editVorlesungstermin")
    let data = getDataFromLocalStorage('vorlesungstermin')
    let editElement = "No data found"
    for(item of data){
        if(item.id == id){
            editElement = item
        }
    }
    document.getElementById("datum").value = editElement.datum
    document.getElementById("start").value = editElement.start
    document.getElementById("ende").value = editElement.ende
    //delet old object
    let dataType = 'vorlesungstermin'
    console.log("delete: " + dataType + id);
    let newData = getDataFromLocalStorage(dataType)
    setDataToLocalStorage(dataType, newData.filter(item => {return item.id!=id}))
}