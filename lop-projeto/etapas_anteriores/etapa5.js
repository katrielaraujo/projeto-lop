/*componentes do grupo:
aluno: Carlos antônio barbosa nunes - turma: B
aluno: 
*/

var recEsV = [];
var recEsLar = [];
var recEsAlt = [];
var recPoEs = [];
var recEsX = [];
var recDiV = [];
var recDiLar = [];
var recDiAlt = [];
var recPoDi = [];
var recDiX = [];
var recEsContato = [];
var recDiContato = [];
var plat_Es = false;
var plat_Di = false;
var left_Side = true;
var right_Side = true;
var personagemCorR = 150;
var personagemCorG = 150;
var personagemCorB = 150;
var pontos = 0;
var personagemX = (300 / 2) - 10;
var personagemY = 340;
var morte = false;
var gravity = 0;
var gravity_Control = true;
var fase = 0;
var dificuldadeF = false,
  dificuldadeN = true,
  dificuldadeD = false;
var ang = 0;

function setup() {
  primeira_Fase = createCanvas(300, 500);


  for (h = 0; h < 7; h++) {
    recEsX[h] = -parseInt(1);
    recDiX[h] = parseInt(1);
    recEsLar[h] = parseInt(random(50, (width / 2) - 50));
    recEsAlt[h] = parseInt(random(70, 100));
    recPoEs[h] = -parseInt((h + 1) * 160);

    recDiLar[h] = parseInt(-random(50, (width / 2) - 50));
    recDiAlt[h] = parseInt(random(70, 100));
    recPoDi[h] = -parseInt((h + 1) * 185);
    recEsContato[h] = false;
    recDiContato[h] = false;

  }
}

