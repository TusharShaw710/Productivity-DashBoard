const elements=document.querySelectorAll('.elem');
const Fullpage=document.querySelectorAll('.fullelem');
const FullpageBackBtn=document.querySelectorAll('.fullelem .back');
const CompleteCheck=document.querySelector('.mark-imp input');
const allTask=document.querySelector('.all-task');
const taskInput=document.querySelector('.input-task form input');
const taskDesc=document.querySelector('.input-task form textarea');
const taskSubmit=document.querySelector('.input-task form');

const TaskLists=[
    {
        input:'Mandir Jao',
        details:'Pooja Karo',
        imp:true
        
    },{
        input:'Gym Jao',
        details:'Body banno',
        imp:true
        
    },{
        input:'Mandir Jao',
        details:'Pooja Karo',
        imp:false
    }
];

function render(){
    let sum='';

    TaskLists.forEach((elem)=>{
        sum+=   `<div class="task">
                    <h3>${elem.input} <span class='${elem.imp}'></span></h3>
                    <button>Mark as Completed</button>
                </div>`;
    });

    allTask.innerHTML=sum;
}

render();
elements.forEach((elem)=>{
    elem.addEventListener('click',(e)=>{
        Fullpage[e.target.id].style.display='block';
    });
})

FullpageBackBtn.forEach((back)=>{
    back.addEventListener('click',(e)=>{
        Fullpage[e.target.id].style.display='none';
    })   
});

taskSubmit.addEventListener('submit',(e)=>{
    e.preventDefault();
    TaskLists.push({input:taskInput.value,details:taskDesc.value,imp:CompleteCheck.checked});
    render();
})








