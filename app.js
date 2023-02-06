const gridContainer = document.querySelector('.grille');

for (let i = 0; i < 20; i++) {
    var rr =0;
  const gridRow = document.createElement('div');
  gridRow.innerHTML = rr;
  rr+=1;

  
  for (let j = 0; j < 12; j++) {
    const gridItem = document.createElement('div');
    gridItem.innerHTML = rr;
    gridRow.appendChild(gridItem);
  }
  
  gridContainer.appendChild(gridRow);
  
}
