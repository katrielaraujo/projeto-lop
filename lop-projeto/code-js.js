/*componentes do grupo:
aluno: Carlos antônio barbosa nunes - turma: B
aluno: Katriel Albuquerque Galvão de Araújo - turma: B
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
var personagemY = 390;
var xMonstro = [];
var yMonstro = [];
var monstro = [];
var correcao = [];
var morte = false;
var gravity = 0;
var gravity_Control = true;
var fase = 0;
var dificuldadeF = false,
  dificuldadeN = true,
  dificuldadeD = false;
var ang = 0;
let song;
let img = [];
var fundo, fundo2, fundo3;
var pontosMaior = 0;
var personagemGif;
var monstroGif = [];

function preload() {

  song = loadSound('images/musica.mp3');

  personagemGif = loadImage('images/GifP.gif');

  fundo = loadImage('images/fundo.jpg');
  fundo2 = loadImage('images/fundo2.jpg');
  fundo3 = loadImage('images/fundo3.jpg');


}

function setup() {
  primeira_Fase = createCanvas(300, 500);
  song.play();
  song.loop();


  for (h = 0; h < 16; h++) {
    recEsX[h] = -parseInt(1);
    recDiX[h] = parseInt(1);
    recEsLar[h] = parseInt(random(50, (width / 2) - 50));
    recEsAlt[h] = parseInt(random(30, 600));
    recPoEs[h] = -parseInt((h + 1) * 160);

    recDiLar[h] = parseInt(-random(50, (width / 2) - 50));
    recDiAlt[h] = parseInt(random(30, 60));
    recPoDi[h] = -parseInt((h + 1) * 185);
    recEsContato[h] = false;
    recDiContato[h] = false;

    xMonstro[h] = random(0, 300);
    yMonstro[h] = random(-100, -200);
    correcao[h] = random(150);

    monstroGif[h] = loadImage('images/GifM.gif');

  }
}

function draw() {
  //Codigo de morte
  if (morte === true || fase == -1) {
    image(fundo, 0, 0);

    strokeWeight(0);
    textSize(20);

    stroke(250);
    strokeWeight(5);
    fill(0, 100, 200, 150);
    rect(70, 200, 160, 230, 20);
    ellipse(150, 365, 70, 70);
    triangle(128, 355, 142, 355, 132, 360)
    curve(132, 455, 132, 355, 167, 355, 167, 455);
    triangle(158, 375, 172, 375, 166, 370)
    curve(132, 255, 132, 375, 167, 375, 167, 255);
    fill(0);
    strokeWeight(10);
    text('Game OVER', 95, 250)
    strokeWeight(10);
    if (pontosMaior < pontos) {
      pontosMaior = parseInt(pontos);
    }
    textSize(20);
    text('Score: ' + pontosMaior, 115, 300);
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

      if (mouseIsPressed === true || keyIsPressed === true) {
        for (h = 0; h < 5; h++) {
          yMonstro[h] = 0;
        }

        fase = 2;
        pontos = pontos * 0.1;
        morte = false;
        personagemX = 140;
        personagemY = 340;
        gravity = 0;
        gravity_Control = true;
        left_Side = true;
        right_Side = true;

      }
    }
  }

  //função que define os monstros

  function mons(h) {
    if (dificuldadeF === false && fase === 2) {


      correcao[h] = correcao[h] + 0.005;
      xMonstro[h] = cos(-personagemX * 0.002) * width * noise(correcao[h])
      yMonstro[h] = yMonstro[h] + 1 * sin(personagemX) * random() * (h + 1);
      fill(255, 20, 20);
      monstro[h] = ellipse(xMonstro[h], yMonstro[h], 20, 20);

      imageMode(CENTER);
      image(monstroGif[h], xMonstro[h], yMonstro[h]);

      if (Math.pow(((personagemX + 10) - xMonstro[h]), 2) + Math.pow(((-personagemY - 10) + yMonstro[h]), 2) <= 600) {
        morte = true;
        fase = -1;
      }
      if (yMonstro[h] > 500) {
        yMonstro[h] = -30;
        xMonstro[h] = random(20, 150);
        correcao[h] = 150;
      }
    }
  }
  //função para definir os retangulos da fase, traduza Es como Esquerdo e Di como Direito

  //RECTS do lado Esquerdo
  function recEs(h) {
    if (fase === 2) {
      fill(0, 200, 40);
      recEsV[h] = rect(recEsX[h], recPoEs[h], recEsLar[h], recEsAlt[h]);
      recPoEs[h] = recPoEs[h] + 2;

      if (dificuldadeD === true && pontos % 30 === 0) {
        recEsX[h] += -20;
        personagemX += -20;
      }

      if (recPoEs[h] > height + 300) {
        recEsLar[h] = parseInt(random(50, (width / 2) - 50));
        recEsAlt[h] = parseInt(random(30, 60));
        recPoEs[h] = -parseInt(160);
        recEsX[h] = 0;
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
  }

  //RECTS do lado Direito
  function recDi(h) {
    if (fase === 2) {
      fill(0, 200, 50);
      recDiV[h] = rect(width + recDiX[h], recPoDi[h], recDiLar[h], recDiAlt[h]);
      recPoDi[h] = recPoDi[h] + 2;

      if (dificuldadeD === true && pontos % 30 === 0) {
        recDiX[h] += 20;
        personagemX += 20;
      }


      if (recPoDi[h] > height + 300) {
        recDiLar[h] = parseInt(-random(30, (width / 2) - 50));
        recDiAlt[h] = parseInt(random(30, 60));
        recPoDi[h] = -parseInt(180);
        recDiX[h] = 0;
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

      } else if ((personagemX > (recDiX[h] + width + recDiLar[h] - 28)) && (recDiContato === true) && ((recPoDi[h] - 25) > 340) && (plat_Di === true)) {
        gravity = 3;
        plat_Di = false;
        recDiContato[h] = false;
      }
    }
  }
  strokeWeight(1);
  if (fase == 0) {

    imageMode(CORNER);
    image(fundo, 0, 0);


    strokeWeight(0);
    textSize(40)
    textStyle(BOLDITALIC);
    fill(255);
    gameName = text('Going UP', 60, 50);
    textSize(20);
    textStyle(BOLDITALIC);
    start = text('PRESS START', 85, 370);

    let textFacil = text("Facil", 50, 430);
    let textNormal = text("Normal", 115, 430);
    let textDificil = text("Dificil", 200, 430);


    if ((mouseX > 45 && mouseX < 110 && mouseY > 410 && mouseY < 440) || dificuldadeF === true) {
      fill(0, 250, 100)
      textSize(25)
      textFacil = text("Facil", 50, 430)
    }
    if ((mouseX > 95 && mouseX < 190 && mouseY > 410 && mouseY < 440) || dificuldadeN === true) {
      fill(250, 250, 0)
      textSize(25)
      textNormal = text("Normal", 110, 430);
    }
    if ((mouseX > 188 && mouseX < 350 && mouseY > 410 && mouseY < 440) || dificuldadeD === true) {
      fill(250, 0, 0)
      textSize(25)
      textDificil = text("Dificil", 200, 430)
    }

    if (mouseIsPressed === true) {
      if (mouseX > 45 && mouseX < 110 && mouseY > 410 && mouseY < 440) {
        dificuldadeD = false;
        dificuldadeN = false;
        dificuldadeF = true
      }
      if ((mouseX > 95 && mouseX < 190 && mouseY > 410 && mouseY < 440)) {
        dificuldadeD = false;
        dificuldadeN = true;
        dificuldadeF = false;
      }
      if ((mouseX > 188 && mouseX < 350 && mouseY > 410 && mouseY < 440)) {
        dificuldadeD = true;
        dificuldadeN = false;
        dificuldadeF = false;

      }
    }
    if (key === 'Enter' || mouseIsPressed === true || touches === true) {
      if (mouseY > 340 && mouseY < 380 & mouseX > 75 && mouseX < 230) {
        fase = 2;
        gameName = null;
        start = null;
      }
    }
  }
  /* else if (fase == 1) {
      
      imageMode(CORNER);
      image(fundo2,0,0);
      fill(255);
      stroke(0);
      rect(50, 5, 200, 30);
      textSize(15);
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
    } */
  else if (fase == 2) {

    //plano de fundo
    imageMode(CORNER);
    image(fundo3, 0, 0);

    //gravidade
    personagemX = personagemX + gravity;
    if (keyIsPressed === true && gravity_Control === true) {
      if ((keyIsDown(RIGHT_ARROW) || mouseIsPressed === true || touches === true) && left_Side === true) {
        gravity = 5;
        gravity_Control = false;
      } //gravidade para >
      if ((keyIsDown(LEFT_ARROW) || mouseIsPressed === true || touches === true) && right_Side === true) {
        gravity = -5;
        gravity_Control = false;
      } //gravidade para <

    }
    //Mudanças de dificuldade


    textSize(20);
    fill(255);
    pontos += 1 / 30;

    text(parseInt(pontos), (width / 2) - 10, 50);

    /*personagem*/
    fill(personagemCorR - 25, personagemCorG - 25, personagemCorB - 25);

    imageMode(CENTER);
    image(personagemGif, personagemX + 15, personagemY + 15);

    pontos += (1 / 15);
    if (dificuldadeF === false) {
      mons(0);
      mons(1);
      mons(2);
    }

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

    if (pontos > 120 && pontos < 300 || dificuldadeF === true) {
      left_Side = true;
      right_Side = true;
      gravity_Control = true;
      mons(0);
      mons(1);
      recDi(5);
      recEs(2);
      recDi(3);

    } else if (pontos > 300 || dificuldadeN === true) {
      mons(0);
      mons(1);
      mons(2);
      mons(3)
      if (pontos > 500) {
        mons(4);
        mons(5);
        recEs(2);
        recDi(3);
      }
    }
    if (dificuldadeD === true) {
      left_Side = true;
      right_Side = true;
      gravity_Control = true;
      mons(0);
      mons(1);
      mons(2);
      mons(3);

      if (pontos > 100 && pontos < 500) {
        mons(0);
        mons(1);
        mons(2);
        mons(3);
        mons(4);
        recEs(0);
        recEs(2);
        recEs(4);
        recDi(0);
        recDi(2);
        recDi(4);
      } else if (pontos > 500) {
        mons(0);
        mons(1);
        mons(2);
        mons(3);
        mons(4);
        mons(5);
        mons(6);

        recEs(0);
        recEs(2);
        recEs(4);
        recDi(0);
        recDi(2);
        recDi(4);
      }
    }

  }
}