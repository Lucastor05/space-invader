const grille = document.querySelector(".grille");
let positionTireur = 230;

for (let pas = 0; pas < 240; pas++) {
  let newDiv = document.createElement("div");
  if (pas % 20 === 0) {
    newDiv.setAttribute("class", "left_div");
  }

  if ((pas + 1) % 20 === 0) {
    newDiv.setAttribute("class", "right_div");
  }

  if (pas === positionTireur) {
    newDiv.classList.add("tireur");
  }

  newDiv.setAttribute("id", pas);

  grille.appendChild(newDiv);
}
const tireur = document.querySelector(".tireur");

document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowLeft" && positionTireur > 0) {
    tireur.classList.remove("tireur");
    positionTireur--;
    document.getElementById(positionTireur).classList.add("tireur");

  } else if (event.code === "ArrowRight" && positionTireur < 239) {
    tireur.classList.remove("tireur");
    positionTireur++;
    document.getElementById(positionTireur).classList.add("tireur");
  }
});



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