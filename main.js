//constante

const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".filter-todo");

//écouteurs d'évenements 
document.addEventListener("DOMContentLoaded",getTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input",filterTodo);

//fonction pour ajouter un todo
function addTodo(event){

    event.preventDefault();

    //création d'une div et d'une li pour une tâche
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //sauvegarde des tâches dans le local storage 
    saveLocalTodo(todoInput.value);

    //création bouton check
    const completedButton=document.createElement("button");
    completedButton.innerHTML="<i class='fas fa-check'></i>";
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);

    
    //création bouton suppression
    const trashButton=document.createElement("button");
    trashButton.innerHTML="<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);


    todoList.appendChild(todoDiv);

    todoInput.value="";

}

//fonction pour supprimer un todo

function deleteCheck(e){
    const item= e.target;

    if(item.classList[0]==="trash-button"){
       const todo= item.parentElement;
       todo.classList.add("fall");

       todo.addEventListener("transitionend", function(){
           todo.remove();
          
       }) 
       removeLocalTodo(todo);
    }
    
    if(item.classList[0]==="completed-button"){
        item.parentElement.classList.toggle("check");
    }
}

//fonction pour filtrer les todos

function filterTodo(e){
    const todos= todoList.childNodes;

    todos.forEach(function(todo){

        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains("check")){
                      todo.style.display="flex";
                }else{
                      todo.style.display="none";
                }          
                break;

            case "uncompleted":
                if(!todo.classList.contains("check")){
                    todo.style.display="flex";
              }else{
                    todo.style.display="none";
              }          
              break;
        }
    })

}

// fonction pour sauvegarder chaque todo dans le localstorage
function saveLocalTodo(todo){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos=[]
    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }

        todos.push(todo);
        localStorage.setItem("todos",JSON.stringify(todos));
       

}

//fonction executé au chargement de la page afin de récupérer et afficher les todos du localstorage
function getTodo(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos=[]
    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){

        const todoDiv= document.createElement("div");
        todoDiv.classList.add("todo");
    
        const newTodo=document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
    
        const completedButton=document.createElement("button");
        completedButton.innerHTML="<i class='fas fa-check'></i>";
        completedButton.classList.add("completed-button");
        todoDiv.appendChild(completedButton);
    
        
        const trashButton=document.createElement("button");
        trashButton.innerHTML="<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-button");
        todoDiv.appendChild(trashButton);
    
    
        todoList.appendChild(todoDiv);
    })

}

//fonctions permettant de supprimer les todos du localstorage 

function removeLocalTodo(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos=[]
    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
    const todoText=todo.children[0].innerText;

    todos.splice( todos.indexOf(todoText),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}


