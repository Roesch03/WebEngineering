window.addEventListener("load", function (){

    console.log("create Table Semester")

    let data = getDataFromLocalStorage('semester')
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Studiengang</th><th>Datum</th></tr>";


    for(item of data){
        HTML += "<tr><td>"+item.bezeichnung+"</td>"
        HTML += "<td>"+getItemById(getDataFromLocalStorage("dozent"), item.studiengangsleiter).name+"</td>"
        HTML += "<td>"+item.datum+"</td>"
        HTML += "<td scope='col'><img src='assets/edit.png' width='25px'></button><img src='assets/delete.png'width='25px'></button></tr>"
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