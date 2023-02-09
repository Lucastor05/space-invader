const grille = document.querySelector(".grille");
const difficulty = parseInt(sessionStorage.getItem("difficulty"));
const tableauGrille = grille.children;
var proba = 0.01;
var vitessShootAlien = 700;
var vitesseCanShoot = 100;
var vitesseAlien = 700;
var reinforcedProba= 0.1;
var min = 179;
var max = 220;
var finito = false;
var score=0;
var blaster = [];
var index = 0;
var nombreVie = 0;
var use3bomba = 3;
var useUltraze = 1;
for (let i = 0; i < 10; i++) {
    blaster[i] = new Audio("ressources/blaster.mp3");
    blaster[i].volume = 0.01;
}

/*FONCTIONS*/

function removeHitAlien(tab, value) {
    for (var i = 0; i < tab.length; i++) {
        if (tab[i] === value) {
          tab.splice(i, 1);
          break;
        }
      }
}

function removeAlien(tableau, grid){
    tableau.forEach(element => {
        grid[element].classList.remove("alien");
    });
}

function setAlien(tableau, grid){
    tableau.forEach(element => {
        grid[element].classList.add("alien");
    });
}

function moveAlien(){
    removeAlien(alien, tableauGrille);

    var isRight = false;
    var isLeft = false;

    alien.forEach(element => {
        if(tableauGrille[element].classList.contains("right_div") && !wasOnSide){
            isRight = true;
        }else if(tableauGrille[element].classList.contains("left_div") && !wasOnSide){
            isLeft = true;
        }
        

        if(!wasOnSide){
            if(element == 220 || element == tableauGrille.length - 1){
                console.log("element : "+element+" |  lenght tab : "+tableauGrille.length)
                showModalLoose(score);
                clearInterval(interval1);
            }
        }

        if(shouldFireLaser()){
            AlienAreShootingBackWTF(element);
        }
    });


    if(isRight || isLeft){
        for (let i = 0; i < alien.length; i++) {
            alien[i]+=20;
        }

        if(isRight){
            direction = -1;
        }else{
            direction = 1;
        }
        wasOnSide = true;
        
    }else{
        for (let i = 0; i < alien.length; i++) {
            alien[i]+=direction;
            wasOnSide = false
        }
    }

    setAlien(alien, tableauGrille);
    loose();
}

function shouldFireLaser() {
    
    let nb = Math.floor(Math.random() * 101);
    return nb < proba;
}

function shouldFireLaser() {
    
    let nb = Math.floor(Math.random() * 101);
    return nb < proba;
}

function whereTireur() {
    for (let i = 160; i < 240; i++) {
        if (tableauGrille[i].classList.contains("tireur")) {
            return i;
        }
    }
}

function boom(positionTireurShoot) {
    var i=0;
    var bimbamboom =setInterval(function () {

        tableauGrille[positionTireurShoot].classList.add("boom");
        if (i == 2) {
            tableauGrille[positionTireurShoot].classList.remove("boom");
            clearInterval(bimbamboom);

        }
        i+=1;
    }, 100);

}
function checkbombeandalien() {
    if(tableauGrille[whereTireur()].classList.contains("alien") || tableauGrille[whereTireur()].classList.contains("boom")){
        loose();
    }
    
}
function loose() {
    if(!finito){
        if (tableauGrille[whereTireur()].classList.contains("alien")) {
            if(nombreVie == 1){
                showModalLoose(score);
                finito = true;
                clearInterval(interval1);
                showModal(score);
            }else{
                nombreVie--;
                score-=10;
                afficheVie()
                tableauGrille[whereTireur()].classList.remove("tireur");
                tableauGrille[230].classList.add("tireur");
                positionTireur = whereTireur();
            }
        }
    }
}

function winMaybe() {
    var win = 0;
    for (let i = 0; i < 240; i++) {
        if (tableauGrille[i].classList.contains("alien")) {
            win+=1;
        }
    }
    if (win == 0) {
      
        finito = true;
        clearInterval(interval1);
        min = -1;
        localStorage.setItem("score", score);
        bestScores();
        showModal(score);
    }
}

