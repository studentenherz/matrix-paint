const xInput = document.querySelector("#Nx");
const yInput = document.querySelector("#Ny");
const generateBtn = document.querySelector("#generate-btn");
const getBtn = document.querySelector("#get-btn");
const container = document.querySelector(".container");
const modalBtn = document.querySelector("#modal-btn");
const dialog = document.querySelector("dialog");
const separator = document.querySelector("#separator");
const filename = document.querySelector("#filename");
const cancelBtn = document.querySelector("#cancel-btn");

let mouseDown = false;

const generate = () => {
  const Ny = parseInt(xInput.value);
  const Nx = parseInt(yInput.value);

  const prevGrid = container.querySelector(".grid");
  if (prevGrid) {
    container.removeChild(prevGrid);
  }

  const grid = document.createElement("div");
  grid.classList.add("grid");
  grid.addEventListener("dragover", (e) => {
    e.preventDefault();
  })

  container.append(grid);

  for (let y = 0; y < Ny; y++) {
    const row = document.createElement("div");
    for (let x = 0; x < Nx; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.addEventListener("mouseenter", e => {
        e.preventDefault();

        if (mouseDown){
          cell.classList.add("painted");
          if (e.ctrlKey){
             cell.classList.remove("painted");
            }
          }
        }
      )

      cell.addEventListener("mousedown", e => {
        e.preventDefault();
        
        if (e.button === 0){
          mouseDown = true;
        }
        if (mouseDown){
          cell.classList.add("painted");
          if (e.ctrlKey){
           cell.classList.remove("painted");
          }
        }
      })
     
     cell.addEventListener("mouseup", e => {
        mouseDown = false;
     })

     row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}

const downloadTextFile = () => {
  const grid = container.querySelector(".grid");
  const sep = separator.value;
  const fName = filename.value.trim() || "grid.txt";

  let array = new Array();

  grid.childNodes.forEach(row => {
    let row_text = new Array();
    row.childNodes.forEach(cell => {
      row_text.push(cell.classList.contains("painted") ? "1" : "0");
    })
    array.push(row_text);
  });

  let text = "";
  for (let i = 0; i < array[0].length; i++) {
    let row_text = "";
    for (let j = 0; j < array.length - 1; j++)
      row_text += array[j][i] + sep;
    text += row_text + array[array.length - 1][i] + "\n";
  }

  const blob = new Blob([text], {type: 'text/plain'});
  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fName;

  a.click();
  URL.revokeObjectURL(blobUrl);
}

const main = () => {
  modalBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener("click", () => {
    dialog.close();
  });

  getBtn.addEventListener("click", downloadTextFile);

  generateBtn.addEventListener("click", () => {
    generate();
  })

  generate();

  window.addEventListener('mousedown', (e) => {
    if (e.button === 0) { // Ensure it's the left mouse button
      mouseDown = true;
      document.body.style.cursor = "crosshair";
    }

  });

  window.addEventListener('mouseup', () => {
    mouseDown = false;
    document.body.style.cursor = "auto";
  });
}

window.onload = main;
