//vatiables
const submitBtn = document.querySelector("#bouton3bomba");
const btn1 = document.getElementById("acheterTripleTir");
const noPoints1 = document.getElementById("noPointsTripleTir");
const btn2 = document.getElementById("acheterLigneUlt");
const noPoints2 = document.getElementById("noPointsLigneUlt");
const userName = sessionStorage.getItem("user");
const bombaStorage = sessionStorage.getItem("3bomba");
const razeStorage = sessionStorage.getItem("ultraze");

//fonction pour verifier si l'utilisateur a assez de points pour acheter une 3bombe
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
  
    var bestscore = JSON.parse(localStorage.getItem("bestScores")) || {};
    var user = sessionStorage.getItem("user");
    var score =0;
    for (username in bestscore) {   
        if (username == user) {
            score = bestscore[username];
        }
    }
    if (parseInt(score) > 2500) {
        sessionStorage.setItem("3bomba", user);
        btn1.style.display = "block";
    }else{
        noPoints1.style.display = "block";
    }
  });



//fonction pour verifier si l'utilisateur a assez de points pour acheter une bombe raze
const ultraze = document.querySelector("#ultraze");
ultraze.addEventListener("click", function(event) {
event.preventDefault();

var bestscore = JSON.parse(localStorage.getItem("bestScores")) || {};
var user = sessionStorage.getItem("user");
var score =0;
for (username in bestscore) {   
    if (username == user) {
        score = bestscore[username];
    }
}
if (parseInt(score) > 3000) {
    sessionStorage.setItem("ultraze", user);
    btn2.style.display = "block";
    
}else{
    noPoints2.style.display = "block";}
});
    
//fonction pour afficher les points de l'utilisateur
const scoreMarket = document.getElementById("scoreMarketP");

var bestscore = JSON.parse(localStorage.getItem("bestScores")) || {};
var user = sessionStorage.getItem("user");
var score =0;
for (username in bestscore) {   
    if (username == user) {
        score = bestscore[username];
    }
}
scoreMarket.innerText = "Vos points : "+score;




if(razeStorage === userName){
    btn2.style.display = "flex";
}

if(bombaStorage === userName){
    btn1.style.display = "flex";
}

