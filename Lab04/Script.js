let colour = "#c2a2c8";
let counter;
let pinnedNotesDiv = document.querySelector("#pinnedNotes");
const notes = document.querySelector("#notes");
const tagButton = document.querySelectorAll(".tagButton");

document.addEventListener("DOMContentLoaded", function () {
  counter = localStorage.getItem("c") || 1;
  loadNotesFromLocalStorage();
  console.log("counter: " + counter);

  tagButton.forEach((button) => {
    button.addEventListener("click", () => {
      const isSelected = button.classList.contains("selected");
      if (!isSelected) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  });
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
  resetForm();
  modal.style.display = "block";
}

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
          noteData.date,
          noteData.tags
        );
      }
    }
  }
}

document.querySelector("#noteForm").addEventListener("submit", addNewNote);

function getTags() {
  const tags = [];
  tagButton.forEach((button) => {
    if (button.classList.contains("selected")) {
      tags.push(button.innerText);
    }
  });
  return tags;
}

function addNewNote(event) {
  event.preventDefault();

  const id = counter;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const colour = document.getElementById("colour").value;
  const pin = false;
  const date = new Date();
  const tags = getTags();

  createNote(id, title, content, colour, pin, date, tags);
  // resetForm();
  counter++;
  modal.style.display = "none";
  localStorage.setItem("c", counter);
}

function createNote(id, title, content, colour, pin, date, tags) {
  const noteData = {
    id: id,
    title: title,
    content: content,
    colour: colour,
    pin: pin,
    date: date,
    tags: tags,
  };

  const noteDiv = document.createElement("div");
  noteDiv.id = "noteDiv" + id;
  noteDiv.style.backgroundColor = colour;

  const titleElement = document.createElement("h2");
  titleElement.innerText = title;

  const contentElement = document.createElement("p");
  contentElement.innerText = content;

  // const tagsElement = document.createElement("div");
  // tagsElement.className = "tags";
  // tags.forEach((tag) => {
  //   const tagSpan = document.createElement("span");
  //   tagSpan.innerText = tag;
  //   tagsElement.appendChild(tagSpan);
  // });

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

  noteDiv.append(
    pinIcon,
    titleElement,
    contentElement,
    // tagsElement,
    buttonsdiv
  );

  if (pin) {
    if (!pinnedNotesDiv) {
      pinnedNotesDiv = document.createElement("div");
      pinnedNotesDiv.id = "pinnedNotes";
      notes.parentNode.insertBefore(pinnedNotesDiv, notes.nextSibling);
    }
    pinnedNotesDiv.insertBefore(noteDiv, pinnedNotesDiv.firstElementChild);
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
    pinnedNotesDiv.insertBefore(noteDiv, pinnedNotesDiv.firstElementChild);
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
  noteData.date = new Date();

  const noteDiv = document.getElementById("noteDiv" + id);
  noteDiv.querySelector("h2").innerText = noteData.title;
  noteDiv.querySelector("p").innerText = noteData.content;
  noteDiv.style.backgroundColor = noteData.colour;

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
  tagButton.forEach((button) => {
    button.classList.remove("selected");
  });
}
