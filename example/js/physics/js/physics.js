// Vector Setup
class Vector {
  constructor(arr) {
    this.arr = arr;
  }
  add(otherVector) {
    if (typeof(otherVector) == "number") {
      let res = []
      for(let key in this.arr) {
        res[key] = this.arr[key] + otherVector
      }
      return new Vector(res)
    } else {
      const oa = otherVector.arr;
      if (this.arr.length === oa.length) {
        let res = []
        for(let key in this.arr) {
          res[key] = this.arr[key] + oa[key]
        }
        return new Vector(res)
      }
    }
  }
  sub(otherVector) {
    if (typeof(otherVector) == "number") {
      let res = []
      for(let key in this.arr) {
        res[key] = this.arr[key] - otherVector
      }
      return new Vector(res)
    } else {
      const oa = otherVector.arr;
      if (this.arr.length === oa.length) {
        let res = []
        for(let key in this.arr) {
          res[key] = this.arr[key] - oa[key]
        }
        return new Vector(res)
      }
    }
  }
  mul(otherVector) {
    if (typeof(otherVector) == "number") {
      let res = []
      for(let key in this.arr) {
        res[key] = this.arr[key] * otherVector
      }
      return new Vector(res)
    } else {
      const oa = otherVector.arr;
      if (this.arr.length === oa.length) {
        let res = []
        for(let key in this.arr) {
          res[key] = this.arr[key] * oa[key]
        }
        return new Vector(res)
      }
    }
  }
  div(otherVector) {
    if (typeof(otherVector) == "number") {
      let res = []
      for(let key in this.arr) {
        res[key] = this.arr[key] / otherVector
      }
      return new Vector(res)
    } else {
      const oa = otherVector.arr;
      if (this.arr.length === oa.length) {
        let res = []
        for(let key in this.arr) {
          res[key] = this.arr[key] / oa[key]
        }
        return new Vector(res)
      }
    }
  }
  x() {
    return this.arr[0]
  }
  y() {
    return this.arr[1]
  }
}

// Gobal Update/Var
const frameTime = 1000 / 60, isTouch = false;

function Update() { // updates every 60th of a second
  phys.update();
  // console.log(phys.mousePos.arr);
}
var frameInterval = setInterval(Update, frameTime);

function CheckForElDupe(element) {
  let res = false;
  for (x of phys.elements) {
    if (x.element == element) {res = true}
  }
  return res
}

function findIndexByEl(entry, array) {
  for (x in array) {
    if (array[x].element == entry) {return x}
  }
}

function reduceDeg(deg) {
  return ((deg / 360) % 1) * 360
}

function degToRad(deg) {
  return reduceDeg(deg) * (Math.PI / 180);
}

function radToDeg(rad) {
  return reduceDeg(rad * (180 / Math.PI))
}

