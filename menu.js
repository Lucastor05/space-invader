

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var user = document.getElementById("user").value;
    sessionStorage.setItem("user", user);
    var username = sessionStorage.getItem("user");
    var score = parseInt(localStorage.getItem("score"));
    if (!bestScores[username] || score > bestScores[username]) {
        bestScores[username] = score;
      }
    
      localStorage.setItem("bestScores", JSON.stringify(bestScores));
    
      updateScoreList();
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
    var best = localStorage.getItem("bestScores");
    var list = document.querySelector("ul");
    list.innerHTML = "";
  
    for (var username in best) {
      var item = document.createElement("li");
      item.innerHTML = username + ": " + best[username];
      list.appendChild(item);
    }
  }
  
  var storedScores = JSON.parse(localStorage.getItem("bestScores")) || {};
  bestScores = Object.assign(bestScores, storedScores);
  
  updateScoreList();


var bestScores = {};

