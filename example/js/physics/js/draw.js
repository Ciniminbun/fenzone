// Shape Functions
const draw = {
  page: {
    styleEl: document.getElementsByTagName("STYLE")[0],
    mainEl: document.getElementsByTagName("MAIN")[0],
    bodyEl: document.getElementsByTagName("BODY")[0]
  },
  allshapes: [
    // id0: "example"
  ],
  templates: {
    style: (id, x, y, width, height, radius, color) => {
      return `#${id} {width: ${width}px; height: ${height}px; border-radius: ${radius}px; 
      background-color: ${color}; position: absolute; top:${y}px; left: ${x}px; 
      -moz-user-select: -moz-none; -khtml-user-select: none; -webkit-user-select: none; 
      -o-user-select: none; user-select: none;}`;
    },
    div: (id) => {
      return `<div onmousedown="phys.add(this)" ontouchstart="phys.add(this)" class="shape" id="${id}"></div>`;
    }
  },
  rectangle: (x, y, width, height, radius, color) => {
    let id = draw.allshapes.length;
    // console.log("running rectangle", id);

    if (radius == 0 && width != height){
      draw.allshapes.push(`rec_${id}`);
    } else if (radius == 0 && width == height){
      draw.allshapes.push(`squ_${id}`);
    } else if (radius == width && height == width){
      draw.allshapes.push(`cir_${id}`);
    }

    id = draw.allshapes[id];

    draw.page.styleEl.innerHTML += draw.templates.style(id, x, y, width, height, radius, color);

    return draw.templates.div(`${id}`);
  },
  square: (x, y, width, color) => {
    return draw.rectangle(x, y, width, width, 0, color);
  },
  circle: (x, y, width, color) => {
    return draw.rectangle(x, y, width, width, width, color);
  },
  random: (element) => {
    const width = window.innerWidth, height = window.innerHeight;
    if (rndInt == 0) {
      shape = draw.circle(rndInt(0, width), rndInt(0, height), rndInt(50, 501), rndColor());
    } else {
      shape = draw.rectangle(rndInt(0, width), rndInt(0, height), rndInt(50, 501), rndInt(50, 501), 0, rndColor());
    }
    element.innerHTML += shape;
  },
  clear: () => {
    for (id of draw.allshapes) {
      let element = document.getElementById(id);
      element.remove();
    }
  }

}

//Utility
function rndInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function rndColor() {
  return `rgb(${rndInt(0, 256)}, ${rndInt(0, 256)}, ${rndInt(0, 256)}, ${rndInt(0, 256)})`
}

function addShape(form) {
  let input = {x: 0, y: 0, width: 100, height: 100, radius: 0, color: "black"};
  for (x of form.elements) { if (x.value != "") {input[x.placeholder] = x.value;}}00
  draw.page.mainEl.innerHTML += draw.rectangle(parseInt(input.x), 
    parseInt(input.y), parseInt(input.width), parseInt(input.height), parseInt(input.radius), input.color);
}

// console.log(draw.allshapes);