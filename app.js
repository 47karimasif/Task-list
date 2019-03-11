const form=document.querySelector("form")            //all these global values declared outside the function can be acessed by all functions
const tasklist=document.querySelector(".collection")
const input=document.querySelector("#task")
const cleartask=document.querySelector(".clear-tasks")
const filter=document.querySelector("#filter")
// localStorage.setItem("task","going to market")
loadEventListener()

function loadEventListener()
{
  document.addEventListener("DOMContentLoaded",loadtask)
  form.addEventListener("submit",addtask)
  tasklist.addEventListener("click",removetask)
  cleartask.addEventListener("click",clear)
  filter.addEventListener("keyup",filtertask)

}

function addtask(e){
  const inputvalue=input.value
  const li=document.createElement("li")
  li.className="collection-item"
  li.appendChild(document.createTextNode(inputvalue))
  const link=document.createElement("a")
  link.className="delete-item secondary-content"
  link.innerHTML='<i class="fa fa-remove"></i>'
  li.appendChild(link)
  tasklist.appendChild(li)
  storetaskinlocalstorage(inputvalue)
  e.preventDefault()

}

function removetask(e){
  if(e.target.parentNode.classList.contains("delete-item"))
  {
    confirm("delete this task?")
    e.target.parentNode.parentNode.remove()
    removetaskfromlocalstorage(e.target.parentNode.parentNode)
  }

}

function removetaskfromlocalstorage(taskitem){

  let tasks;
  if(localStorage.getItem("tasks") === null)
  {
    tasks=[];
  }
  else
    {
      tasks=JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task,index){
if(taskitem.textContent===task)
{
  tasks.splice(index,1)
}


  })
  localStorage.setItem("tasks",JSON.stringify(tasks))
}

function clear(e){
  tasklist.textContent=``
}

function filtertask(e){
  const text=(e.target.value).toLowerCase()
  const lis=document.querySelectorAll(".collection-item")
  lis.forEach(function(li){
    task=li.textContent.toLowerCase()
    if(task.indexOf(text)!=-1)
    {
      li.style.display="block"
    }
    else {
      {
        li.style.display="none"
      }
    }
  })
  console.log(text)
}

function storetaskinlocalstorage(task)
{
  let tasks;
  if(localStorage.getItem("tasks") === null)
  {
    tasks=[];
  }
  else
    {
      tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task)
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }

function loadtask(){
  let tasks;
  if(localStorage.getItem("tasks") === null)
  {
    tasks=[];
  }
  else
    {
      tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
      const li=document.createElement("li")
      li.className="collection-item"
      li.appendChild(document.createTextNode(task))
      const link=document.createElement("a")
      link.className="delete-item secondary-content"
      link.innerHTML='<i class="fa fa-remove"></i>'
      li.appendChild(link)
      tasklist.appendChild(li)
    })
}
