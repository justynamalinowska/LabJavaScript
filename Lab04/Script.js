let colour = "#c2a2c8";
let counter;
let pinnedNotesDiv = document.querySelector("#pinnedNotes");

document.addEventListener("DOMContentLoaded", function () {
  counter = localStorage.getItem("c") || 1;
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
  event.preventDefault();
  modal.style.display = "none";

  const id = counter;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const colour = document.getElementById("colour").value;
  const pin = false;
  const date = new Date();

  createNote(id, title, content, colour, pin, date);
  resetForm();
  counter++;
  localStorage.setItem("c", counter);
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
  noteDiv.id = "noteDiv" + id;
  noteDiv.style.backgroundColor = colour;

  const titleElement = document.createElement("h2");
  titleElement.innerText = title;

  const contentElement = document.createElement("p");
  contentElement.innerText = content;

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
  });

  buttonsdiv.appendChild(del);
  buttonsdiv.appendChild(edit);

  const pinIcon = document.createElement("img");
  pinIcon.className = "pin";
  if (pin) {
    pinIcon.src = "unpin.png";
  } else {
    pinIcon.src = "pin.png";
  }
  pinIcon.addEventListener("click", function () {
    togglePin(id);
  });

  noteDiv.appendChild(pinIcon);
  noteDiv.appendChild(titleElement);
  noteDiv.appendChild(contentElement);
  noteDiv.appendChild(buttonsdiv);

  if (pin) {
    if (!pinnedNotesDiv) {
      pinnedNotesDiv = document.createElement("div");
      pinnedNotesDiv.id = "pinnedNotes";
      notes.parentNode.insertBefore(pinnedNotesDiv, notes.nextSibling);
    }
    pinnedNotesDiv.insertBefore(noteDiv, pinnedNotesDiv.firstChild);
  } else {
    notes.appendChild(noteDiv);
  }

  localStorage.setItem("noteDiv" + id, JSON.stringify(noteData));
}

function togglePin(id) {
  const noteData = JSON.parse(localStorage.getItem("noteDiv" + id));
  noteData.pin = !noteData.pin;

  const noteDiv = document.getElementById("noteDiv" + id);
  const pinIcon = noteDiv.querySelector(".pin");
  if (noteData.pin) {
    pinIcon.src = "unpin.png";
    if (!pinnedNotesDiv) {
      pinnedNotesDiv = document.createElement("div");
      pinnedNotesDiv.id = "pinnedNotes";
      notes.parentNode.insertBefore(pinnedNotesDiv, notes.nextSibling);
    }
    pinnedNotesDiv.insertBefore(noteDiv, pinnedNotesDiv.firstChild);
  } else {
    pinIcon.src = "pin.png";
    notes.appendChild(noteDiv);
  }
  localStorage.setItem("noteDiv" + id, JSON.stringify(noteData));
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

  localStorage.removeItem("noteDiv" + id);

  const form = document.querySelector("#noteForm");
  form.removeEventListener("submit", addNewNote);
  form.addEventListener("submit", onEditSubmit);

  currentId = id;
  currentNoteData = noteData;
}

function onEditSubmit(event) {
  handleEditSubmit(event, currentId, currentNoteData);
}

function handleEditSubmit(event, id, noteData) {
  event.preventDefault();

  noteData.title = document.getElementById("title").value;
  noteData.content = document.getElementById("content").value;
  noteData.colour = document.getElementById("colour").value;
  noteData.pin = document.getElementById("pin").checked;
  noteData.date = new Date();

  const noteDiv = document.getElementById("noteDiv" + id);
  noteDiv.querySelector("h2").innerText = noteData.title;
  noteDiv.querySelector("p").innerText = noteData.content;
  noteDiv.style.backgroundColor = noteData.colour;

  const existingPinIcon = noteDiv.querySelector(".pin");

  if (existingPinIcon) {
    existingPinIcon.parentNode.removeChild(existingPinIcon);
    notes.removeChild(noteDiv);
  }

  if (noteData.pin) {
    const pinIcon = document.createElement("img");
    pinIcon.className = "pin";
    pinIcon.src = "unpin.png";

    const pinContainer = document.createElement("div");
    pinContainer.appendChild(pinIcon);

    noteDiv.appendChild(pinContainer);

    if (!pinnedNotesDiv) {
      pinnedNotesDiv = document.createElement("div");
      pinnedNotesDiv.id = "pinnedNotes";
      notes.parentNode.insertBefore(pinnedNotesDiv, notes.nextSibling);
    }
    pinnedNotesDiv.insertBefore(noteDiv, pinnedNotesDiv.firstChild);
  } else {
    const existingPinIcon = noteDiv.querySelector(".pin");
    if (existingPinIcon) {
      existingPinIcon.parentNode.removeChild(existingPinIcon);
    }
    notes.appendChild(noteDiv);
  }

  localStorage.setItem("noteDiv" + id, JSON.stringify(noteData));
  modal.style.display = "none";

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
