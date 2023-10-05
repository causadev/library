const addBook = document.querySelector(".addBook");
const modal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");
const submit = document.querySelector("#submitForm");
submit.addEventListener("submit", addBookToLibrary);

const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  event.preventDefault();
  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const pages = document.querySelector(".pages").value;
  const read = document.querySelector(".readCheck").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(newBook);

  clearInputCloseModal();
  displayBook();
}

function displayBook() {
  const booksGrid = document.querySelector("#booksGrid");
  booksGrid.innerHTML = "";
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
      myLibrary.pop(bookCard);
      bookCard.remove();
    });

    readBook.addEventListener("click", (e) => {
      if (e.target.textContent === "Not read") {
        readBook.textContent = "Read";
        readBook.classList.add("read");
        book.read = true;
      } else {
        readBook.textContent = "Not read";
        readBook.classList.remove("read");
        book.read = false;
      }
    });

    if (book.read) {
      readBook.textContent = "Read";
      readBook.classList.add("read");
    } else {
      readBook.textContent = "Not read";
      readBook.classList.remove("read");
    }
  });
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function clearInputCloseModal() {
  document.querySelector(".title").value = "";
  document.querySelector(".author").value = "";
  document.querySelector(".pages").value = "";
  document.querySelector(".readCheck").checked = false;
  closeModal();
}

addBook.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
