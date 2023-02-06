const grille = document.querySelector(".grille");

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


var tableauId = [0,1,2,3,4,5,6,7,8,9,10,11,20,21,22,23,24,25,26,27,28,29,30,31,40,41,42,43,44,45,46,47,48,49,50,51];


const tableauGrille = grille.children;

tableauGrille[230].classList.add("tireur");


/*var newArray = tableauId;
newArray.forEach(element => {
    if(newArray[element].classList == "right_div"){
        tableauId.forEach(element => {
            tableauId[element]+=20;
        });
    }else{
        tableauId.forEach(element => {
            tableauId[element]+=1;
        });
    }
});*/


tableauId.forEach(element => {
    tableauGrille[element].classList.add("alien");
});


