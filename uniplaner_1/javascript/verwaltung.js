
function onFormSubmit(type) {
    dataHandler(type);
}

function dataHandler(type){
    let data = getDataFromLocalStorage(type);
    data[data.length] = typeHandler(type);
    setDataToLocalStorage(type, data);
}

function typeHandler(type){
    if (type==='dozent') {
        return getDataDozent();
    }if (type==='semester') {
        return getDataSemester();
    }if (type==='vorlesung'){
        return getDataVorlesung();
    }if (type==='vorlesungstermin'){
        return getDataVorlesungstermin();
    }if (type==='studiengang'){
        return getDataStudiengang();
    }else{
        null
    }
}

function getDataDozent(){
    console.log("getDataDozent");
    let data = {
        id: getNewId(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        alter: document.getElementById("alter").value,
        github: document.getElementById("github").value
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("alter").value = "";
    document.getElementById("github").value = "";

    return data;

}

function getDataStudiengang(){
    console.log("getDataStudiengang")
    let data = {
        id: getNewId(),
        bezeichnung: document.getElementById("bezeichnung").value,
        studiengangsleiter: document.getElementById("studiengangsleiter").value
    }

    document.getElementById("bezeichnung").value = "";
    document.getElementById("studiengangsleiter").value = "";

    return data;
}

function getDataSemester(){
    let data = {
        id: getNewId(),
        bezeichnung: document.getElementById("bezeichnung").value,
        studiengang: document.getElementById("studiengang").value,
        datum: document.getElementById("datum").value
    }

    document.getElementById("bezeichnung").value = "";
    document.getElementById("studiengang").value = "";
    document.getElementById("datum").value = "";

    return data;
}

function getDataVorlesung(){
    let data = {
        id: getNewId(),
        bezeichnung: document.getElementById("bezeichnung").value,
        modul: document.getElementById("modul").value,
        studiengang: document.getElementById("studiengang").value
    }

    document.getElementById("bezeichnung").value = "";
    document.getElementById("modul").value = "";
    document.getElementById("studiengang").value = "";

    return data;
}

function getDataVorlesungstermin(){
    let data = {
        id: getNewId(),
        vorlesung: document.getElementById("vorlesung").value,
        datum: document.getElementById("datum").value,
        start: document.getElementById("start").value,
        ende: document.getElementById("ende").value
    }

    document.getElementById("vorlesung").value = "";
    document.getElementById("datum").value = "";
    document.getElementById("start").value = "";
    document.getElementById("ende").value = "";

    return data;
}

function getDataFromLocalStorage(type){
    let item = localStorage.getItem(type)
    return item ? JSON.parse(item) : [];
}

function setDataToLocalStorage(type, data){
    localStorage.setItem(type, JSON.stringify(data));
}


function getNewId(){
    let id = getDataFromLocalStorage("id");
    id++;
    setDataToLocalStorage("id", id);
    return id;
}

function update(type, id){ //Press edit button
    // daten holen und ändern und dann neu rein
    let data = getItemById(getDataFromLocalStorage(type), id);//Daten mit dem type aus local storage holen und Elemente mit ID herausfiltern
    
}

function setDropDownData(type){
    let item = getDataFromLocalStorage(type); //console.log vom item ausgebn und mit console debuggen
    let option;
    item.array.forEach(element => {
        option += '<option value="' + element.dozent + '" />'; //Dozent muss noch durch eine variabel ausgetauscht werden
    });
    document.getElementById('dlDozent').innerHTML = option;
}

function getItemById(dataArray, id){
    return JSON.parse(dataArray.filter(item => {return item.id == id})[0]); //gibt uns die Daten mit der id
  }

function creatTable(type){
    
}