function moovLeft() {
    tableauGrille[positionTireur].classList.remove("tireur");
    positionTireur--;
    tableauGrille[positionTireur].classList.add("tireur");
}
function moovRight() {
    tableauGrille[positionTireur].classList.remove("tireur");
    positionTireur++;
    tableauGrille[positionTireur].classList.add("tireur");
}
function moovUp() {
    tableauGrille[positionTireur].classList.remove("tireur");
    positionTireur-=20;
    tableauGrille[positionTireur].classList.add("tireur");
}
function moovDown() {
    tableauGrille[positionTireur].classList.remove("tireur");
    positionTireur+=20;
    tableauGrille[positionTireur].classList.add("tireur");
    
}
function shoot() {
    var positionTireurShoot = positionTireur;
    console.log(positionTireurShoot);
    
    var shoot = setInterval(function () {
        
        tableauGrille[positionTireurShoot].classList.add("laser");
        positionTireurShoot-=20;
        tableauGrille[positionTireurShoot].classList.add("laser");

        tableauGrille[positionTireurShoot+20].classList.remove("laser");
        
        if (positionTireurShoot < 20 && positionTireurShoot >= 0) {
            tableauGrille[positionTireurShoot].classList.remove("laser");
            clearInterval(shoot);
        }

        if (alienHit(positionTireurShoot)) {
            tableauGrille[positionTireurShoot].classList.remove("laser");
            clearInterval(shoot);
            removeHitAlien(alien, positionTireurShoot);
            if(!finito){
                score+=100;
                afficheScore();
            }
        }

        /*if (tableauGrille[positionTireurShoot].classList.contains("laserAlien")) {
            tableauGrille[positionTireurShoot].classList.remove("laserAlien");
            tableauGrille[positionTireurShoot].classList.remove("laser");
            console.log("boom");
            boom(positionTireurShoot);
            clearInterval(shoot);
        }*/

    }, 10);
}

function afficheVie(){
    var coeur1 = document.getElementById("first_heart");
    var coeur2 = document.getElementById("second_heart");
    var coeur3 = document.getElementById("third_heart");

    if(nombreVie == 1){
        coeur2.style.fill = "#333";
        coeur3.style.fill = "#333";
    }else if(nombreVie == 2){
        coeur3.style.fill = "#333";
    }else if(nombreVie == 0){
        coeur1.style.fill = "#333";
        coeur2.style.fill = "#333";
        coeur3.style.fill = "#333";

    }
    
}

function afficheScore(){
    var baliseScore = document.getElementById("scoreH3");
    baliseScore.innerText= "Score :"+score;
}

function AlienAreShootingBackWTF(element) {
    var positionTireurShoot = element;
    var positionShip = positionTireur;
    var shoot = setInterval(function () {
        
        tableauGrille[positionTireurShoot].classList.add("laserAlien");
        positionTireurShoot+=20;
        tableauGrille[positionTireurShoot].classList.add("laserAlien");

        tableauGrille[positionTireurShoot-20].classList.remove("laserAlien");
        
        if (positionTireurShoot > 219 && positionTireurShoot >= 0) {
            tableauGrille[positionTireurShoot].classList.remove("laserAlien");
            clearInterval(shoot);
        }
        if (ShipnHit(positionTireurShoot)) {
            tableauGrille[positionTireurShoot].classList.remove("laserAlien");
            tableauGrille[positionShip].classList.remove("tireur");

            clearInterval(shoot);
            

            

            if(nombreVie == 1){
                showModalLoose(score);
                clearInterval(interval1);
            }else{
                nombreVie--;
                afficheVie();
                tableauGrille[positionTireurShoot].classList.add("tireur");
            }

        }

        

    }, vitessShootAlien);
}

function alienHit(positionTireurShoot) {
    if (tableauGrille[positionTireurShoot].classList.contains("alien")) {
        tableauGrille[positionTireurShoot].classList.remove("alien");
        tableauGrille[positionTireurShoot].classList.remove("laser");
        boom(positionTireurShoot);
        winMaybe();
        return true;
        
    }
}

function ShipnHit(positionTireurShoot) {
    if (tableauGrille[positionTireurShoot].classList.contains("tireur")) {
        tableauGrille[positionTireurShoot].classList.remove("laser");
        boom(positionTireurShoot);
        return true;
    }
}

/*DEBUT JEU*/


