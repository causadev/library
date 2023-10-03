const addBook = document.querySelector(".addBook");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("#submitForm");
const bookTitle = document.querySelector(".title");
const bookAuthor = document.querySelector(".author");
const bookPages = document.querySelector(".pages");
const bookRead = document.querySelector(".read");
const submitBook = document.querySelector(".addBookButton");
const readBook = document.querySelector(".readBook");
const removeBook = document.querySelector(".removeBook");
const bookCard = document.querySelector(".bookCard");
addBook.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
form.addEventListener("submit", addBookToLibrary);

removeBook.addEventListener("click", () => {
  bookCard.remove();
});

readBook.addEventListener("click", (e) => {
  if (e.target.textContent === "Not read") {
    readBook.textContent = "Read";
    readBook.classList.add("readed");
  } else {
    readBook.textContent = "Not read";
    readBook.classList.remove("readed");
  }
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

function addBookToLibrary(e) {
  // do stuff here
  e.preventDefault();
  title = bookTitle.value;
  author = bookAuthor.value;
  pages = bookPages.value;
  read = bookRead.checked;
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.log(book);
  clearInputCloseModal();
  displayBook();
}

function clearInputCloseModal() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  bookRead.value = "";
  closeModal();
}

function displayBook(book) {
  const booksGrid = document.querySelector("#booksGrid");
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    const titleP = document.createElement("p");
    const authorP = document.createElement("p");
    const pagesP = document.createElement("p");
    const readBook = document.createElement("button");
    const removeBook = document.createElement("button");

    titleP.textContent = `Title: ${book.title}`;
    authorP.textContent = `Author: ${book.author}`;
    pagesP.textContent = `Pages: ${book.pages}`;
    readBook.textContent = "Not read";
    removeBook.textContent = "Remove";

    bookCard.dataset.indexNumber;
    bookCard.classList.add("bookCard");
    readBook.classList.add("readBook");
    removeBook.classList.add("removeBook");

    bookCard.appendChild(titleP);
    bookCard.appendChild(authorP);
    bookCard.appendChild(pagesP);
    bookCard.appendChild(readBook);
    bookCard.appendChild(removeBook);
    booksGrid.appendChild(bookCard);

    removeBook.addEventListener("click", () => {
      bookCard.remove();
    });

    readBook.addEventListener("click", (e) => {
      if (e.target.textContent === "Not read") {
        readBook.textContent = "Read";
        readBook.classList.add("readed");
      } else {
        readBook.textContent = "Not read";
        readBook.classList.remove("readed");
      }
    });

    if (book.read) {
      readBook.textContent = "Read";
      readBook.classList.add("readed");
    } else {
      readBook.textContent = "Not read";
      readBook.classList.remove("readed");
    }

    myLibrary.pop(book);
  });
}
