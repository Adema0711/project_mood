const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const shoppingList = document.getElementById("shoppingList");
const message = document.getElementById("message");
const itemCount = document.getElementById("itemCount");

let count = 0;

function updateCount() {
    itemCount.textContent = count;
}

function addItem() {
    const itemText = itemInput.value.trim();


