'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    btnControl = document.querySelector('.header-button');


  //Local storage
  let todoData = localStorage.getItem('toDo');
  todoData = JSON.parse(todoData);
  if(todoData === null) {
    todoData = [];
  }

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' +
        '</div>';
        if(item.completed){
            todoCompleted.append(li);
        } else  {
            todoList.append(li);
        }
        
        //Смена статуса дела
        
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem('toDo', JSON.stringify(todoData));
            render();
        });

        //Удаление элементов

        const deleteItem = li.querySelector('.todo-remove');
            deleteItem.addEventListener('click', function(){
                todoData.splice(todoData.indexOf(item), 1);
                localStorage.setItem('toDo', JSON.stringify(todoData));
            render();
        });      
    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    //Проверка на строку и очистка input
    if(headerInput.value === ''){

    } else{
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        headerInput.value = '';
        todoData.push(newTodo);
        localStorage.setItem('toDo', JSON.stringify(todoData));
        render();
    } 
});



render();