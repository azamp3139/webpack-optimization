import styles from '../styles/notification.module.css';
import checkMarkImage from '../../images/checkmark.svg';
import { getMotivationalPictures } from './api';
export function renderTodos(todos) {
  const renderedItemArray = todos.map(function (todo) {
    const className = todo.completed ? 'completed' : ''
    const completionClass = todo.completed ? 'checked' : ''
    return `
          <li data-id="${todo.id}" class="${className}">
              <span class="custom-checkbox">
                  <img class="check" src="${checkMarkImage}" width="22" height="22"></img>
                  <input class="real-checkbox" type="checkbox" ${completionClass} />
              </span>
              <label>${todo.text}</label>
              <span class="delete"></span>
          </li>
      `
  })
  document.querySelector('.todo-list').innerHTML = renderedItemArray.join('')

  renderPictures();
}

export function clearNewTodoInput() {
  document.querySelector('.new-todo').value = '';
  showNotification();
}

export function getTodoId(element) {
  return parseInt(
    element.dataset.id
    || element.parentNode.dataset.id
    || element.parentNode.parentNode.dataset.id
    , 10)
}

function showNotification() {
  const notification = `<div class="${styles.notification}">Todo item added</div>`;
  document.body.innerHTML += notification;
  setTimeout(function () {
    const elem = document.querySelector(`.${styles.notification}`);
    elem.parentNode.removeChild(elem);

  }, 2000)
}

function renderPictures() {
  console.log('render motiv pics')
  getMotivationalPictures().then(res => {
    console.log('res',res)
    const imageContent = `
    <div class="motivational-pictures">
    ${res.map(picture => {
      return '<img class="header-image" src="' + picture + '" alt="motivational picture" />';
    }).join('')}
    `;
    const container = document.querySelector('.motivational-pictures-container');
    container.innerHTML = imageContent;
  })
  .catch(err=>{
    console.log("error",err)
  })
}