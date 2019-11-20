/*componentes do grupo:
aluno: Carlos antônio barbosa nunes - turma: B
aluno: 
*/

let recEs = []
let recEsLar = []
let recEsAlt = []
let recPoEs = []
let recDi = []
let recDiLar = []
let recDiAlt = []
let recPoDi = []
var gravity_Control = true;
var plat_Es = false;
var plat_Di = false;
var left_Side = false;
var right_Side = false;
x = (300 / 2) - 10;
gravity = -0.5;
y_obj = 0;

function setup() {
  let primeira_Fase = createCanvas(200, 400);
  //let segunda_fase = createCanvas (400, 200);
  //background(100,220,255);
  //let terceira_Fase = create canvas (200,400);
  //background(200,220,255);

  platEs_Tam = random(0, 150);
  platEs_X = 70
  platDi_X = width - 60
  platDi_Tam = random(0, 150);

  for (h = 0; h < 7; h++) {
    recEsLar[h] = random(30, (width / 2) - 30);
    recEsAlt[h] = random(70, 100);
    recPoEs[h] = -((h + 1) * 60);
    recDiLar[h] = -random(30, (width / 2) - 30);
    recDiAlt[h] = random(70, 100);
    recPoDi[h] = -((h + 1) * 100);
  }

}

function draw() {

  //plano de fundo
  background(100, 200, 200);

  function recEs(h) {
    recEs[h] = rect(0, recPoEs[h], recEsLar[h], recEsAlt[h]);
    recPoEs[h] = recPoEs[h] + 1;

    //projeto para contato com o rect
    if (x <= (recEsLar[h]) && ((recPoEs[h] + recEsAlt[h]) >= 340 && (recPoEs[h]) <= 360)) {
      x = platEs_X + 4;
      right_Side = false;
      left_Side = true;
      gravity = null;
      gravity_Control = true;
      plat_Es = true;
    } else if (x <= (platEs_X + 5) && (-122 + platEs_Tam) > 340 && plat_Es === true) {
      gravity = -3;
      plat_Es = false;
    }
  }

  function recDi(h) {
    recDi[h] = rect(width, recPoDi[h], recDiLar[h], recDiAlt[h]);
    recPoDi[h] = recPoDi[h] + 1;
  }
  recEs(0)
  recEs(1)
  recDi(0)
  recDi(1)

  /*character*/
  stroke(20, 150, 200)
  fill(20, 100, 200);
  rect(x, 340, 20, 20);


  //fase 01
  leftLimit = 30;
  rightLimit = width - 30;

  /*limits of level 1*/
  //leftlimit
  stroke(0, 50, 150);
  strokeWeight(4);
  line(leftLimit, 0, leftLimit, height);
  //rightlimit
  stroke(0, 50, 150);
  strokeWeight(4);
  line(rightLimit, 0, rightLimit, height);

  //projeto de objetos
  /*obstaculo 01
  y_obj = y_obj +1 
  stroke(250,30,50);
  strokeWeight(4);
  line(rightLimit-30,y_obj,rightLimit,y_obj);
  */
  /*plataforma*/
  /*movimento da plataforma*/
  platEs_Tam = platEs_Tam + 0.5;
  platDi_Tam = platDi_Tam + 0.5;
  //plataforma esquerda
  stroke(20, 200, 150);
  strokeWeight(4);
  line(platEs_X, -100 + platEs_Tam, platEs_X, platEs_Tam);
  //plataforma direita
  stroke(20, 200, 150);
  strokeWeight(4);
  line(platDi_X, -100 + platDi_Tam, platDi_X, platDi_Tam);

  //codigo de contato com a plataforma esquerda
  if (x <= (platEs_X) && (platEs_Tam >= 340 && (-100 + platEs_Tam) <= 360)) {
    x = platEs_X + 4;
    right_Side = false;
    left_Side = true;
    gravity = null;
    gravity_Control = true;
    plat_Es = true;
  } else if (x <= (platEs_X + 5) && (-122 + platEs_Tam) > 340 && plat_Es === true) {
    gravity = -3;
    plat_Es = false;
  }
  //codigo de contato com a plataforma direita
  if (x >= (platDi_X - 23) && (platDi_Tam >= 340 && (-100 + platDi_Tam) <= 360)) {
    x = platDi_X - 24;
    right_Side = true;
    left_Side = false;
    gravity = null;
    gravity_Control = true;
    plat_Di = true;
  } else if (x >= (platDi_X - 28) && (-122 + platDi_Tam) > 340 && plat_Di === true) {
    gravity = 3;
    plat_Di = false;
  }


  //gravidade
  x = x + gravity
  if (keyIsPressed === true && gravity_Control === true) {
    if (left_Side === true) {
      gravity = 3
    } //gravidade para >
    if (right_Side === true) {
      gravity = -3
    } //gravidade para <
    gravity_Control = false;
  }
  /*limits and movement*/
  if (x <= leftLimit + 2) {
    x = leftLimit + 4;
    gravity = null;
    right_Side = false;
    left_Side = true;
    gravity_Control = true;
  }

  if (x >= rightLimit - 22) {
    x = rightLimit - 24;
    gravity = null;
    right_Side = true;
    left_Side = false;
    gravity_Control = true;
  }

}