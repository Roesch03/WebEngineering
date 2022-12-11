window.addEventListener("load", function () {
    document.getElementById("dashboardDozent").addEventListener('input', () => { loadDashboard() });


    console.log("test")
    setSelectDashboardDozent()
    printDozenten()

});

function setSelectDashboardDozent() {
    let data = getDataFromLocalStorage('dozent')
    console.log(data)
    var HTML = "<option value=>Dozent auswählen</option>"
    for (item of data) {
        console.log(item.name)
        HTML += "<option value=" + item.id + ">" + item.name + "</option>";
    }
    document.getElementById("dashboardDozent").innerHTML = HTML;
}

function loadDashboard() {
    //select Dozent
    let studiengangDozent = document.getElementById("studiengangDozent")
    console.log("loadDashboard")
    let data = getDataFromLocalStorage("dozent")
    console.log(data)
    let editElement = ""
    for (item of data) {
        if (item.id == document.getElementById("dashboardDozent").value) {
            console.log(item.name)
            editElement = item
            console.log(editElement)
        }
    }

    //print first data
    console.log(editElement.name)
    let text = "Youtube: https://youtube.de/" + editElement.name
    document.getElementById("website").innerText = "Website: wwww." + editElement.name + ".de"
    document.getElementById("github").innerText = "GitHub: www.github/" + editElement.github + ".de"
    document.getElementById("youtube").innerText = "YouTube: www.youtube/" + editElement.name + ".de"

    //print Studiengänge
    let studiengangData = getDataFromLocalStorage("studiengang")
    let studiengangText = ""
    var counter = 1
    for (item of studiengangData) {
        console.log(item)
        if (editElement.id == item.studiengangsleiter) {
            console.log("found item: ")
            studiengangText += "<tr><th scope='row'>" + counter + "</th><td>" + item.bezeichnung
            counter++
        }
    }
    studiengangDozent.innerHTML = studiengangText

    //print Vorlesungen
    let vorlesungData = getDataFromLocalStorage("vorlesung")
    let vorlesungText = ""
    var counter = 1
    for (item of vorlesungData) {
        console.log(item)
        if (editElement.id == item.dozent) {
            console.log("found item: ")
            vorlesungText += "<tr><th scope='row'>" + counter + "</th><td>" + item.bezeichnung + "</td><td>" + item.modul + "</td><td>" + item.dauer + "</td><td>" + getItemById(getDataFromLocalStorage("studiengang"), item.studiengang).bezeichnung + "</td></tr>"
            counter++
        }
    }
    vorlesungDozent.innerHTML = vorlesungText
}

//print Dozenten
function printDozenten() {
    let data = getDataFromLocalStorage('dozent')
    HTML = ""
    for (item of data) {
        HTML += "<li class='list-group-item'>" + item.name + "</li>";
    }

    document.getElementById("dozenten").innerHTML = HTML;
}