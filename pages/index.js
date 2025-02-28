import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todosList = document.querySelector(".todos__list");

// const openModal = (modal) => {
//   modal.classList.add("popup_visible");
// };

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();

  return todoElement;
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handFormSubmit: () => {},
});

const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todoElement = generateTodo(values);

  section.addItem(todoElement);

  newTodoValidator.resetValidation();
  addTodoForm.reset();

  closeModal(addTodoPopupEl);
});

// initialTodos.forEach((item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo); //Use addItem method instead
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
