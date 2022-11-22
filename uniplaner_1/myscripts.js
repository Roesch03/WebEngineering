
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




