let listToDo = [{ content: "Learn JS", done: false }];

const input = document.getElementById("add-input");
const listToDoContainer = document.getElementById("to-do");
const clearBtn = document.getElementById("clear-btn");
const doneBtn = document.getElementById("done-btn");
const deleteIcons = document.getElementsByClassName("fa-trash");
const toDoItems = document.getElementsByClassName("to-do-content");
const checkboxes = document.getElementsByClassName("checkbox");
const info = document.getElementById("info");

const renderToDo = (todo, index) => {
	return /*html*/ `
    <div class="to-do-item">
      <div style="display: flex;">
        <input type="checkbox" onClick='handleCheck(this)' id='delete-${index}' class='checkbox'>
        <div class="to-do-content" style="padding-left: 10px;">${todo.content}</div>
      </div>
      <i class="fa-sharp fa-solid fa-trash" onClick='handleDelete(${index})'></i>
    </div>`;
};

const renderList = () => {
	clearList();

	if (!listToDo.length) return;

	listToDo.forEach((todo, index) => {
		listToDoContainer.innerHTML += renderToDo(todo, index);
		if (todo.done) {
			toDoItems.item(index).classList.add("strike-through");
			checkboxes.item(index).setAttribute("checked", "");
			return;
		}
		return;
	});
};

const clearList = (clickClear = false) => {
	if (clickClear) {
		listToDo = [];
	}
	listToDoContainer.innerHTML = "";
};

const handleDelete = (index) => {
	listToDo.splice(index, 1);
	render();
};

const handleCheck = (el) => {
	const index = parseInt(el.id.split("-").at(-1));
	if (el.checked === true) {
		toDoItems.item(index).classList.add("strike-through");
		listToDo[index].done = true;
		render();
		return;
	}
	toDoItems.item(index).classList.remove("strike-through");
	listToDo[index].done = false;
	render();
	return;
};

const renderInfo = () => {
	const done = listToDo.filter((e) => e.done).length;
	const remaining = listToDo.filter((e) => !e.done).length;

	info.innerHTML = /*html*/ `
    <div style='display: flex; justify-content: center'>
      <h5>Total: ${listToDo.length}</h5>
      <h5>Done: ${done}</h5>
      <h5>Remaining: ${remaining}</h5>
    </div>
  `;
};

const render = () => {
	renderList();
	renderInfo();
};

input.addEventListener("keypress", (e) => {
	if (!e.target.value) return;
	if (e.key === "Enter") {
		listToDo.push({
			content: e.target.value,
			done: false,
		});
		input.value = "";
		render();
	}
});

clearBtn.addEventListener("click", () => {
	clearList(true);
});

doneBtn.addEventListener("click", () => {
	listToDo = listToDo.filter((e) => !e.done);
	render();
});

render();
