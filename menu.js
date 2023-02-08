

document.getElementById("user").placeholder = sessionStorage.getItem("user") || "Entrez votre pseudonyme";
document.getElementById("user").value = sessionStorage.getItem("user") ;
const submitBtn = document.querySelector("#jouer");
const gameModes = document.querySelector(".game-modes");

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var user = document.getElementById("user").value;
  if (user == ""){
    alert("Veuillez entrer un pseudonyme");
  }else{
    gameModes.classList.remove("hidden");
    sessionStorage.setItem("user", user);
  }
});


      


const buttonEasy = document.getElementById("easy-mode");
const buttonMedium = document.getElementById("medium-mode");
const buttonHard = document.getElementById("hard-mode");

buttonEasy.addEventListener("click", function(){
  sessionStorage.setItem("difficulty", buttonEasy.value);
});

buttonMedium.addEventListener("click", function(){
  sessionStorage.setItem("difficulty", buttonMedium.value);
});

buttonHard.addEventListener("click", function(){
  sessionStorage.setItem("difficulty", buttonHard.value);
});




/*
var user = sessionStorage.getItem("user");
var score = localStorage.getItem("score");
var userscore = JSON.parse(localStorage.getItem("userscore")) || [];
userscore.push({ user: user, score: score });
localStorage.setItem("userscore", JSON.stringify(userscore));
console.log(localStorage.getItem("userscore"));

var list = document.querySelector("ul");

userscore.forEach(function(entry) {
  var item = document.createElement("li");
  item.innerHTML = entry.user + ": " + entry.score;
  list.appendChild(item);
});
*/


function updateScoreList() {
    var best = JSON.parse(localStorage.getItem("bestScores")) || {};

    var scores = [];
    for (username in best) {
        scores.push({ username: username, score: best[username] });
    }

    scores.sort(function (a, b) {
        return b.score - a.score;
    });

    var list = document.querySelector("ul");
    list.innerHTML = "";

    scores.forEach(function (entry) {
        var item = document.createElement("li");
        item.innerHTML = entry.username + ": " + entry.score;
        list.appendChild(item);
    });
}

updateScoreList();






