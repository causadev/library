const addBook = document.querySelector(".addBook");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");
const inputTitle = document.querySelector(".title");
const inputAuthor = document.querySelector(".author");
const inputPages = document.querySelector(".pages");
const addBookButton = document.querySelector(".addBookButton");
const removeBook = document.querySelector(".removeBook");
const readBook = document.querySelector(".readBook");
const bookCard = document.querySelector(".bookCard");
const submitForm = document.querySelector(".submitForm");
addBook.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
addBookButton.addEventListener("click", addBookToLibrary);

readBook.addEventListener("click", (e) => {
  if (e.target.textContent === "Not read") {
    e.target.textContent = "Read";
    readBook.classList.add("readed");
  } else if (e.target.textContent === "Read") {
    e.target.textContent = "Not read";
    readBook.classList.remove("readed");
  }
});

removeBook.addEventListener("click", () => {
  bookCard.remove();
});

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
  title = inputTitle.value;
  author = inputAuthor.value;
  pages = inputPages.value;
  read = false;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  clearInputCloseModal();
  displayBooks();
}

function clearInputCloseModal() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  closeModal();
}

function displayBooks(e) {
  const booksGrid = document.querySelector("#booksGrid");
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    const titleP = document.createElement("p");
    const authorP = document.createElement("p");
    const pagesP = document.createElement("p");

    titleP.textContent = `Title: ${book.title}`;
    authorP.textContent = `Author: ${book.author}`;
    pagesP.textContent = `Pages: ${book.pages}`;

    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");
    readButton.classList.add("readBook");
    removeButton.classList.add("removeBook");
    readButton.textContent = "Not read";
    removeButton.textContent = "Remove";

    bookCard.appendChild(titleP);
    bookCard.appendChild(authorP);
    bookCard.appendChild(pagesP);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);

    const booksGrid = document.getElementById("booksGrid");
    booksGrid.appendChild(bookCard);
    myLibrary.pop();

    readButton.addEventListener("click", (e) => {
      if (e.target.textContent === "Not read") {
        e.target.textContent = "Read";
        readButton.classList.add("readed");
      } else if (e.target.textContent === "Read") {
        e.target.textContent = "Not read";
        readButton.classList.remove("readed");
      }
    });

    removeButton.addEventListener("click", () => {
      bookCard.remove();
    });
  });
}
