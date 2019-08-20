function buildTable() {
  var table = document.createElement("table");
  var headerRow = document.createElement("tr");

  for (var i = 1; i < 5; i++) {
    var headerCell = document.createElement("th");
    headerCell.textContent = "Header " + i;
    headerCell.style.border = "thin solid black";
    headerRow.appendChild(headerCell);
  }

  table.appendChild(headerRow);

  for (var row = 1; row < 4; row++) {
    var tableRow = document.createElement("tr");
    var rowId = "row" + row;
    tableRow.setAttribute("class", rowId);
    for (var col = 1; col < 5; col++) {
      var cell = document.createElement("td");
      var colId = "col" + col;
      cell.setAttribute("class", colId);
      cell.textContent = col + ", " + row;
      cell.style.border = "thin solid black";
      tableRow.appendChild(cell);
    }
    table.appendChild(tableRow);
  }

  table.style.border = "thin solid black";
  table.style.borderCollapse = "collapse";
  document.body.appendChild(table);
}

function turnYellow() {
  var cell = document.getElementById("currentCell");
  cell.style.backgroundColor = "yellow";
}

function goLeft() {
  var cell = document.getElementById("currentCell");

  if(cell.className != "col1"){
    removeBorder();
    cell.setAttribute("id", "");
    cell.previousElementSibling.setAttribute("id", "currentCell");
    addBorder();
  }
}

function goUp() {
  var cell = document.getElementById("currentCell");
  var row = cell.parentNode;

  if(row.className != "row1"){
    removeBorder();
    cell.setAttribute("id", "");
    var col = cell.className;
    row = row.previousElementSibling;
    row.getElementsByClassName(col)[0].setAttribute("id", "currentCell");
    addBorder();
  }
}

function goDown() {
  var cell = document.getElementById("currentCell");
  var row = cell.parentNode;

  if(row.className != "row3"){
    removeBorder();
    cell.setAttribute("id", "");
    var col = cell.className;
    row = row.nextElementSibling;
    row.getElementsByClassName(col)[0].setAttribute("id", "currentCell");
    addBorder();
  }
}

function goRight() {
  var cell = document.getElementById("currentCell");

  if(cell.className != "col4"){
    removeBorder();
    cell.setAttribute("id", "");
    cell.nextElementSibling.setAttribute("id", "currentCell");
    addBorder();
  }
}

function removeBorder() {
  var cell = document.getElementById("currentCell");
  cell.style.border = "thin solid black";
}

function addBorder() {
  var cell = document.getElementById("currentCell");
  cell.style.border = "medium solid black";
}

function buildDirectionalButtonsTable() {
  var table = document.createElement("table");

  // Create first row of D-Pad
  var firstRow = document.createElement("tr");

  var cell1 = document.createElement("td");
  firstRow.appendChild(cell1);

  var cell2 = document.createElement("td");
  var upButton = document.createElement("button");
  upButton.textContent = "Up";
  upButton.setAttribute("id", "upButton");
  cell2.appendChild(upButton);
  cell2.style.textAlign = "center";
  firstRow.appendChild(cell2);

  var cell3 = document.createElement("td");
  firstRow.appendChild(cell3);

  table.appendChild(firstRow);

  // Create second row of D-Pad
  var secondRow = document.createElement("tr");

  var cell4 = document.createElement("td");
  var leftButton = document.createElement("button");
  leftButton.textContent = "Left";
  leftButton.setAttribute("id", "leftButton");
  cell4.appendChild(leftButton);
  cell4.style.textAlign = "center";
  secondRow.appendChild(cell4);

  var cell5 = document.createElement("td");
  var markButton = document.createElement("button");
  markButton.innerHTML = "<p>Mark<br />Cell";
  markButton.setAttribute("id", "markButton");
  cell5.appendChild(markButton);
  cell5.style.textAlign = "center";
  secondRow.appendChild(cell5);

  var cell6 = document.createElement("td");
  var rightButton = document.createElement("button");
  rightButton.textContent = "Right";
  rightButton.setAttribute("id", "rightButton");
  cell6.appendChild(rightButton);
  cell6.style.textAlign = "center";
  secondRow.appendChild(cell6);

  table.appendChild(secondRow);

  // Create third row of D-Pad
  var thirdRow = document.createElement("tr");

  var cell7 = document.createElement("td");
  thirdRow.appendChild(cell7);

  var cell8 = document.createElement("td");
  var downButton = document.createElement("button");
  downButton.textContent = "Down";
  downButton.setAttribute("id", "downButton");
  cell8.appendChild(downButton);
  cell8.style.textAlign = "center";
  thirdRow.appendChild(cell8);

  var cell9 = document.createElement("td");
  thirdRow.appendChild(cell9);

  table.appendChild(thirdRow);

  document.body.appendChild(table);
}

buildTable();

buildDirectionalButtonsTable();

var firstRow = document.getElementsByClassName("row1")[0];
firstRow.firstElementChild.setAttribute("id", "currentCell");
addBorder();

document.getElementById("markButton").addEventListener("click", turnYellow);
document.getElementById("upButton").addEventListener("click", goUp);
document.getElementById("leftButton").addEventListener("click", goLeft);
document.getElementById("rightButton").addEventListener("click", goRight);
document.getElementById("downButton").addEventListener("click", goDown);
