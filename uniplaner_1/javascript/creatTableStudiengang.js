window.addEventListener("load", function () {

    console.log("create Table Studiengang")

    let type = 'studiengang'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=0 width=100% class='table'><tr><th>Bezeichnung</th><th>Studiengangsleiter</th></tr>";


    for (element of data) {
        HTML += "<tr><td>" + element.bezeichnung + "</td>"
        HTML += "<td>" + getItemById(getDataFromLocalStorage("dozent"), element.studiengangsleiter).name + "</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px" onclick="editStudiengang(${element.id})"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";


    console.log(data.length)
    if (data.length == 0) {
        HTML = "<h3 class='text-center p-2'>Noch keine Einträge</h3>"
    }

    document.getElementById("tableStudiengang").innerHTML = HTML;
    setSelcetionDozent()
    styleTable(document.getElementById("tableStudiengang"))
});

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

function editStudiengang(id) {
    console.log("editStudiengang")
    let data = getDataFromLocalStorage('studiengang')
    let editElement = "No data found"
    for (item of data) {
        if (item.id == id) {
            console.log(item.bezeichnung)
            editElement = item
        }
    }
    document.getElementById("bezeichnung").value = editElement.bezeichnung
    //delet old object
    let dataType = 'studiengang'
    console.log("delete: " + dataType + id);
    let newData = getDataFromLocalStorage(dataType)
    setDataToLocalStorage(dataType, newData.filter(item => { return item.id != id }))
}