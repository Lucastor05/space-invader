const grille = document.querySelector(".grille");
const tableauGrille = grille.children;

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
        console.log(direction)
        wasOnSide = true;
        
    }else{
        for (let i = 0; i < alien.length; i++) {
            alien[i]+=direction;
            wasOnSide = false
        }
    }

    setAlien(alien, tableauGrille);
}




for (let pas = 1; pas <241; pas++) {

    let newDiv = document.createElement("div");

    if(pas % 20 === 0){
        newDiv.setAttribute("class","right_div");
    }

    if((pas-1) % 20 === 0){
        newDiv.setAttribute("class","left_div");
    }



    grille.appendChild(newDiv);
}




const tableauGrille = grille.children;

tableauGrille[230].classList.add("tireur");






tableauGrille[230].classList.add("tireur");
var alien = [0,1,2,3,4,5,6,7,8,9,10,11,20,21,22,23,24,25,26,27,28,29,30,31,40,41,42,43,44,45,46,47,48,49,50,51];
var direction = 1;
var wasOnSide = true;


setAlien(alien, tableauGrille);


var interval = setInterval(moveAlien, 1000);

































var tableauId = [0,1,2,3,4,5,6,7,8,9,10,11,20,21,22,23,24,25,26,27,28,29,30,31,40,41,42,43,44,45,46,47,48,49,50,51];


const tableauGrille = grille.children;

tableauGrille[230].classList.add("tireur");




tableauId.forEach(element => {
    tableauGrille[element].classList.add("alien");
});

tableauId.forEach(element => {
    tableauGrille[element].classList.add("alien");
});



function whereTireur() {
    for (let i = 160; i < 240; i++) {
        if (tableauGrille[i].classList.contains("tireur")) {
            return i;
        }
    }
}
var positionTireur = whereTireur();

document.addEventListener("keydown",
function moov(event) {
    loose();
    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        if (!tableauGrille[positionTireur].classList.contains("left_div")) {
            moovLeft();
        }
    } else if (event.code === "ArrowRight" || event.code === "KeyD") {
        if (!tableauGrille[positionTireur].classList.contains("right_div")) {
            moovRight();
        }
    }else if ((event.code === "ArrowUp" || event.code === "KeyW") && positionTireur > 180 ) {
            moovUp();        
    }else if ((event.code === "ArrowDown" || event.code === "KeyS") && positionTireur < 219 ) {
            moovDown();
    }else if ((event.code === "Space")) {
        shoot();
    }
});

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
        }
    }, 10);
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

function loose() {
    if (tableauGrille[whereTireur()].classList.contains("alien")) {
        alert("You loose");
        location.reload();
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
        alert("You win");
        location.reload();
    }
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