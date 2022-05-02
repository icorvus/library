"use strict";

const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalReadBtn = document.getElementById('modal-read');

function toggleModal() {
  modalContainer.classList.toggle('hide');
}

function toggleReadClass(event) {
  event.target.classList.toggle('read');
}


addBtn.addEventListener('click', toggleModal);
modalContainer.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modal.addEventListener('click', (event) => {
  event.stopPropagation();
})
modalReadBtn.addEventListener('click', toggleReadClass);



let myLibrary = [];

const testBook1 = new Book("The Hobbit", "Tolkien", 432, "true");
const testBook2 = new Book("Hamlet", "William Shakespeare", 102, "false");
const testBook3 = new Book("The Little Prince", "Antoine de Saint-Exupery", 154, "true");


function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

Book.prototype.addToDOM = function(bookIndex) {
  const cardContainer = document.querySelector('.card-container');

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = bookIndex;

  const title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = this.title;

  const author = document.createElement('div');
  author.classList.add('author');
  author.textContent = `by ${this.author}`;

  const pages = document.createElement('div');
  pages.classList.add('pages');
  pages.textContent = `${this.numberOfPages} pages`;

  const controls = document.createElement('div');
  controls.classList.add('controls');

  const readBtn = document.createElement('button');
  readBtn.classList.add('btn', 'read-btn');
  readBtn.textContent = 'Read';
  if (this.read) readBtn.classList.add('read');
  readBtn.addEventListener('click', toggleReadClass);
  readBtn.addEventListener('click', () => {
    this.read = !this.read;
  })

  const svgSpan = document.createElement('span');
  svgSpan.innerHTML = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\"\><path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>"
  svgSpan.addEventListener('click', () => {
    myLibrary.splice(bookIndex, 1);
    reloadLibrary();
  });

  controls.appendChild(readBtn);
  controls.appendChild(svgSpan);

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(controls);

  cardContainer.appendChild(card);
};

function addBookToLibrary() {
  const title = prompt("Title: ");
  const author = prompt("Author: ");
  const numberOfPages = prompt("Number of Pages: ");
  const read = prompt("Have you read it yet: ");
  myLibrary.push(new Book(title, author, numberOfPages, read));
}

function removeBook(event) {
  console.log(event.target);
  myLibrary.splice(event.target.getAttribute('data-index'), 1);
  reloadLibrary();
}

myLibrary.push(testBook1, testBook2, testBook3);
displayBooks();

function displayBooks() {
  myLibrary.forEach((book, index) => book.addToDOM(index));
}

function reloadLibrary () {
  document.querySelector('.card-container').textContent = "";
  displayBooks();
}