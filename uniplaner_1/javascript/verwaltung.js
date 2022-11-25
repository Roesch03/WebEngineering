
function onFormSubmit(type) {
    dataHandler(type);

}

function dataHandler(type){
    let data = typeHandler(type);
    data[data.length] = getDataFromInput();
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
    }else{
        null
    }
}

function getDataDozent(){
    return {
        id: getNewId(),
        data: document.getElementById("name").value,
        infos: document.getElementById("infos").value
    }
}

function getDataSemester(){
    return {
        id: getNewId(),
        data: document.getElementById("name").value,
        infos: document.getElementById("infos").value
    }
}

function getDataVorlesung(){
    return {
        id: getNewId(),
        data: document.getElementById("name").value,
        infos: document.getElementById("infos").value
    }
}

function getDataVorlesungstermin(){
    return {
        id: getNewId(),
        data: document.getElementById("name").value,
        infos: document.getElementById("infos").value
    }
}

function getDataFromLocalStorage(type){
    let item = localStorage.getItem(type)
    return item ? JSON.parse(item) : [];
}

function setDataToLocalStorage(type, data){
    localStorage.setItem(type, JSON.stringify(data));
}


function getNewId(){
    let id = getDataFromInput("id");
    id++;
    setDataToLocalStorage("id", id);
    return id;
}

function update(type, id){ //Press edit button
 // daten holen und ändern und dann neu rein
    let item = getDataFromLocalStorage(type);//Daten mit dem type aus local storage holen

}

function creatTable(type){

}
