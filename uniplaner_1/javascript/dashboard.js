window.addEventListener("load", function (){
    document.getElementById("dashboardDozent").addEventListener('input', ()=> {loadDashboard()});


    console.log("test")
    setSelectDashboardDozent()

});

function setSelectDashboardDozent(){
    let data = getDataFromLocalStorage('dozent')
    console.log(data)
    var HTML = ""
    for(item of data){
        console.log(item.name)
        HTML += "<option value=" + item.id + ">" + item.name + "</option>";
    }
    document.getElementById("dashboardDozent").innerHTML = HTML;
}

function loadDashboard(){
    //select Dozent
    let studiengangDozent = document.getElementById("studiengangDozent")
    console.log("loadDashboard")
    let data = getDataFromLocalStorage("dozent")
    console.log(data)
    let editElement = ""
    for(item of data){
        if(item.id == document.getElementById("dashboardDozent").value){
            console.log(item.name)
            editElement = item
            console.log(editElement)
        }
    }

    //print first data
    console.log(editElement.name)
    let text = "Youtube: https://youtube.de/" + editElement.name
    document.getElementById("website").innerText ="Website: wwww." + editElement.name + ".de"
    document.getElementById("github").innerText = "GitHub: www.github/" + editElement.github + ".de"
    document.getElementById("youtube").innerText ="YouTube: www.youtube/" + editElement.name + ".de"

    //print Studiengänge
    let studiengangData = getDataFromLocalStorage("studiengang")
    let studiengangText = ""
    var counter = 0
    for(item of studiengangData){
        console.log(item)
        if(editElement.id == item.studiengangsleiter){
            console.log("found item: ")
            studiengangText += "<tr><th scope='row'>" + counter + "</th><td>" + item.bezeichnung + "</td><td>...</td></tr>"
            counter++
        }
    }
    studiengangDozent.innerHTML = studiengangText

    //print Vorlesungen
    
}