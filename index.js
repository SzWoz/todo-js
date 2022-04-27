
//==================================================misc==================================================

//==============================================adding todos==============================================

let textInput = document.querySelector("#text-input");
const todoList = document.querySelector(".todo-el");
const lastLi = document.querySelector("#footer");
const itemCounter = document.querySelector("#item-counter");
let liElements = document.querySelectorAll(".li-el");

let rmvBtns;

let counter = 0;

itemCounter.innerHTML = "0 Items left";


textInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && textInput.value.length > 0) {
        addTodo(textInput.value);
        textInput.value = "";
        counter++;
        todoCount();
    }
})

function addTodo(input) {
    let todoEl = document.createElement('li');
    todoEl.innerHTML = ` <li class="li-el"><input type="checkbox" class="checkbox">
    <p class="paragraph">${input}</p>
    <span class="close"><img src="todo-app-main/images/icon-cross.svg" alt=""></span>
</li>`
    todoList.insertBefore(todoEl, lastLi);

    rmvBtns = document.querySelectorAll(".close");
    console.log(rmvBtns)

    delBtn();

    pushToStorage(input);
}

//=============================================clearing===================================================

function delBtn() {
    let p = document.querySelectorAll(".paragraph");

    for (let i = 0; i < rmvBtns.length; i++) {
        rmvBtns[i].onclick = () => {
            removeTodos(rmvBtns[i].parentElement.parentElement);
            deleteFromStorage(p[i].innerHTML);

            console.log("jebac to gowno jebane kurwa mac")
        }
    }
}
function removeTodos(item) {
    item.remove();
    todoCount();
}




let compClear = document.querySelector("#clear-completed");

compClear.addEventListener('click', () => {
    let checkboxes = document.querySelectorAll(".checkbox");
    let p = document.querySelectorAll(".paragraph");
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            removeTodos(checkboxes[i].parentElement.parentElement);
            deleteFromStorage(p[i - 1].innerHTML);
        }

    }
})


//================================================counter===================================================



function todoCount() {

    liElements = document.querySelectorAll(".li-el");

    if (liElements.length == 1) {
        itemCounter.innerHTML = liElements.length + " Item left";

    } else {
        itemCounter.innerHTML = liElements.length + " Items left";
    }
}



//================================================filters==========================================================

const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");


function showAll() {
    liElements = document.querySelectorAll(".li-el");
    all.style.color = "hsl(233, 14%, 35%)";
    active.style.color = "hsl(233, 14%, 35%)";
    completed.style.color = "hsl(233, 14%, 35%)";
    liElements.forEach(item => {
        item.parentElement.classList.remove('hidden');
    })
}


all.addEventListener('click', () => {
    showAll();

    all.style.color = "hsl(220, 98%, 61%)";
})


active.addEventListener('click', () => {
    let checkboxes = document.querySelectorAll(".checkbox");

    showAll();
    active.style.color = "hsl(220, 98%, 61%)";
    checkboxes.forEach(item => {
        if (item.checked) {
            item.parentElement.parentElement.classList.add('hidden');
        }
    })
})


completed.addEventListener('click', () => {
    let checkboxes = document.querySelectorAll(".checkbox");

    showAll();
    completed.style.color = "hsl(220, 98%, 61%)";
    checkboxes.forEach(item => {
        if (item.checked == false) {
            item.parentElement.parentElement.classList.add('hidden');
        }
    })
})


//==============================================================local storage==========================================================

let storage = [];

if (localStorage.getItem("Todos") === null) {
    localStorage.setItem("Todos", JSON.stringify(storage));
} else {
    writeTodos();
}

function pushToStorage(text) {
    storage.push(text);
    localStorage.setItem("Todos", JSON.stringify(storage));
}

function writeTodos() {
    let storedItems = JSON.parse(localStorage.getItem("Todos"));
    for (let i = 0; i < storedItems.length; i++) {
        addTodo(storedItems[i]);
        todoCount();
    }
}


function deleteFromStorage(item) {
    let toDel = storage.indexOf(item);

    console.log(toDel)
    if (toDel + 1 >= 0) {
        storage.splice(toDel, 1);
        localStorage.setItem("Todos", JSON.stringify(storage));
    }
}




//======================================================themes=================================================

const time = 500;
let bodyClass = document.body;
let dark = document.querySelector("#dark-icon");
let light = document.querySelector("#light-icon");
light.addEventListener("click", () => {
    if (bodyClass.classList.contains("light") != true) {
        bodyClass.classList.add("light");
        light.style.animation = "light-out 0.5s ease";
        dark.style.animation = "dark-in 0.5s ease";
        dark.style.cursor = "pointer";
        light.style.cursor = "default";

        localStorage.setItem("theme", "light");


        setTimeout(() => {
            light.style.transform = "translateX(2.4em)";
            dark.style.transform = "translateX(100%)";

            light.style.opacity = "0";
            dark.style.opacity = "1";


        }, time);
    }
})
dark.addEventListener("click", () => {
    if (bodyClass.classList.contains("light")) {
        bodyClass.classList.remove("light");
        light.style.animation = "light-in 0.5s ease"
        dark.style.animation = "dark-out 0.5s ease";
        dark.style.cursor = "default";
        light.style.cursor = "pointer";

        localStorage.setItem("theme", "dark");

        setTimeout(() => {
            light.style.transform = null;
            dark.style.transform = null;

            dark.style.opacity = "0";
            light.style.opacity = null;



        }, time);

    }
})
function themeSaver() {
    let theme = localStorage.getItem("theme");
    if (theme == "light") {
        light.click();
    } else {
        dark.click();
    }
}
window.onload = themeSaver();