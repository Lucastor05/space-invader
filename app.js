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




tableauGrille[230].classList.add("tireur");
var alien = [0,1,2,3,4,5,6,7,8,9,10,11,20,21,22,23,24,25,26,27,28,29,30,31,40,41,42,43,44,45,46,47,48,49,50,51];
var direction = 1;
var wasOnSide = true;


setAlien(alien, tableauGrille);


var interval = setInterval(moveAlien, 1000);



































