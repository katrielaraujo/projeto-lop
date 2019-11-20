function setup() {
  createCanvas(200, 400);
}
x = 90;
gravity_Control = 1;
gravity = 2;

function draw() {
  background(220);
  /*character*/
  stroke(20, 150, 200)
  fill(20, 100, 200);
  rect(x, 340, 20, 20);
  //fase
  leftLimit = width - 170;
  rightLimit = width - 30;
  /*limits of the level*/
  //Leftlimit
  stroke(0, 50, 150);
  strokeWeight(4);
  line(leftLimit, 0, leftLimit, height);
  //Rightlimit
  stroke(0, 50, 150);
  strokeWeight(4);
  line(rightLimit, 0, rightLimit, height);
  //gravidade
  x = x + gravity
  if (keyIsPressed === true && gravity_Control === 1) {
    gravity = -gravity;
  }

  /*limits*/
  if (x <= leftLimit + 3) {
    x = leftLimit + 3;
  }
  if (x >= rightLimit - 23) {
    x = rightLimit - 23;
  }
  if (x > leftLimit + 30 && x < rightLimit - 30) {
    gravity_Control = 0;
  } else {
    gravity_Control = 1;
  }
}