//TODO using color schemes api https://www.thecolorapi.com/docs#schemes

//TODO create function based on color input docs https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color

//TODO use fetch api function https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
let color;
let mode;

const getColorInput = (e) => (color = e.target.value);
const getColorMode = (e) => (mode = e.target.value);

document.querySelector("[data-color]").addEventListener("input", getColorInput);
document.querySelector("[data-mode]").addEventListener("input", getColorMode);

const startUp = () => {
  color = document.querySelector("[data-color]").value;
  mode = document.querySelector("[data-mode]").value;
  getColor(color, mode);
};

const getColor = (color, mode) => {
  if (!color || !mode) return;
  const colorResult = color.replace("#", "");
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorResult}&mode=${mode}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      buildColorList(data);
      buildColorHexList(data);
    });
};

const buildColorList = (data) => {
  const colorList = document.querySelector("[data-color-list]");
  colorList.innerHTML = "";
  data.colors.map((color) => {
    return (colorList.innerHTML += `<li style="background-color:${color.hex.value}"></li>`);
  });

  const colorElement = document.querySelector("[data-color-list] li");

  if (colorElement) {
    colorElement.addEventListener("click", function () {
      console.log(this.style.backgroundColor);
    });
  }
};

const buildColorHexList = (data) => {
  const colorHexList = document.querySelector("[data-hex-list]");
  colorHexList.innerHTML = "";
  data.colors.map((color) => {
    return (colorHexList.innerHTML += `<li>${color.hex.value}</li>`);
  });
};

const copyColorToClipBoard = () => {
  let copyColor = document.querySelector("[data-color-list] li");
  console.log(copyColor.style);
};

window.addEventListener("load", startUp, false);

document
  .querySelector("[data-get-color-scheme]")
  .addEventListener("click", function () {
    getColor(color, mode);
  });
