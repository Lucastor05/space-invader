const submitBtn = document.querySelector("#bouton3bomba");

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
    }else{
        alert("Vous n'avez pas assez de points pour acheter cette bombe");
    }
  });


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
      }else{
          alert("Vous n'avez pas assez de points pour acheter cette bombe");
      }
    });
    
  
  