for (let pas = 1; pas <241; pas++) {

    let newDiv = document.createElement("div");

    if(pas % 20 === 0){
        newDiv.setAttribute("class","right_div");
    }

    if((pas-1) % 20 === 0){
        newDiv.setAttribute("class","left_div");
    }

    if(pas >= 0 && pas <21){
        newDiv.classList.add("top_div");
    }



    grille.appendChild(newDiv);
}

tableauGrille[230].classList.add("tireur");
var alien = [0,1,2,3,4,5,6,7,8,9,10,11,20,21,22,23,24,25,26,27,28,29,30,31,40,41,42,43,44,45,46,47,48,49,50,51];
var direction = 1;
var wasOnSide = true;
var positionTireur = whereTireur();









if(difficulty == 1){
    proba = 0.5;
    vitesseAlien = 700;
    nombreVie = 1;
    reinforcedProba= 0.1;
}else if(difficulty == 2){
    proba = 2;
    vitesseAlien = 500;
    nombreVie = 2;
    reinforcedProba= 0.1;
}else if(difficulty == 3){
    proba = 5;
    vitesseAlien = 300;
    nombreVie = 3;
    reinforcedProba= 0.1;
}else{
    document.location.href="menu.html"; 
}




afficheVie();
setAlien(alien, tableauGrille);
var interval1 = setInterval(moveAlien, vitesseAlien);
document.addEventListener("keydown",
function moov(event) {
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        if (!tableauGrille[positionTireur].classList.contains("left_div")) {
            moovLeft();
        }
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        if (!tableauGrille[positionTireur].classList.contains("right_div")) {
            moovRight();
        }
    }else if ((event.code === "ArrowUp" || event.code === "KeyW") && positionTireur > min ) {
        if (!tableauGrille[positionTireur].classList.contains("top_div")) {
            moovUp();  
        }
        
    }else if ((event.code === "ArrowDown" || event.code === "KeyS") && positionTireur < max) {
        moovDown();
    }else if ((event.code === "Space")) {
        blaster[index].currentTime = 0;
        blaster[index].play();
        shoot();
        index = (index + 1) % 5;
        if(!finito){
            score-=10;
            afficheScore();
        }
    }else if ((event.code === "KeyB")) {
        setCapacite();
        if(!finito){
            score-=10;
            afficheScore();
        }
    }else if ((event.code === "KeyV")) {
        raze();
        if(!finito){
            score-=10;
            afficheScore();
        }
    }
    checkbombeandalien();
});


function bestScores(){
    var username = sessionStorage.getItem("user");
    var score = parseInt(localStorage.getItem("score"));
    var bestScores = JSON.parse(localStorage.getItem("bestScores")) || {};
    if (!bestScores[username] || score > bestScores[username]) {
    bestScores[username] = score;
    }
    localStorage.setItem("bestScores", JSON.stringify(bestScores));
}

function setCapacite(){
    var bombabomm = sessionStorage.getItem("3bomba");
    if(bombabomm == sessionStorage.getItem("user") && use3bomba>0){
        
        var positionTireurShoot = whereTireur();
        if (tableauGrille[positionTireurShoot].classList.contains("right_div")) {
            
        }else if (tableauGrille[positionTireurShoot].classList.contains("left_div")) {
            
        }else{

        
        var shoote = setInterval(function () {
            tableauGrille[positionTireurShoot].classList.add("bomba");
            tableauGrille[positionTireurShoot-1].classList.add("bomba");
            tableauGrille[positionTireurShoot+1].classList.add("bomba");
            positionTireurShoot-=20;
            tableauGrille[positionTireurShoot].classList.add("bomba");
            tableauGrille[positionTireurShoot-1].classList.add("bomba");
            tableauGrille[positionTireurShoot+1].classList.add("bomba");

            tableauGrille[positionTireurShoot+20].classList.remove("bomba");
            tableauGrille[positionTireurShoot+21].classList.remove("bomba");
            tableauGrille[positionTireurShoot+19].classList.remove("bomba");

            
            if (positionTireurShoot < 20 && positionTireurShoot >= 0) {
                tableauGrille[positionTireurShoot].classList.remove("bomba");
                tableauGrille[positionTireurShoot+1].classList.remove("bomba");
                tableauGrille[positionTireurShoot-1].classList.remove("bomba");
                clearInterval(shoote);
            }

            if (alienHit3Bomba(positionTireurShoot)||alienHit3Bomba(positionTireurShoot+1)||alienHit3Bomba(positionTireurShoot-1)) {
                tableauGrille[positionTireurShoot].classList.remove("bomba");
                tableauGrille[positionTireurShoot+1].classList.remove("bomba");
                tableauGrille[positionTireurShoot-1].classList.remove("bomba");

                clearInterval(shoote);
                removeHitAlien(alien, positionTireurShoot-1);
                removeHitAlien(alien, positionTireurShoot+1);
                removeHitAlien(alien, positionTireurShoot);

              

                if(!finito){
                    score+=300;
                    afficheScore();
                }
            }
            
        }, 100);
    }
}
use3bomba--;
}

