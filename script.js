"use strict;"

const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');

function toggleModal() {
  modalContainer.classList.toggle('hide');
}

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', toggleModal);

modalContainer.addEventListener('click', toggleModal);
modal.addEventListener('click', (event) => {
  event.stopPropagation();
})



let myLibrary = [];

const testBook1 = new Book("The Hobbit", "Tolkien", 432, "true");
const testBook2 = new Book("Hamlet", "William Shakespeare", 102, "false");
myLibrary.push(testBook1, testBook2);

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary() {
  const title = prompt("Title: ");
  const author = prompt("Author: ");
  const numberOfPages = prompt("Number of Pages: ");
  const read = prompt("Have you read it yet: ");
  myLibrary.push(new Book(title, author, numberOfPages, read));
}

function displayBooks() {
  for (const book of myLibrary) {
    console.log(book);
  }
}