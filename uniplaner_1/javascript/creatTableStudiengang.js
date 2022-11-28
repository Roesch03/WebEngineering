window.addEventListener("load", function (){

    console.log("create Table Studiengang")

    let type = 'studiengang'

    let data = getDataFromLocalStorage(type)
    console.log(data)

    var HTML = "<table border=1 width=100%><tr><th>Bezeichnung</th><th>Studiengangsleiter</th></tr>";


    for(item of data){
        let element = item.id
        HTML += "<tr id='"+ item.id +"'><td>"+item.bezeichnung+"</td>"
        HTML += "<td>"+getItemById(getDataFromLocalStorage("dozent"), item.studiengangsleiter).name+"</td>"
        HTML += `<td scope="col"><img src="assets/edit.png" width="25px"><img src="assets/delete.png"width="25px" onclick="onDeletData('${type}', ${item.id})"></tr>`
    }

    HTML += "</table>";


    console.log(data.length)
    if(data.length==0){
        HTML = "<h2>Noch keine Einträge</h2>"
    }

    document.getElementById("tableStudiengang").innerHTML = HTML;
    setSelcetionDozent()
});

function setSelcetionDozent(){
    let data = getDataFromLocalStorage('dozent')
    console.log(data)
    var HTML = ""
    for(item of data){
        console.log(item.name)
        HTML += "<option value=" + item.id + ">" + item.name + "</option>";
    }
    document.getElementById("selcetDozent").innerHTML = HTML;
}