function alienHit3Bomba(positionTireurShoot) {
    if (tableauGrille[positionTireurShoot].classList.contains("alien")) {
        if (tableauGrille[positionTireurShoot].classList.contains("alien") && tableauGrille[positionTireurShoot+1].classList.contains("alien") && tableauGrille[positionTireurShoot-1].classList.contains("alien")){
            boom3boomba(positionTireurShoot);
            boom3boomba(positionTireurShoot+1);
            boom3boomba(positionTireurShoot-1);
        }else if (tableauGrille[positionTireurShoot].classList.contains("alien") && tableauGrille[positionTireurShoot+1].classList.contains("alien")) {
            boom3boomba(positionTireurShoot);
            boom3boomba(positionTireurShoot+1);
        }else if (tableauGrille[positionTireurShoot].classList.contains("alien") && tableauGrille[positionTireurShoot-1].classList.contains("alien")) {
            boom3boomba(positionTireurShoot);
            boom3boomba(positionTireurShoot-1);
        }
  
        tableauGrille[positionTireurShoot].classList.remove("bomba");
        tableauGrille[positionTireurShoot-1].classList.remove("bomba");
        tableauGrille[positionTireurShoot+1].classList.remove("bomba");
        tableauGrille[positionTireurShoot].classList.remove("alien");
        tableauGrille[positionTireurShoot-1].classList.remove("alien");
        tableauGrille[positionTireurShoot+1].classList.remove("alien");

     
        winMaybe();
        return true;
        
    }
}
    
function boom3boomba(positionTireurShoot) {
    var i=0;
    var bimbamboom =setInterval(function () {

        tableauGrille[positionTireurShoot].classList.add("boom3bomba");
        if (i == 2) {
            tableauGrille[positionTireurShoot].classList.remove("boom3bomba");
            clearInterval(bimbamboom);

        }
        i+=1;
    }, 100);

}





var modal = document.getElementById("myModalWin");
var modalLoose = document.getElementById("myModalLoose");

var scoree = document.getElementById("final-score");
var scoreLoose = document.getElementById("final-scoreLoose");

var replayButton = document.getElementById("replay-button");
var quitButton = document.getElementById("quit-button");
var replayButtonLoose = document.getElementById("replay-buttonLoose");
var quitButtonLoose = document.getElementById("quit-buttonLoose");

function showModal(score) {
  modal.style.display = "block";
  scoree.innerHTML =score;
}

function showModalLoose(score) {
    modalLoose.style.display = "block";
    scoreLoose.innerHTML =score;
    console.log(scoreLoose.innerHTML);

  }

function hideModal() {
  modal.style.display = "none";
  modalLoose.style.display = "none";
}

replayButton.onclick = function() {
  hideModal();
  window.location.reload()
  // code to restart the game
};

quitButton.onclick = function() {
  hideModal();
document.location.href="menu.html";
  // code to quit the game
};

replayButtonLoose.onclick = function() {
    hideModal();
    window.location.reload()
    // code to restart the game
  };
  
  quitButtonLoose.onclick = function() {
    hideModal();
  document.location.href="menu.html";
    // code to quit the game
  };












