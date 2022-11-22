/*
    let lectures =[];

const addLecture = (ev)=>{
    ev.preventDefault();
    let lecture ={
        name: document.getElementById('name').value,
        kurs: document.getElementById('kurs').value,
        dozent: document.getElementById('dozent').value
    }
    lectures.push(lecture);
    //document.forms[0].reset();


    console.warn('added',{lectures});

    let pre = document.querySelector('#msg pre');

    localStorage.setItem('LectureList', JSON.stringify(lectures));
}

document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('btn').addEventListener('click', addLecture);
});
*/
var selectedRow = null;

function onFormSubmit(){
    var formData = readFormData();
    if(selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);


    recetForm();
}

function readFormData(){
    var formData = {};
    formData["name"]=document.getElementById("name").value;
    formData["kurs"]=document.getElementById("kurs").value;
    formData["dozent"]=document.getElementById("dozent").value;
    return formData;

}
function insertNewRecord(data){
    var table = document.getElementById("lectureList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.kurs;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.dozent;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = '<button onClick="onEdit(this)"><img src="assets/edit.png"></button><button onClick="onDelete(this)"><img src="assets/delete.png"></button>';

}

function resetFrom(){
    document.getElementById("name").value = "";
    document.getElementById("kurs").value = "";
    document.getElementById("dozent").value = "";
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("kurs").value = selectedRow.cells[1].innerHTML;
    document.getElementById("dozent").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.kurs;
    selectedRow.cells[2].innerHTML = formData.dozent;
}

function onDelete(td){
    if(confirm('Are you sure ?')){

        row = td.parentElement.parentElement;
        document.getElementById("lectureList").deleteRow(row.rowIndex);
        resetFrom();

    }
}







