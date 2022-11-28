window.addEventListener("load", function (){

    console.log("create Table Semester")

    let type = 'semester'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Studiengang</th><th>Datum</th></tr>";


    for(element of data){
        let newID = element.id
        let newDatum = element.datum
        HTML += "<tr><td>"+element.bezeichnung+"</td>"
        HTML += "<td>"+getItemById(getDataFromLocalStorage("studiengang"), element.studiengang).bezeichnung+"</td>"
        HTML += "<td>"+newDatum+"</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px" onclick="editSemester(${newID})"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${newID})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableSemester").innerHTML = HTML;
    setSelcetionStudiengang()
});

function setSelcetionStudiengang(){
    let data = getDataFromLocalStorage('studiengang')
    console.log(data)
    var HTML = ""
    for(item of data){
        console.log(item.bezeichnung)
        HTML += "<option value=" + item.id + ">" + item.bezeichnung + "</option>";
    }
    document.getElementById("selectStudiengang2").innerHTML = HTML;
}

function editSemester(id){
    console.log("editSemester")
    let data = getDataFromLocalStorage('semester')
    let editElement = "No data found"
    for(item of data){
        if(item.id == id){
            editElement = item
        }
    }
    document.getElementById("bezeichnung").value = editElement.bezeichnung
    document.getElementById("datum").value = editElement.datum
    //delet old object
    let dataType = 'semester'
    console.log("delete: " + dataType + id);
    let newData = getDataFromLocalStorage(dataType)
    setDataToLocalStorage(dataType, newData.filter(item => {return item.id!=id}))
}