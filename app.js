const grille = document.querySelector(".grille");


for (let pas = 0; pas <240; pas++) {

    let newDiv = document.createElement("div");

    if(pas % 20 === 0){
        newDiv.setAttribute("id","left_div");
    }

    if((pas+1) % 20 === 0){
        newDiv.setAttribute("id","right_div");
    }

    grille.appendChild(newDiv);
}



