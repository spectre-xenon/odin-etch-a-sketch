const canvas = document.getElementById("canvasContainer");
const draw = document.querySelectorAll("#canvasContainer .row div");
const div = document.createElement("div");
const sizesSlider = document.getElementById("slider");

// Colors
let currentColor = "white";
let lastSelectedColor = "";
let drawing = false;

window.onmousedown = () => {
  drawing = true;
};
window.onmouseup = () => {
  drawing = false;
};

document.getElementById("orange").addEventListener("click", () => {
  if (isErasing) return null;
  currentColor = "#FFAC4B";
  lastSelectedColor = "#FFAC4B";
});
document.getElementById("green").addEventListener("click", () => {
  if (isErasing) return null;
  currentColor = "#47FF6F";
  lastSelectedColor = "#47FF6F";
});
document.getElementById("lightBlue").addEventListener("click", () => {
  if (isErasing) return null;
  currentColor = "#2DC0FF";
  lastSelectedColor = "#2DC0FF";
});
document.getElementById("purple").addEventListener("click", () => {
  if (isErasing) return null;
  currentColor = "#A12AFF";
  lastSelectedColor = "#A12AFF";
});
document.getElementById("red").addEventListener("click", () => {
  if (isErasing) return null;
  currentColor = "#FF5C5C";
  lastSelectedColor = "#FF5C5C";
});
document.getElementById("eyeDropper").addEventListener("change", () => {
  if (isErasing) return null;
  currentColor = eyeDropper.value;
  lastSelectedColor = eyeDropper.value;
  eyeDropper.style.background = eyeDropper.value;
});

// eraser
let isErasing = false;
const eraser = document.getElementById("eraser");
eraser.addEventListener("click", () => {
  if (!isErasing && isRainbowMode === false) {
    isErasing = true;
    eraser.classList.add("inputOn");
    currentColor = "white";
  } else {
    isErasing = false;
    eraser.classList.remove("inputOn");
    currentColor = lastSelectedColor;
  }
});

// ClearCanvas
document.getElementById("clearCanvas").addEventListener("click", () => {
  generateGrid(size);
});

// ToggleGrid
let gridToggled = false;
const toggleGridButt = document.getElementById("toggleGridButt");
const singleCell = document.getElementsByClassName("singleCell");

function toggleGrid() {
  if (gridToggled) {
    for (let i = 0; i < singleCell.length; i++) {
      singleCell[i].style.border = "1px solid black";
    }
  } else {
    for (let i = 0; i < singleCell.length; i++) {
      singleCell[i].style.border = "none";
    }
  }
}

toggleGridButt.addEventListener("click", () => {
  if (!gridToggled) {
    gridToggled = true;
    toggleGridButt.classList.add("inputOn");
    toggleGrid();
  } else {
    gridToggled = false;
    toggleGridButt.classList.remove("inputOn");
    toggleGrid();
  }
});

// rainBow Mode
let isRainbowMode = false;
const rainbowMode = document.getElementById("rainbowMode");

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

rainbowMode.addEventListener("click", () => {
  if (!isRainbowMode && isErasing === false) {
    isRainbowMode = true;
    rainbowMode.setAttribute("id", "rainbowModeOn");
  } else {
    isRainbowMode = false;
    rainbowMode.setAttribute("id", "rainbowMode");
  }
});

// Shading
// let isShadingMode = false;
// const shadingMode = document.getElementById("shadingMode");

// shadingMode.addEventListener("click", () => {
//   if (!isShadingMode) {
//     isShadingMode = true;
//     shadingMode.setAttribute("id", "shadingModeOn");
//   } else {
//     isShadingMode = false;
//     shadingMode.setAttribute("id", "shadingMode");
//   }
// });

function generateGrid(size) {
  console.log("generated Grid");
  canvas.textContent = "";

  for (let i = 0; i <= size; i++) {
    const rows = document.createElement("div");
    rows.classList.add("row");
    for (let i = 0; i <= size; i++) {
      const div = document.createElement("div");
      div.classList.add("singleCell");
      div.style.filter = "brightness(1)";
      div.addEventListener("mouseover", () => {
        toggleGrid();
        if (drawing) {
          if (isRainbowMode) {
            div.style.background = getRandomColor();
          } else {
            div.style.background = currentColor;
          }
        }
      });
      rows.appendChild(div);
    }
    canvas.appendChild(rows);
  }
}

// Slider
let size = 32;
sizesSlider.addEventListener("input", () => {
  if (sizesSlider.value == 0) {
    size = 64;
  } else if (sizesSlider.value == 50) {
    size = 32;
  } else {
    size = 100;
  }
  generateGrid(size);
});

generateGrid(size);
