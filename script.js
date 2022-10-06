"use strict";

const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('add-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalReadBtn = document.getElementById('modal-read');
const saveBtn = document.getElementById('save-btn');

addBtn.addEventListener('click', toggleModal);
modalContainer.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
modal.addEventListener('click', (event) => {
  event.stopPropagation();
});
modalReadBtn.addEventListener('click', toggleReadClass);
saveBtn.addEventListener('click', addBookToLibrary);

function toggleModal() {
  modalContainer.classList.toggle('hide');
}

function toggleReadClass(event) {
  event.target.classList.toggle('read');
}

class Book {
  constructor(title, author, numberOfPages, read) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
  }
  addToDOM(bookIndex) {
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
    });
  
    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = "<svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\"\><path fill=\"currentColor\" d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>";
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
  }
}

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const numberOfPages = document.getElementById('pages').value;
  const readBtn = document.getElementById('modal-read');
  let readStatus = false;
  if (readBtn.classList.contains('read')) readStatus = true;
  toggleModal();
  document.getElementById("modal-form").reset();
  myLibrary.push(new Book(title, author, numberOfPages, readStatus));
  reloadLibrary();
}

function displayBooks() {
  myLibrary.forEach((book, index) => book.addToDOM(index));
}

function reloadLibrary () {
  document.querySelector('.card-container').textContent = "";
  displayBooks();
}

let myLibrary = [];

const testBook1 = new Book("The Hobbit", "Tolkien", 432, "true");
const testBook2 = new Book("Hamlet", "William Shakespeare", 102, "false");
const testBook3 = new Book("The Little Prince", "Antoine de Saint-Exupery", 154, "true");

myLibrary.push(testBook1, testBook2, testBook3);
displayBooks();