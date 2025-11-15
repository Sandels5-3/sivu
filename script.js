
let deleteN = 0;
let noteCounter = 0; 
function newNote() {
  noteCounter++;
  const muisti = document.createElement("div");
  muisti.classList.add("muisti");
  muisti.id = "muisti-" + noteCounter;
  muisti.style.top = "100px";
  muisti.style.left = "100px";
  const lappu = document.createElement("div");
  lappu.classList.add("muistilappu");
  const nimi = document.createElement("input");
  nimi.value = "Muistio";
  nimi.oninput = saveNotes;
  const alue = document.createElement("textarea");
  alue.classList.add("lappualue");
  alue.oninput = saveNotes;
  lappu.appendChild(nimi);
  muisti.appendChild(lappu);
  muisti.appendChild(alue);
  document.body.appendChild(muisti);

  dragElement(muisti);
  saveNotes();
}

function deleteCHILD(div) {
  div.parentNode.removeChild(div)
}
function saveNotes() {
  const notes = [];
  document.querySelectorAll(".muisti").forEach(note => {
    notes.push({
      id: note.id,
      top: note.style.top,
      left: note.style.left,
      name: note.querySelector("input").value,
      text: note.querySelector("textarea").value,
      height:note.querySelector("textarea").height,
      width:note.querySelector("textarea").width,
    });
  });

  localStorage.setItem("muistiinpanot", JSON.stringify(notes));
}
window.onload = loadNotes;

function loadNotes() {
  const saved = JSON.parse(localStorage.getItem("muistiinpanot") || "[]");
  saved.forEach(data => {
    noteCounter++;
    const muisti = document.createElement("div");
    muisti.classList.add("muisti");
    muisti.id = data.id;
    muisti.style.top = data.top;
    muisti.style.left = data.left;
    const lappu = document.createElement("div");
    lappu.classList.add("muistilappu");
    const nimi = document.createElement("input");
    nimi.value = data.name;
    nimi.oninput = saveNotes;
    const alue = document.createElement("textarea");
    alue.classList.add("lappualue");
    alue.value = data.text;
    alue.oninput = saveNotes;
    lappu.appendChild(nimi);
    muisti.appendChild(lappu);
    muisti.appendChild(alue);
    document.body.appendChild(muisti);

    dragElement(muisti);
  });
}

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = elmnt.querySelector(".muistilappu");
  if (header) {
    header.ontouchstart = ontouchstart;
  } else {
    elmnt.ontouchstart = ontouchstart;
  }



  function ontouchstart(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.ontouchend= elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.ontouchend = null;
    document.ontouchend = null;
    saveNotes();
  }
}
