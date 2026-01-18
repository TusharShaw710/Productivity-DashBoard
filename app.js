const elements=document.querySelectorAll('.elem');
const Fullpage=document.querySelectorAll('.fullelem');
const FullpageBackBtn=document.querySelectorAll('.fullelem .back');
const CompleteCheck=document.querySelector('.mark-imp input');
const allTask=document.querySelector('.all-task');
const taskInput=document.querySelector('.input-task form input');
const taskDesc=document.querySelector('.input-task form textarea');
const taskSubmit=document.querySelector('.input-task form');

// localStorage.clear();


function TodoList(){
    let TaskLists=[];
    let res=localStorage.getItem('currTask');

    if(res){
        TaskLists=JSON.parse(res);
    }

    function render(){
        let sum='';

        TaskLists.forEach((elem,idx)=>{
            sum+=   `<div class="task">
                        <h3>${elem.input} <span class='${elem.imp}'>imp</span></h3>
                        <button  id=${idx}>Mark as Completed</button>
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
        TaskLists.push({id:TaskLists.length,input:taskInput.value,details:taskDesc.value,imp:CompleteCheck.checked});
        localStorage.setItem('currTask',JSON.stringify(TaskLists));
        render();
        taskInput.value='';
        taskDesc.value='';
        CompleteCheck.checked=false;

    });
    const taskContainer = document.querySelector('.all-task');

    taskContainer.addEventListener('click', (e) => {
        if (!e.target.matches('button')) return;

        let removeId = Number(e.target.id);

        TaskLists = TaskLists.filter(task => task.id !== removeId);

        TaskLists.forEach(task => {
            if (task.id > removeId) {
                task.id--;
            }
        });

        localStorage.setItem('currTask', JSON.stringify(TaskLists));
        render(); // safe now
    });

}

TodoList();

function dailyPlanner(){
    const allPlans=document.querySelector(".all-plans");
    let Routine=JSON.parse(localStorage.getItem('routine')) || {};

    let sum='';
    let hours=Array.from({length:18},(elem,idx)=>`${6+idx}:00 - ${7+idx}:00`);

    hours.forEach((elem,idx)=>{
        sum+=`<div class="time">
                        <p>${elem}</p>
                        <input type="text" placeholder="..." value="${Routine[idx] || ''}">
                    </div>`
    });

    allPlans.innerHTML=sum;

    const Inputs=document.querySelectorAll('.time input');
    console.log(Inputs);

    Inputs.forEach((elem,idx)=>{
        elem.addEventListener('input',()=>{
            Routine[idx]=elem.value;
            localStorage.setItem('routine',JSON.stringify(Routine));
        })
    })
}

dailyPlanner();

function motivationalQuote(){
    const quote=document.querySelector(".item2 h4");
    const author=document.querySelector(".item3 .author");
    const generateQuote=document.querySelector(".item1 .quotes");
    
    async function fetchdata(){
        let data=await fetch("https://motivational-spark-api.vercel.app/api/quotes/random");
        let raw=await data.json();
        quote.innerHTML=raw.quote;
        author.innerHTML=`-${raw.author}`;
    }
    generateQuote.addEventListener('click',()=>{
        fetchdata();
    });
}

motivationalQuote();

function pomodoro(){
    const timer=document.querySelector('.watch');
    const start=document.querySelector('.btn .start-btn');
    const pause=document.querySelector('.btn .pause-btn');
    const reset=document.querySelector('.btn .reset-btn');
    const mode=document.querySelector('.mode p');
    const modeColor=document.querySelector('.mode');

    let totalSeconds=25*60;
    let interval;
    let workSession=true;


    let update=()=>{
        let minutes=Math.floor(totalSeconds/60);
        let seconds=Math.floor(totalSeconds%60);

        timer.innerHTML=`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }

    start.addEventListener('click',()=>{
        clearInterval(interval);
        interval=setInterval(()=>{
            if(totalSeconds>0){
                totalSeconds--;
                update();
            }else{
                clearInterval(interval);
                if(workSession){
                    totalSeconds=5*60;
                    workSession=false;
                    timer.innerHTML='05:00';
                    mode.innerHTML='Take a break';
                    modeColor.style.backgroundColor='var(--blue)';
                }else{
                    totalSeconds=25*60;
                    workSession=true;
                    timer.innerHTML='25:00';
                    mode.innerHTML='Work Session';
                    modeColor.style.backgroundColor='var(--green)';
                }
            }
        },1000);
    });
    pause.addEventListener('click',()=>{
        clearInterval(interval);
    });
    reset.addEventListener('click',()=>{
        clearInterval(interval);
        totalSeconds=25*60;
        update();
    });
}

pomodoro();

const apiKey="de2f3acf37224a8f931125855261501";
let city="kolkata";

function getMonthAndDayString(){
  const dateTab=document.querySelector(".part-1 .date");
  const weekTab=document.querySelector(".part-1 .week");
  const now = new Date();

  const pad = (num) => String(num).padStart(2, '0');

  let month = now.toLocaleString('en-IN', { month: 'long' });
  let day = now.toLocaleString('en-IN', { weekday: 'long' });
  let date = now.getDate();
  let fullyear=now.getFullYear();

  let hours = pad(now.getHours());
  let minutes = pad(now.getMinutes());
  let seconds = pad(now.getSeconds());

  dateTab.innerHTML=`${date} ${month},${fullyear}`;
  weekTab.innerHTML=`${day},${hours}:${minutes}:${seconds}`;
}

setInterval(()=>{
    getMonthAndDayString();
},1000);

async function weatherApi(){
    const tempTab=document.querySelector(".temp");
    const prepTab=document.querySelector(".prep");
    const condnTab=document.querySelector(".condn");
    const windTab=document.querySelector(".wind");
    const humTab=document.querySelector(".hum");

    let rawdata=await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    let data=await rawdata.json();

    let temp=data.current.temp_c;
    let prep=data.current.precip_in;
    let condn=data.current.condition.text;
    let wind=data.current.wind_kph;
    let hum=data.current.humidity;

    tempTab.innerHTML=`${temp}°C`;
    prepTab.innerHTML=`Precipitation:${prep}%`;
    condnTab.innerHTML=`${condn}`;
    windTab.innerHTML=`Wind:${wind}km/hr`;
    humTab.innerHTML=`Humidity:${hum}%`;  
    
}

weatherApi();

let theme=document.querySelector('.theme');
let root=document.documentElement;

let flag=0;

theme.addEventListener('click',()=>{
    // --pri:#364F6B;
    // --sec:#3FC1C9;
    // --tri1:#F5F5F5;
    // --tri2:#FC5185;
    if(flag == 0){
        root.style.setProperty('--pri','#AD8B73');
        root.style.setProperty('--sec','#CEAB93');
        root.style.setProperty('--tri1','#E3CAA5');
        root.style.setProperty('--tri2','#FFFBE9');
        flag=1;
    }else if(flag ==1){
        root.style.setProperty('--pri','#3F9AAE');
        root.style.setProperty('--sec','#79C9C5');
        root.style.setProperty('--tri1','#FFE2AF');
        root.style.setProperty('--tri2','#F96E5B');
        flag=2;
    }else if(flag ==2){
        
        root.style.setProperty('--pri','#364F6B');
        root.style.setProperty('--sec','#3FC1C9');
        root.style.setProperty('--tri1','#F5F5F5');
        root.style.setProperty('--tri2','#FC5185');
        flag=0;

    }
    
})











