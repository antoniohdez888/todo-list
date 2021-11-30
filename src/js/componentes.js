// Referencias en HTML

import { todoList } from "..";
import { Todo } from "../classes";


const divTodoList = document.querySelector('.todo-list');
const inputNewTodo = document.querySelector('.new-todo');
const borrarTodos = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {
    const htmlTodo = `
        <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked': ''} >
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// eventos

inputNewTodo.addEventListener('keyup', (event) => {
    // console.log(event);
    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        // console.log(inputNewTodo.value);

        const nuevoTodo = new Todo(inputNewTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        inputNewTodo.value = '';

        // console.log(todoList);
    }
});

divTodoList.addEventListener('click', (event) => {
    // console.log('click');

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoID = todoElemento.getAttribute('data-id');

    // click en check
    if (nombreElemento.includes('input')) {

        todoList.checkTodo(todoID);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {

        todoList.eliminarTodo(todoID);
        divTodoList.removeChild(todoElemento);
    }

    console.log(todoList);
});

borrarTodos.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        // console.log(elemento);

        if (elemento.classList.contains('completed')) {

            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) {
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;


        }
    }


});