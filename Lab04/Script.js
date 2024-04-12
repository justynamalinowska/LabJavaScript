let colour = "#c2a2c8";
let counter;

//zapisac w localstorage tablice notatek

// localStorage.clear();

document.addEventListener("DOMContentLoaded", function () {
  //counter
  counter = localStorage.getItem("c") || 1; // Pobierz wartość counter z local storage lub ustaw domyślną wartość 0, jeśli nie istnieje
  loadNotesFromLocalStorage();
  console.log("counter: " + counter);
});

document.querySelector("#clearStorage").addEventListener("click", function () {
  localStorage.clear();
  counter = 0;
  localStorage.setItem("c", counter);
  location.reload(); //render notes wlasna funkcja unikac odswiezania
});

const modal = document.querySelector("#myModal");
document
  .querySelector("#openDialog")
  .addEventListener("click", displayDialogWindow);

function displayDialogWindow() {
  modal.style.display = "block";
}

const notes = document.querySelector("#notes");

function loadNotesFromLocalStorage() {
  const length = counter;
  if (length) {
    for (let i = 0; i < length; i++) {
      const noteData = JSON.parse(localStorage.getItem("noteDiv" + i));
      if (noteData) {
        createNote(
          noteData.id,
          noteData.title,
          noteData.content,
          noteData.colour,
          noteData.pin,
          noteData.date
        );
      }
    }
  }
}

document.querySelector("#noteForm").addEventListener("submit", addNewNote);

function addNewNote(event) {
  event.preventDefault(); // Zatrzymaj domyślne działanie formularza
  modal.style.display = "none"; // Ukryj okienko dialogowe

  const id = counter;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const colour = document.getElementById("colour").value;
  const pin = document.getElementById("pin").checked;
  const date = new Date();

  createNote(id, title, content, colour, pin, date);
  resetForm();
  counter++;
  localStorage.setItem("c", counter);

  console.log(counter);
}

function createNote(id, title, content, colour, pin, date) {
  const noteData = {
    id: id,
    title: title,
    content: content,
    colour: colour,
    pin: pin,
    date: date,
  };

  const noteDiv = document.createElement("div");
  noteDiv.id = "noteDiv" + id; //zrobic to w style
  noteDiv.style.backgroundColor = colour;
  noteDiv.style.width = "300px";
  noteDiv.style.height = "300px";
  noteDiv.style.display = "inline-block";

  noteDiv.innerHTML = `<h2>${title}</h2><p>${content}</p>`; //uwazac na <script>
  const buttonsdiv = document.createElement("div");
  buttonsdiv.className = "deleteEditButtons";

  const del = document.createElement("button");
  del.id = "delete" + id;
  del.innerText = "Delete";
  del.addEventListener("click", function () {
    deleteNote(noteData.id);
  });

  const edit = document.createElement("button");
  edit.id = "edit" + id;
  edit.innerText = "Edit";
  edit.addEventListener("click", function () {
    editNote(id);
    console.log(id);
  });

  buttonsdiv.appendChild(del);
  buttonsdiv.appendChild(edit);

  notes.appendChild(noteDiv);

  noteDiv.appendChild(buttonsdiv);

  localStorage.setItem("noteDiv" + id, JSON.stringify(noteData)); //przekazujemy do pamięci dane notatki
}

function deleteNote(id) {
  localStorage.removeItem("noteDiv" + id);
  notes.removeChild(document.querySelector("#noteDiv" + id));
}

let currentNoteData;
let currentId;

function editNote(id) {
  displayDialogWindow();

  const noteData = JSON.parse(localStorage.getItem("noteDiv" + id));

  document.getElementById("title").value = noteData.title;
  document.getElementById("content").value = noteData.content;
  document.getElementById("colour").value = noteData.colour;
  document.getElementById("pin").checked = noteData.pin;

  // Usuń starą notatkę z localStorage
  localStorage.removeItem("noteDiv" + id);

  const form = document.querySelector("#noteForm");
  form.removeEventListener("submit", addNewNote);

  // Utwórz nowy event listener dla formularza edycji, który zaktualizuje notatkę
  form.addEventListener("submit", onEditSubmit);

  currentId = id;
  currentNoteData = noteData;
}

function onEditSubmit(event) {
  handleEditSubmit(event, currentId, currentNoteData);
}

function handleEditSubmit(event, id, noteData) {
  event.preventDefault(); // Zatrzymaj domyślne działanie formularza

  // Aktualizuj dane notatki
  noteData.title = document.getElementById("title").value;
  noteData.content = document.getElementById("content").value;
  noteData.colour = document.getElementById("colour").value;
  noteData.pin = document.getElementById("pin").checked;
  noteData.date = new Date();

  // Zaktualizuj wyświetlaną notatkę
  const noteDiv = document.getElementById("noteDiv" + id);
  noteDiv.querySelector("h2").innerText = noteData.title;
  noteDiv.querySelector("p").innerText = noteData.content;
  noteDiv.style.backgroundColor = noteData.colour;

  // Zaktualizuj notatkę w localStorage
  localStorage.setItem("noteDiv" + id, JSON.stringify(noteData));

  modal.style.display = "none";

  // Resetuj event listener dla formularza
  const form = document.querySelector("#noteForm");
  form.removeEventListener("submit", handleEditSubmit);
  form.addEventListener("submit", addNewNote);
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("colour").value = colour;
  document.getElementById("pin").checked = false;
}
