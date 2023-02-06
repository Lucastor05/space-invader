const grille = document.querySelector(".grille");


for (let pas = 0; pas <240; pas++) {

    let newDiv = document.createElement("div");

    if(pas % 20 === 0){
        newDiv.setAttribute("class","left_div");
    }

    if((pas+1) % 20 === 0){
        newDiv.setAttribute("class","right_div");
    }

    if(pas === 230){
        newDiv.classList.add("tireur");
    }

    newDiv.setAttribute("id",pas);
    
    grille.appendChild(newDiv);
}



