'use strict';

class Todo  {
    constructor (form, input, todoList, todoCompleted, todoContainer, todoRemove, todoComplete) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector('.todo-container');
        this.todoRemove = document.querySelector('.todo-remove');
        this.todoComplete = document.querySelector('.todo-complete');
        //Коллекция
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = item.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if(todo.completed){
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e)   {
        e.preventDefault();
        if(this.input.value.trim()){
            const newTodo = {
            value: this.input.value,
            completed: false,
            key: this.generateKey(),
        };
        this.todoData.set(newTodo.key, newTodo);
        this.render();
        }
        
    }

    generateKey()   {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(target) {
        this.todoData.forEach((item) => {
            if(target.closest(`.todo-item`).key===item.key){
                this.todoData.delete(item.key);
            }
        });
        this.render();
    }

    completedItem(target) {
        this.todoData.forEach((item)=>{
            if(target.closest(`.todo-item`).key===item.key){
                item.completed = !item.completed;
            }
        });
    this.render();
    }

    handler() {
        //Делегирование
        this.todoContainer.addEventListener('click', (event)=>{
            let target = event.target;
            if(target.classList.contains('todo-remove')){
                this.deleteItem(target);
            } else if(target.classList.contains('todo-complete')){
                this.completedItem(target);
            }
        });
        
    }


    
    init()  {
        this.form.addEventListener('submit', this.addTodo.bind(this))
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-item', '.todo-completed', '.todo-container', '.todo-remove', '.todo-complete');

todo.init();