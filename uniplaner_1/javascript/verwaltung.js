function onFormSubmit(type) {
    dataHandler(type);
}

function dataHandler(type) {
    let data = getDataFromLocalStorage(type);
    data[data.length] = typeHandler(type);
    setDataToLocalStorage(type, data);
    window.location.reload();
}

function typeHandler(type) {
    if (type === 'dozent') {
        return getDataDozent();
    } if (type === 'semester') {
        return getDataSemester();
    } if (type === 'vorlesung') {
        return getDataVorlesung();
    } if (type === 'vorlesungstermin') {
        return getDataVorlesungstermin();
    } if (type === 'studiengang') {
        return getDataStudiengang();
    } else {
        null
    }
}

function getDataDozent() {
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

function getDataStudiengang() {
    console.log("getDataStudiengang")
    let data = {
        id: getNewId(),
        bezeichnung: document.getElementById("bezeichnung").value,
        studiengangsleiter: document.getElementById("selcetDozent").value
    }

    document.getElementById("bezeichnung").value = "";
    return data;
}

function getDataSemester() {
    let data = {
        id: getNewId(),
        bezeichnung: document.getElementById("bezeichnung").value,
        studiengang: document.getElementById("selectStudiengang2").value,
        datum: document.getElementById("datum").value
    }

    document.getElementById("bezeichnung").value = "";
    document.getElementById("datum").value = "";

    return data;
}

function getDataVorlesung() {
    let data = {
        id: getNewId(),
        bezeichnung: document.getElementById("bezeichnung").value,
        modul: document.getElementById("modul").value,
        dauer: document.getElementById("dauer").value,
        studiengang: document.getElementById("selectStudiengang").value,
        dozent: document.getElementById("selcetDozent").value
    }

    document.getElementById("bezeichnung").value = "";
    document.getElementById("modul").value = "";
    document.getElementById("dauer").value = "";

    return data;
}

function getDataVorlesungstermin() {
    let data = {
        id: getNewId(),
        vorlesung: document.getElementById("selectVorlesung").value,
        datum: document.getElementById("datum").value,
        start: document.getElementById("start").value,
        ende: document.getElementById("ende").value
    }

    document.getElementById("datum").value = "";
    document.getElementById("start").value = "";
    document.getElementById("ende").value = "";

    return data;
}

function getDataFromLocalStorage(type) {
    let item = localStorage.getItem(type)
    return item ? JSON.parse(item) : [];
}

function setDataToLocalStorage(type, data) {
    localStorage.setItem(type, JSON.stringify(data));
}


function getNewId() {
    let id = getDataFromLocalStorage("id");
    id++;
    setDataToLocalStorage("id", id);
    return id;
}

function setDropDownData(type) {
    let item = getDataFromLocalStorage(type);
    let option;
    item.array.forEach(element => {
        option += '<option value="' + element.dozent + '" />';
    });
    document.getElementById('dlDozent').innerHTML = option;
}

function getItemById(dataArray, id) {
    for (item of dataArray) {
        if (item.id == id) {
            return item
        }
    } return { name: "error" }
}

function onEdit(type, id) {
    let data = getItemById(getDataFromLocalStorage(type), id)

}

function onDeletData(dataType, id) {
    if (confirm('M??chtest du das Element l??schen?')) {
        console.log("delete: " + dataType + id);
        let data = getDataFromLocalStorage(dataType)
        setDataToLocalStorage(dataType, data.filter(item => { return item.id != id }))
        location.reload()
    }
}

function styleTable(element) {
    element.style.padding = "10px"
    element.style.borderRadius = "20px";
    element.style.boxShadow = "0 8px 24px -2px lightgrey";
    element.style.border = "none";
}

