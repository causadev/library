// Selecting elements from the HTML document
const addBook = document.querySelector("#addBook"); // Button to open the modal
const modal = document.querySelector(".modal"); // Modal for adding a book
const overlay = document.querySelector("#overlay"); // Overlay for the modal
const form = document.querySelector("form"); // Form element for adding a book
const booksGrid = document.querySelector("#books-grid"); // Container for displaying books
const myLibrary = []; // An array to store book objects

// Constructor function for creating Book objects
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}


// Event listener for the form submission when adding a book
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents the default form submission behavior

  // Retrieve book information from form input fields
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").checked;

  // Create a new Book object and add it to the library array
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  // Clear input fields and close the modal
  clearInputCloseModal();

  // Display the updated book library
  displayBook();
});

// Function to display books in the booksGrid
function displayBook() {
  // Clear the existing content in booksGrid
  while (booksGrid.hasChildNodes()) {
    booksGrid.removeChild(booksGrid.firstChild);
  }

  // Loop through the library array and create a card for each book
  myLibrary.forEach((newBook, index) => {
    const bookCard = `<div class="bookCard">
      <p>Title: ${newBook.title}</p>
      <P>Author: ${newBook.author}</P>
      <p>Pages: ${newBook.pages}</p>
      <button class="readBook">Not read</button>
      <button class="removeBook">Remove</button>
    </div>`;

    booksGrid.insertAdjacentHTML("beforeend", bookCard);

    const card = booksGrid.lastChild;
    const readBtn = card.querySelector(".readBook");
    const removeBtn = card.querySelector(".removeBook");

    // Event listener for the "Read" button to toggle the book's read status
    readBtn.addEventListener("click", () => {
      readBtn.textContent =
        readBtn.textContent === "Not read" ? "Read" : "Not read";
      readBtn.classList.toggle("read");
      newBook.isRead = !newBook.isRead;
    });

    // Set the initial state of the "Read" button based on the book's read status
    if (newBook.isRead) {
      readBtn.textContent = "Read";
      readBtn.classList.toggle("read");
    } else {
      readBtn.textContent = "Not read";
    }

    // Event listener for the "Remove" button to delete a book
    removeBtn.addEventListener("click", () => {
      const confirmation = confirm(
        `Are you sure you want to delete the book with the title: '${newBook.title}'?`
      );
      if (confirmation) {
        // Remove the book from the library array and update the display
        myLibrary.splice(index, 1);
        displayBook();
      }
    });
  });
}

// Function to open the modal
function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Function to close the modal
function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Function to clear input fields and close the modal
function clearInputCloseModal() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
  closeModal();
}

// Event listeners for opening and closing the modal
addBook.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
