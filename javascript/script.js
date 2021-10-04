let box = [];
let maxDistance;
let spacer;
let dimensions = 0;
let currentX = -1;
let currentY = -1;
let selectionX = -1;
let selectionY = -1;

function setup() {
  blocks = 3;
  dimensions = blocks * 3;
  spacer = 60;
  size = dimensions * spacer;
  height = size;
  width = size;
  createCanvas(size + spacer * 2, size);
  for (let x = 0; x < dimensions; x++) {
    box[x] = []; // create nested array
    for (let y = 0; y < dimensions; y++) {
      box[x][y] = 0;
    }
  }
  background(255);
  for (let x = 0; x <= dimensions; x += 1) {
    stroke(0);
    if (x % 3 == 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    line(x * spacer, 0, x * spacer, height);
  }
  for (let y = 0; y <= dimensions; y += 1) {
    stroke(0);
    if (y % 3 == 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    line(0, y * spacer, dimensions * spacer, y * spacer);
  }
  rect((dimensions + 1) * spacer, 0, spacer, dimensions * spacer);
  for (let y = 1; y < dimensions; y += 1) {
    stroke(1);
    line(
      (dimensions + 1) * spacer,
      y * spacer,
      (dimensions + 2) * spacer,
      y * spacer
    );
  }
  generate_soduku();
  remove_values(30);
  noLoop(); // Run once and stop
}

function generate_soduku() {
  for (let x = 0; x < dimensions; x++) {
    for (let y = 0; y < dimensions; y++) {
      
      shifter = int(y / 3);
      newX = x - ((y * 3 + shifter) % dimensions);
      if (newX < 0) {
        newX = dimensions + newX;
      }
      box[newX][y] = x + 1;
    }
  }
  
  for (block = 0; block < 3; block++) {
    for (let y = 0; y < 100; y++) {
      swapA = int(random(3));
      swapB = int(random(3));

      tempV = box[swapA + block * 3];
      box[swapA + block * 3] = box[swapB + block * 3];
      box[swapB + block * 3] = tempV;
    }
  }
}

function get_available(x, y) {
  let temp_array = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  for (newx = 0; newx < dimensions; newx++) {
    if (box[newx][y] > 0) {
      temp_array[box[newx][y]] = 0;
    }
  }
  for (newy = 0; newy < dimensions; newy++) {
    if (box[x][newy] > 0) {
      temp_array[box[x][newy]] = 0;
    }
  }
  blockX = int(x / 3) * 3;
  blockY = int(x / 3) * 3;

  for (bx = blockX; bx < blockX + 3; bx++) {
    for (by = blockY; by < blockY + 3; by++) {
      if (box[x][newy] > 0) {
        temp_array[box[bx][by]] = 0;
      }
    }
  }

  let ret_array = [];

  for (x = 1; x <= dimensions; x++) {
    if (temp_array[x] > 0) {
      ret_array.push(x);
    }
  }

  return ret_array;
}


function remove_values(values) {
  for(x=0;x<values;x++) {
       a = int(random(dimensions));
       b = int(random(dimensions));     
       box[a][b]=0;
    
  }
}

function draw() {
  for (x = 0; x < dimensions; x++) {
    for (y = 0; y < dimensions; y++) {
      if (x == currentX && y == currentY) {
        stroke(23, 255, 23);
      } else {
        stroke(255);
      }
      rect(x * spacer + 5, y * spacer + 5, spacer - 10, spacer - 10);
      stroke(0);
      strokeWeight(1);
      if (box[x][y] > 0) {
        text(box[x][y], x * spacer + spacer / 2, y * spacer + spacer / 2);
      }
    }
  }
  for (y = 0; y < dimensions; y++) {
    if (y == selectionY) {
      stroke(255, 23, 23);
    } else {
      stroke(255);
    }
    rect(
      dimensions * spacer + spacer + 5,
      y * spacer + 5,
      spacer - 10,
      spacer - 10
    );
    stroke(0);
    strokeWeight(1);
    text(
      y + 1,
      dimensions * spacer + spacer + spacer / 2,
      y * spacer + spacer / 2
    );
  }
}

function mousePressed() {
  clickedX = int(mouseX / spacer);
  clickedY = int(mouseY / spacer);

  if (clickedX < dimensions) {
    currentX = clickedX;
    currentY = clickedY;
    selectionX = -1;
    selectionY = -1;
    print(get_available(currentX, currentY));
  }

  if (clickedX == dimensions + 1) {
    selectionX = clickedX;
    selectionY = clickedY;
    box[currentX][currentY] = selectionY + 1;
  }

  draw();
}

    
    
    
