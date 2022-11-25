
function onFormSubmit(type) {
    dataHandler(type);

}

function dataHandler(type){
    let data = getDataFromLocalStorage(type);
    data[data.length] = getDataFromInput();
    setDataToLocalStorage(type, data);

}


function getDataFromInput(){
    return {
        id: getNewId(),
        data: document.getElementById("data").value,
        infos: document.getElementById("infos").value
        //name: document.getElementById("name").value,
        //kurs: document.getElementById("kurs").value,
        //dozent: document.getElementById("dozent").value
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
