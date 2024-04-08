const terazTimeStamp = Date.now();
let counter;

// localStorage.clear();

document.addEventListener("DOMContentLoaded", function () {
  counter = localStorage.getItem("c") || 1; // Pobierz wartość counter z local storage lub ustaw domyślną wartość 0, jeśli nie istnieje
  loadNotesFromLocalStorage();
  console.log("counter: " + counter);
});

document.querySelector("#clearStorage").addEventListener("click", function () {
  localStorage.clear();
  counter = 0;
  localStorage.setItem("c", counter);
  location.reload();
});

const modal = document.querySelector("#myModal");
document.querySelector("#openDialog").addEventListener("click", function () {
  modal.style.display = "block";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
});

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

document
  .querySelector("#noteForm")
  .addEventListener("submit", function (event) {
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
  });

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
  noteDiv.id = "noteDiv" + id;
  noteDiv.style.backgroundColor = colour;
  noteDiv.style.width = "300px";
  noteDiv.style.height = "300px";
  noteDiv.style.display = "inline-block";

  noteDiv.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
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
  edit.addEventListener("click", editNote(noteData.id));

  buttonsdiv.appendChild(del);
  buttonsdiv.appendChild(edit);

  notes.appendChild(noteDiv);

  noteDiv.appendChild(buttonsdiv);

  localStorage.setItem("noteDiv" + id, JSON.stringify(noteData)); //przekazujemy do pamięci dane notatki
}

function deleteNote(id) {
  localStorage.removeItem("noteDiv" + id);
  notes.removeChild(document.querySelector("#noteDiv" + id));
  // localStorage.setItem("noteDiv" + i, null);
}

function editNote(id) {}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("colour").value = "#c2a2c8";
  document.getElementById("pin").checked = false;
}