function draw() {
  //Codigo de morte
  if (morte === true) {
    background(200, 100, 100, 200);
    strokeWeight(0);
    textSize(20);
    stroke(255);
    fill(255)
    text('Você morreu!\n       T.T', 95, 130);
    text('\n     click no \n     circulo\n     para \n     tentar \n     dinovo\n         ;)', 95, 150)
    stroke(250);
    strokeWeight(5);
    fill(150, 100, 200, 150);
    rect(70, 100, 160, 330, 20);
    ellipse(150, 365, 70, 70);
    triangle(128, 355, 142, 355, 132, 360)
    curve(132, 455, 132, 355, 167, 355, 167, 455);
    triangle(158, 375, 172, 375, 166, 370)
    curve(132, 255, 132, 375, 167, 375, 167, 255);
    if ((Math.pow((mouseX - 150), 2) + Math.pow((-mouseY + 360), 2)) <= (900)) {
      ang += PI / 45;
      fill(100, 200, 200);
      ellipse(150, 365, 70, 70);
      translate(150, 365);
      rotate(-ang);
      triangle(-22, -10, -8, -10, -18, -5)
      curve(-18, 90, -18, -10, 17, -10, 17, 90);
      triangle(8, 10, 22, 10, 16, 5)
      curve(-18, -90, -18, 10, 17, 10, 17, -90);

      if (mouseIsPressed === true) {
        fase = 2;
        pontos = 0;
        morte = false;
      }
    }
  }
  //função para definir os retangulos da fase, traduza Es como Esquerdo e Di como Direito

  //RECTS do lado Esquerdo
  function recEs(h) {
    fill(255);
    recEsV[h] = rect(recEsX[h], recPoEs[h], recEsLar[h], recEsAlt[h]);
    recPoEs[h] = recPoEs[h] + 2;

    if (recPoEs[h] > height + 300) {
      recEsLar[h] = parseInt(random(50, (width / 2) - 50));
      recEsAlt[h] = parseInt(random(70, 100));
      recPoEs[h] = -parseInt(160);
    }
    if (personagemX < (recEsX[h] + recEsLar[h]) && ((recPoEs[h] + recEsAlt[h]) >= 340 && (recPoEs[h]) <= 360)) {
      personagemX = recEsLar[h] + 2;
      right_Side = false;
      left_Side = true;
      gravity = 0;
      gravity_Control = true;
      plat_Es = true;
      pontos = pontos + 10;
      recEsContato[h] = true;
    } else if ((personagemX < (recEsX[h] + recEsLar[h] + 5)) && (recEsContato[h] === true) && (((recPoEs[h] - 25) > 340) && ((plat_Es) === true))) {
      gravity = -3;
      plat_Es = false;
      recEsContato[h] = false;
    }
  }

  //RECTS do lado Direito
  function recDi(h) {
    fill(255);
    recDiV[h] = rect(width + recDiX[h], recPoDi[h], recDiLar[h], recDiAlt[h]);
    recPoDi[h] = recPoDi[h] + 2;

    if (recPoDi[h] > height + 300) {
      recDiLar[h] = parseInt(-random(30, (width / 2) - 50));
      recDiAlt[h] = parseInt(random(70, 100));
      recPoDi[h] = -parseInt(180);
    }

    if ((personagemX > (recDiX[h] + width + recDiLar[h] - 22)) && (((recPoDi[h] + recDiAlt[h]) >= 340) && ((recPoDi[h]) <= 360))) {
      personagemX = width + recDiLar[h] - 24;
      right_Side = true;
      left_Side = false;
      gravity = 0;
      gravity_Control = true;
      plat_Di = true;
      pontos = pontos + 10;
      recDiContato[h] = true;
    } else if ((personagemX > (recDiX[h] + width + recDiLar[h] - 28)) && (recDiContato === true) && ((recPoDi[h] - 22) > 340) && (plat_Di === true)) {
      gravity = 3;
      plat_Di = false;
      recDiContato[h] = false;
    }

  }
  strokeWeight(1);
  if (fase == 0) {
    strokeWeight(0);
    background(25, 50, 100);
    textSize(40)
    textStyle(BOLDITALIC);
    fill(255);
    gameName = text('Going UP', 60, 50);
    textSize(20);
    textStyle(BOLDITALIC);
    start = text('PRESS START', 85, 350);

    if (mouseY > 325 && mouseY < 355 & mouseX > 75 && mouseX < 230) {

    }

    if (key === 'Enter' || mouseIsPressed === true || touches === true) {
      if (mouseY > 325 && mouseY < 355 & mouseX > 75 && mouseX < 230) {
        fase = 1;
        gameName = null;
        start = null;
      }
    }
  } else if (fase == 1) {
    background(25, 50, 100);
    fill(255);
    stroke(0);
    rect(50, 5, 200, 30);
    textSize(20);
    fill(0);
    stroke(255);
    text('Escolha Seu Cubo', 65, 25);

    strokeWeight(2);

    if (mouseIsPressed === true) {
      if (mouseY > 80 && mouseY < 120) {
        personagemCorR = mouseX
        if (personagemCorR < 25) {
          personagemCorR = 25;
        }
        if (personagemCorR > 275) {
          personagemCorR = 275;
        }
      }
      if (mouseY > 180 && mouseY < 220) {
        personagemCorG = mouseX
        if (personagemCorG < 25) {
          personagemCorG = 25;
        }
        if (personagemCorG > 275) {
          personagemCorG = 275;
        }
      }
      if (mouseY > 280 && mouseY < 320) {
        personagemCorB = mouseX
        if (personagemCorB < 25) {
          personagemCorB = 25;
        }
        if (personagemCorB > 275) {
          personagemCorB = 275;
        }
      }
    }
    //Vermelho
    fill(255, 0, 0);
    stroke(255);
    line(25, 100, 275, 100);
    stroke(0);
    ellipse(personagemCorR, 100, 10, 40)
    //Verde
    fill(0, 255, 0);
    stroke(255);
    line(25, 200, 275, 200);
    stroke(0);
    ellipse(personagemCorG, 200, 10, 40);
    //Azul
    fill(0, 0, 255);
    stroke(255);
    line(25, 300, 275, 300);
    stroke(0);
    ellipse(personagemCorB, 300, 10, 40);
    stroke(0)
    let textFacil = text("Facil", 50, 370);
    let textNormal = text("Normal", 115, 370);
    let textDificil = text("Dificil", 200, 370);


    if ((mouseX > 45 && mouseX < 110 && mouseY > 350 && mouseY < 370) || dificuldadeF === true) {
      fill(0, 250, 100)
      textSize(25)
      textFacil = text("Facil", 50, 370)
    }
    if ((mouseX > 95 && mouseX < 190 && mouseY > 350 && mouseY < 370) || dificuldadeN === true) {
      fill(250, 250, 0)
      textSize(25)
      textNormal = text("Normal", 110, 370);
    }
    if ((mouseX > 188 && mouseX < 350 && mouseY > 350 && mouseY < 370) || dificuldadeD === true) {
      fill(250, 0, 0)
      textSize(25)
      textDificil = text("Dificil", 200, 370)
    }

    fill(personagemCorR - 25, personagemCorG - 25, personagemCorB - 25);
    stroke(0);
    rect(130, 420, 40, 40);
    fill(255)
    triangle(250, 420, 250, 460, 290, 440)
    triangle(50, 420, 50, 460, 10, 440)
    if (mouseIsPressed === true) {
      if (mouseX < 50 && mouseX > 10 && mouseY > 420 & mouseY < 460) {
        fase = 0;
      }
      if (mouseX > 250 && mouseX < 290 && mouseY > 420 && mouseY < 460) {
        fase = 2;
      }
      if (mouseX > 45 && mouseX < 110 && mouseY > 350 && mouseY < 370) {
        dificuldadeD = false;
        dificuldadeN = false;
        dificuldadeF = true
      }
      if ((mouseX > 95 && mouseX < 190 && mouseY > 350 && mouseY < 370)) {
        dificuldadeD = false;
        dificuldadeN = true;
        dificuldadeF = false;
      }
      if ((mouseX > 188 && mouseX < 350 && mouseY > 350 && mouseY < 370)) {
        dificuldadeD = true;
        dificuldadeN = false;
        dificuldadeF = false;
      }
    }
  } else if (fase == 2) {

    //plano de fundo
    background(100, 200, 200);
    textSize(20);
    fill(255);
    text(parseInt(pontos), (width / 2) - 10, 25);

    /*personagem*/
    fill(personagemCorR - 25, personagemCorG - 25, personagemCorB - 25);
    rect(personagemX, personagemY, 20, 20);

    //gravidade
    personagemX = personagemX + gravity;
    if (keyIsPressed === true || mouseIsPressed === true && gravity_Control === true) {
      if ((keyCode === RIGHT_ARROW || mouseIsPressed === true || touches === true) && left_Side === true) {
        gravity = 3;
        gravity_Control = false;
      } //gravidade para >
      if ((keyCode === LEFT_ARROW || mouseIsPressed === true || touches === true) && right_Side === true) {
        gravity = -3;
        gravity_Control = false;
      } //gravidade para <

    }
    //Mudanças de dificuldade
    if (pontos < 50) {


      pontos += (1 / 10);

      //fase 01
      leftLimit = 10;
      rightLimit = width - 10;

      /*limits*/
      //leftlimit
      line(leftLimit, 0, leftLimit, height);
      //rightlimit
      line(rightLimit, 0, rightLimit, height);

      if (personagemX <= leftLimit + 2) {
        personagemX = leftLimit + 4;
        gravity = null;
        right_Side = false;
        left_Side = true;
        gravity_Control = true;
      }

      if (personagemX >= rightLimit - 22) {
        personagemX = rightLimit - 24;
        gravity = null;
        right_Side = true;
        left_Side = false;
        gravity_Control = true;
      }


    } else if (pontos < 100) {

      if (pontos < 150) {
        gravity = 0;
        personagemX = 140;
        pontos += 1 / 15;
      }

      if (personagemX <= leftLimit + 2) {
        personagemX = leftLimit + 4;
        gravity = null;
        right_Side = false;
        left_Side = true;
        gravity_Control = true;
      }
      if (personagemX >= rightLimit - 22) {
        personagemX = rightLimit - 24;
        gravity = null;
        right_Side = true;
        left_Side = false;
        gravity_Control = true;
      }


      recEs(0);
      recEs(1);
      recEs(2);
      recEs(3);
      recEs(4);
      recEs(5);
      recDi(0);
      recDi(1);
      recDi(2);
      recDi(3);
      recDi(4);
    } else if (pontos < 200) {

    }

    /*limits and movement*/


  }
}