const phys = {
  mouseDown: false, mousePos: new Vector([0, 0]), elements: [], gravOn: false, gDir: 90,
  dir: (deg) => {
    let rad = degToRad(deg);
    return new Vector([Math.cos(rad), Math.sin(rad)])
  },
  setGDir: (deg) => {phys.gDir = deg},
  add: (element) => {
    if (!(CheckForElDupe(element))) {
      let cpos = new Vector([element.offsetLeft, element.offsetTop]);
      element.style.position = "absolute";
      let obj = {
        element: element,
        velocity: new Vector([0, 0]),
        position: new Vector([element.offsetLeft, element.offsetTop]),
        mass: (element.offsetHeight * element.offsetWidth) / 10000,
        grab: phys.mousePos.sub(cpos),
        goalPos: new Vector([element.offsetLeft, element.offsetTop])
      };
      // console.log(obj.mass)
      phys.elements.push(obj);
      drag.grabbed.push(obj);
      // console.log('added new object', element.id);
    } else {
      let cpos = new Vector([element.offsetLeft, element.offsetTop]),
      elementIndex = findIndexByEl(element, phys.elements);
      phys.elements[elementIndex].grab = phys.mousePos.sub(cpos);
      drag.grabbed.push(phys.elements[elementIndex]);
      // console.log('updated grab pos for obj', element.id);
    }
  },
  update: () => {
    if (phys.elements[0]) {
      for (obj of phys.elements) {
        // get new pos
        let newPos = obj.position;
        let newVel = obj.velocity;
        if (drag.isGrabbed(obj)){ 
          // to mouse
          newVel = newVel.add( phys.mousePos.sub(obj.position.add(obj.grab)) );

          // pull strength
          newVel = newVel.mul(0.2);
        } else if (phys.gravOn) {
          // gravity
          newVel = newVel.add(phys.dir(phys.gDir).mul(2));
        }
        // console.log(newVel.arr)
        
        newVel = newVel.mul(0.95);
        newPos = newPos.add(newVel);
        newPos, newVel = phys.collison(newPos, newVel, obj.element);

        // if (Math.abs(newVel.x()) < 0.01) {newVel.arr[0] = 0;}
        // if (Math.abs(newVel.y()) < 0.01) {newVel.arr[1] = 0;}

        // apply new pos
        obj.element.style.top = newPos.y() + "px"; // y
        obj.element.style.left = newPos.x() + "px"; // x

        // new info
        obj.position = newPos;
        obj.velocity = newVel;
      }
    }
  },
  getVecAngle: (vector) => {
    // will be in radians
    let magnitude = Math.sqrt(vector.x()**2 + vector.y()**2),
    angle = Math.asin(vector.y() / magnitude);
    // if (angle == Math.asin(vector.y() / magnitude)) {console.log('poo')}
    return angle
  },
  reflectVector: (vec, wallAng, loss) => {
    let newAng, newVec, vecAngle = radToDeg(phys.getVecAngle(vec));
    if (vec.x() < 0) {
      newAng = reduceDeg(-1 * vecAngle);
    } else {
      newAng = reduceDeg(-1 * vecAngle);
    }
    newVec = vec.mul(phys.dir(newAng));
    console.log("og vec:", vec.arr, "new ang:", newAng, "new dir:", phys.dir(newAng).arr);
    // console.log(newVec.arr)

    return newVec
  },
  collison: (pos, vel, element) => {
    let pad = 5, w = window.innerWidth - element.offsetWidth - pad, 
    h = window.innerHeight - element.offsetHeight - pad, refFac = -0.7;
    // new wall collision (doesnt works)
    if (pos.x() > w) { pos.arr[0] = w; vel = phys.reflectVector(vel, 0, 0.7) }
    if (pos.x() < pad) { pos.arr[0] = pad; vel = phys.reflectVector(vel, 180, 0.7) }
    if (pos.y() > h) { pos.arr[1] = h; vel = phys.reflectVector(vel, 90, 0.7) }
    if (pos.y() < pad) { pos.arr[1] = pad; vel = phys.reflectVector(vel, 270, 0.7) }

    // old wall collision (works)
    // if (pos.x() > w) { pos.arr[0] = w; vel.arr[0] *= refFac }
    // if (pos.x() < pad) { pos.arr[0] = pad; vel.arr[0] *= refFac }
    // if (pos.y() > h) { pos.arr[1] = h; vel.arr[1] *= refFac }
    // if (pos.y() < pad) { pos.arr[1] = pad; vel.arr[1] *= refFac }


    let myCol = {
      left: element.offsetLeft,
      right: element.offsetLeft + element.offsetWidth,
      top: element.offsetTop,
      bottom: element.offsetTop + element.offsetHeight
    }

    for (newObj of phys.elements) {
      if (newObj.element == element) {continue}
      let newEl = newObj.element,
      othCol = {
        left: newEl.offsetLeft,
        right: newEl.offsetLeft + newEl.offsetWidth,
        top: newEl.offsetTop,
        bottom: newEl.offsetTop + newEl.offsetHeight
      };
      let whatSide = {
        T: false, B: false, L: false, R: false
      };
      //check each point
      // top left
      if (myCol.left > othCol.left && myCol.left < othCol.right 
        && myCol.top > othCol.top && myCol.top < othCol.bottom) {
          whatSide.T = true; whatSide.L = true;
      }
      // top right
      if (myCol.right > othCol.left && myCol.right < othCol.right 
        && myCol.top > othCol.top && myCol.top < othCol.bottom) {
          whatSide.T = true; whatSide.R = true;
      }
      // bottom left
      if (myCol.left > othCol.left && myCol.left < othCol.right 
        && myCol.bottom > othCol.top && myCol.bottom < othCol.bottom) {
          whatSide.B = true; whatSide.L = true;
      }
      // bottom right
      if (myCol.right > othCol.left && myCol.right < othCol.right 
        && myCol.bottom > othCol.top && myCol.bottom < othCol.bottom) {
          whatSide.B = true; whatSide.R = true;
      }
      //collision is annoying

    }

    return pos, vel
  },
  gTog: () => {
    phys.gravOn = !phys.gravOn;
  }
}

// Input Pos Listeners
document.addEventListener('mousemove', (event) => {
	phys.mousePos.arr = [event.pageX, event.pageY];
});
document.addEventListener('touchmove', (event) => {
  updateTouchPos();
});
function updateTouchPos() {
  phys.mousePos.arr = [event.touches[0].clientX, event.touches[0].clientY];
}
window.onmousedown = function() { phys.mouseDown = true }
window.onmouseup = function() { phys.mouseDown = false; drag.grabbed =[] }
document.addEventListener('touchstart', (event) => { phys.mouseDown = true; updateTouchPos();});
document.addEventListener('touchend', (event) => { phys.mouseDown = false; drag.grabbed =[] });

const drag = {
  grabbed: [],
  isGrabbed: (obj) => {
    for (x of drag.grabbed) {
      if (obj == x) { return true }
    }
    return false
  }
}
