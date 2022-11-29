window.addEventListener("load", function () {

    console.log("create Table Dozenten")

    let type = 'dozent'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=0 width=100% class='table'><tr><th>Name</th><th>Email</th><th>Alter</th><th>GitHub</th></tr>";


    for (element of data) {
        console.log(element.name)
        HTML += "<tr><td>" + element.name + "</td>"
        HTML += "<td>" + element.email + "</td>"
        HTML += "<td>" + element.alter + "</td>"
        HTML += "<td>" + element.github + "</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px" onclick="editDozent(${element.id})"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${element.id})"></tr>`
    }

    HTML += "</table>";
    console.log(data.length)
    if (data.length == 0) {
        HTML = "<h3 class='text-center p-2'>Noch keine Einträge</h3>"
    }

    document.getElementById("tableDozenten").innerHTML = HTML;
    styleTable(document.getElementById("tableDozenten"))
});

function editDozent(id) {
    console.log("editDozent")
    let data = getDataFromLocalStorage('dozent')
    let editElement = "No data found"
    for (item of data) {
        if (item.id == id) {
            editElement = item
        }
    }
    document.getElementById("name").value = editElement.name
    document.getElementById("email").value = editElement.email
    document.getElementById("alter").value = editElement.alter
    document.getElementById("github").value = editElement.github
    //delet old object
    let dataType = 'dozent'
    console.log("delete: " + dataType + id);
    let newData = getDataFromLocalStorage(dataType)
    setDataToLocalStorage(dataType, newData.filter(item => { return item.id != id }))
}