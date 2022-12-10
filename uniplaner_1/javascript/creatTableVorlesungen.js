window.addEventListener("load", function () {

    console.log("create Table Vorlesungen")

    let type = 'vorlesung'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=0 width=100% class='table'><tr><th>Bezeichnung</th><th>Modul</th><th>Dauer</th><th>Studiengang</th><th>Dozent</th></tr>";


    for (element of data) {
        HTML += "<tr><td>" + element.bezeichnung + "</td>"
        HTML += "<td>" + element.modul + "</td>"
        HTML += "<td>" + element.dauer + "</td>"
        HTML += "<td>" + getItemById(getDataFromLocalStorage("studiengang"), element.studiengang).bezeichnung + "</td>"
        HTML += "<td>" + getItemById(getDataFromLocalStorage("dozent"), element.dozent).name + "</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px" onclick="editVorlesung(${element.id})"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if (data.length == 0) {
        HTML = "<h3 class='text-center p-2'>Noch keine Einträge</h3>"
    }

    document.getElementById("tableVorlesung").innerHTML = HTML;
    setSelcetionStudiengang();
    setSelcetionDozent();
    styleTable(document.getElementById("tableVorlesung"))
});

function setSelcetionStudiengang() {
    let data = getDataFromLocalStorage('studiengang')
    console.log(data)
    var HTML = ""
    for (item of data) {
        console.log(item.bezeichnung)
        HTML += "<option value=" + item.id + ">" + item.bezeichnung + "</option>";
    }
    document.getElementById("selectStudiengang").innerHTML = HTML;
}

function setSelcetionDozent() {
    let data = getDataFromLocalStorage('dozent')
    console.log(data)
    var HTML = ""
    for (item of data) {
        console.log(item.name)
        HTML += "<option value=" + item.id + ">" + item.name + "</option>";
    }
    document.getElementById("selcetDozent").innerHTML = HTML;
}

function editVorlesung(id) {
    console.log("editVorlesung")
    let data = getDataFromLocalStorage('vorlesung')
    let editElement = "No data found"
    for (item of data) {
        if (item.id == id) {
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
    setDataToLocalStorage(dataType, newData.filter(item => { return item.id != id }))
}