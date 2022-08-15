
const form = document.getElementsByClassName('addTaskForm')[0];

const focusDiv = document.getElementsByClassName('focusDiv')[0];
const addTaskBtn = document.getElementById('addTaskBtn');
const tasks = document.getElementById('tasks');

let hideBtn = document.getElementsByClassName('hideMenu')[0];
let menu = document.getElementsByClassName('menu')[0];

const hideCompleteBtn = menu.children[0];
const deleteCompleteBtn = menu.children[1];
const showAllBtn = menu.children[2];

const taskBoilerplate = document.getElementsByClassName('taskBoilerplate')[0];


let TaskData = JSON.parse(localStorage.tasks) || [];

console.log(TaskData);

if(TaskData.length != 0) showTasks(TaskData);




function updateLocal(tasks){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function showMenu(){
    menu.style.top = '-10px';
    hideBtn.style.display = 'block';
}

function hideMenu(){
    menu.style.top = '-140px';
    hideBtn.style.display = 'none'
}

function clearTasksDiv(){
    while(tasks.firstChild)tasks.removeChild(tasks.firstChild);
}
function showTasks(taskArr){
    clearTasksDiv();
    taskArr.map(task => {
        const taskDiv = taskBoilerplate.cloneNode(true);
        const title = taskDiv.children[0];
        const description = taskDiv.children[1];
        const complete = taskDiv.children[2].children[0];
        const id = taskDiv.children[3];

        id.innerHTML = task.Id;
        title.innerHTML = task.Task;
        description.innerHTML= task.Description;
        complete.checked = task.complete;

        taskDiv.style.display = 'flex';
        
        tasks.append(taskDiv);      
        return;
    });
}

const deleteTask = (e) => {
    let target = e.target;
    let taskId = target.previousElementSibling;

    let index = TaskData.findIndex(task => task.Id == taskId.innerHTML);
    TaskData.splice(index,1);

    updateLocal(TaskData);
    showTasks(TaskData);
}

const randomNum = () => Math.floor(Math.random()*10000)

addTaskBtn.addEventListener('click', (e) => {
    form.style.display = 'flex';
    focusDiv.style.display = 'block';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskTitle = form.title.value;
    const taskDesc = form.description.value;
    
    if(!taskTitle || !taskDesc){
        return alert('Text fields are empty')
    };

    TaskData.push({
        'Id':randomNum(),
        'Task': taskTitle,
        'Description':taskDesc,
        'complete':false,
    });

    form.style.display = 'none';
    focusDiv.style.display = 'none';

    showTasks(TaskData);
    updateLocal(TaskData);
});

const toggleComplete = (e) => {
    let checkbox = e.target;
    let task = checkbox.parentElement;
    let taskId = task.nextElementSibling.innerHTML;
    let checked = checkbox.checked;

    const index = TaskData.findIndex(task => task.Id == taskId);

    checked ?
        TaskData[index].complete = true
        : TaskData[index].complete = false;

    updateLocal(TaskData);
}

hideCompleteBtn.onclick = function(e){
    let dataCopy = TaskData.slice();
    dataCopy = dataCopy.filter(task => !task.complete);
    showTasks(dataCopy);
}

deleteCompleteBtn.onclick = function(e){
    TaskData = TaskData.filter(task => !task.complete)
    showTasks(TaskData)
    updateLocal(TaskData);
}
showAllBtn.onclick = function(e){
    showTasks(TaskData);
}