function raze(){
    var ultraze = sessionStorage.getItem("ultraze");
    if(ultraze == sessionStorage.getItem("user") && use3bomba>0){
        
        
        tableauGrille[whereTireur()].classList.remove("tireur");
        tableauGrille[230].classList.add("tireur");
        positionTireur = 230;
        var positionTireurRaze= 230;
        var lazerRaze = whereTireur();

        positionTireurRaze-=20;
        lazerRaze-=20;
        tableauGrille[positionTireurRaze].classList.add("canonRaze");
        for (var i = 1; i <= 10; i++) {
            tableauGrille[positionTireurRaze-i].classList.add("canonRaze");
        }
        for (var i = 1; i <= 9; i++) {
            tableauGrille[positionTireurRaze+i].classList.add("canonRaze");
        }
        var shoote = setInterval(function () {

            
            tableauGrille[lazerRaze].classList.add("laserRaze");
            for (var i = 1; i <= 10; i++) {
                tableauGrille[lazerRaze-i].classList.add("laserRaze");
            }
            for (var i = 1; i <= 9; i++) {
                tableauGrille[lazerRaze+i].classList.add("laserRaze");
            }

            lazerRaze-=20;
            tableauGrille[lazerRaze].classList.add("laserRaze");
            for (var i = 1; i <= 10; i++) {
                tableauGrille[lazerRaze-i].classList.add("laserRaze");
            }
            for (var i = 1; i <= 9; i++) {
                tableauGrille[lazerRaze+i].classList.add("laserRaze");
            }
            
            tableauGrille[lazerRaze+20].classList.remove("laserRaze");
            for (var i = 1; i <= 10; i++) {
                tableauGrille[lazerRaze+20-i].classList.remove("laserRaze");
            }
            for (var i = 1; i <= 9; i++) {
                tableauGrille[lazerRaze+20+i].classList.remove("laserRaze");
            }






            
            if (lazerRaze < 20 && lazerRaze >= 0) {
            tableauGrille[lazerRaze].classList.remove("laserRaze");

                for (var i = 1; i <= 10; i++) {
                    tableauGrille[lazerRaze-i].classList.remove("laserRaze");
                }
                for (var i = 1; i <= 9; i++) {
                    tableauGrille[lazerRaze+i].classList.remove("laserRaze");
                }
                clearInterval(shoote);
            }
            for (var i = 1; i <= 10; i++) {
                for (var j = 1; j <= 9; j++) {

                if (alienHitRaze(lazerRaze-i) || alienHitRaze(lazerRaze) || alienHitRaze(lazerRaze+j)) {

                    tableauGrille[lazerRaze].classList.remove("laserRaze");
                    for (var h = 1; h <= 10; h++) {
                        tableauGrille[lazerRaze-h].classList.remove("laserRaze");
                    }
                    for (var g = 1; g <= 9; g++) {
                        tableauGrille[lazerRaze+g].classList.remove("laserRaze");
                    }
                    
                    clearInterval(shoote);
                    removeHitAlien(alien, lazerRaze);
                    removeHitAlien(alien, lazerRaze-i);
                    removeHitAlien(alien, lazerRaze+j);
                

                    if(!finito){
                        score+=300;
                        afficheScore();
                    }
                    
                    tableauGrille[positionTireurRaze].classList.remove("canonRaze");
                    for (var u = 1; u <= 10; u++) {
                        tableauGrille[positionTireurRaze-u].classList.remove("canonRaze");
                    }
                    for (var l = 1; l <= 9; l++) {
                        tableauGrille[positionTireurRaze+l].classList.remove("canonRaze");
                    }

                }
            }
        }
            
        }, 100);

    }
    
useUltraze--;
    
}



function alienHitRaze(positionTireurShoot) {
    if (tableauGrille[positionTireurShoot].classList.contains("alien")) {
        boomraze(positionTireurShoot);

        tableauGrille[positionTireurShoot].classList.remove("boomraze");
       
        tableauGrille[positionTireurShoot].classList.remove("alien");
       
     
        winMaybe();
        return true;
        
    }
}
    
function boomraze(positionTireurShoot) {
    var i=0;
    var bimbamboom =setInterval(function () {

        tableauGrille[positionTireurShoot].classList.add("boomraze");
        if (i == 2) {
            tableauGrille[positionTireurShoot].classList.remove("boomraze");
            clearInterval(bimbamboom);

        }
        i+=1;
    }, 100);

}


/*setInterval(function () {
const divs = document.querySelectorAll('div');
var g = 0;
while (g<240) {
    
    for (let i = 0; i < 240; i++) {
    if (divs[i].classList.contains('alien')) {
        divs[i+1].classList.add("alien");
        console.log(i+1);
        divs[i].classList.remove('alien');
        console.log(i);
    }
}
g+=1;
}
}, 1000);*/