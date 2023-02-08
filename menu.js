document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    var user = document.getElementById("user").value;
    sessionStorage.setItem("user", user);
    
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






