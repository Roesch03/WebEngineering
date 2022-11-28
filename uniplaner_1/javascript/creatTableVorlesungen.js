window.addEventListener("load", function (){

    console.log("create Table Vorlesungen")

    let type = 'vorlesung'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Modul</th><th>Dauer</th><th>Studiengang</th></tr>";


    for(element of data){
        HTML += "<tr><td>"+element.bezeichnung+"</td>"
        HTML += "<td>"+element.modul+"</td>"
        HTML += "<td>"+element.dauer+"</td>"
        HTML += "<td>"+getItemById(getDataFromLocalStorage("studiengang"), element.studiengang).bezeichnung+"</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px" onclick="editVorlesung(${element.id})"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableVorlesung").innerHTML = HTML;
    setSelcetionStudiengang();
});

function setSelcetionStudiengang(){
    let data = getDataFromLocalStorage('studiengang')
    console.log(data)
    var HTML = ""
    for(item of data){
        console.log(item.bezeichnung)
        HTML += "<option value=" + item.id + ">" + item.bezeichnung + "</option>";
    }
    document.getElementById("selectStudiengang").innerHTML = HTML;
}

function editVorlesung(id){
    console.log("editVorlesung")
    let data = getDataFromLocalStorage('vorlesung')
    let editElement = "No data found"
    for(item of data){
        if(item.id == id){
            console.log(item.bezeichnung)
            editElement = item
        }
    }
    document.getElementById("bezeichnung").value = editElement.bezeichnung
    document.getElementById("modul").value = editElement.modul
    document.getElementById("dauer").value = editElement.dauer
    //delet old object
    let dataType = 'vorlesung'
    console.log("delete: " + dataType + id);
    let newData = getDataFromLocalStorage(dataType)
    setDataToLocalStorage(dataType, newData.filter(item => {return item.id!=id}))
}