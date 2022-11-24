var id = 0;


function onFormSubmit() {
    dataHandler(type); //Wie bekomme ich den type?

}

function dataHandler(type){
    let data = getDataFromLocalStorage(type);
    data.NewField = getDataFromInput();
    setDataToLocalStorage(data);

}


function getDataFromInput(){
    return {
        id: id,
        data: document.getElementById("data").value,
        infos: document.getElementById("infos").value
        //name: document.getElementById("name").value,
        //kurs: document.getElementById("kurs").value,
        //dozent: document.getElementById("dozent").value
    }
}

function getDataFromLocalStorage(type){
    return localStorage.getItem('type') ? JSON.parse(localStorage.getItem('type')) : [];
}

function setDataToLocalStorage(item){
    localStorage.setItem(id, JSON.stringify(item));
    incId();
}

function incId(){
    id++;
}
