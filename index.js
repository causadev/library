const addBook = document.querySelector("#addBook");
const modal = document.querySelector(".modal");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("form");
const booksGrid = document.querySelector("#books-grid");
const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  clearInputCloseModal();
  displayBook();
});

function displayBook() {
  while (booksGrid.hasChildNodes()) {
    booksGrid.removeChild(booksGrid.firstChild);
  }
  myLibrary.forEach((newBook, index) => {
    const card = document.createElement("div");
    card.classList.add("bookCard");

    const title = document.createElement("p");
    title.textContent = `Title: ${newBook.title}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${newBook.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${newBook.pages}`;

    const readBtn = document.createElement("button");
    readBtn.textContent = "Not read";
    readBtn.classList.add("readBook");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBook");

    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(readBtn);
    card.append(removeBtn);

    booksGrid.append(card);

    readBtn.addEventListener("click", () => {
      if (readBtn.textContent === "Not read") {
        readBtn.textContent = "Read";
        readBtn.classList.add("read");
        newBook.isRead = true;
      } else {
        readBtn.textContent = "Not read";
        readBtn.classList.remove("read");
        newBook.isRead = false;
      }
    });

    if (newBook.read) {
      readBtn.textContent = "Read";
      readBtn.classList.add("read");
    } else {
      readBtn.textContent = "Not read";
      readBtn.classList.remove("read");
    }

    removeBtn.addEventListener("click", () => {
      const confirmation = confirm(
        `Are you sure you want to delete the book with the title: '${newBook.title}'?`
      );
      if (confirmation) {
        myLibrary.splice(index, 1);
        displayBook();
      } else {
        alert("Cancel");
      }
    });
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
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
  closeModal();
}

addBook.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
