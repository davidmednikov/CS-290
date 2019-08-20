<h1>Mountains</h1>

<div id="mountains"></div>

<script>
  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];

function buildTable(data) {
  var newTable = document.createElement("table");

  var newHeaderRow = document.createElement("tr");
  var columns = Object.keys(data[0]);

  columns.forEach(function(column) {
  	var newHeaderCell = document.createElement("th");
    newHeaderCell.textContent = column;
    newHeaderRow.appendChild(newHeaderCell);
  });

  newTable.appendChild(newHeaderRow);

  data.forEach(function(mountain) {
    var newRow = document.createElement("tr");
    columns.forEach(function(property) {
      var newCell = document.createElement("td");
      newCell.textContent = mountain[property];
      if (typeof mountain[property] == "number") {
      	newCell.style.textAlign = "right";
      }
      newRow.appendChild(newCell);
    });

    newTable.appendChild(newRow);
    });

  return newTable;

}

document.getElementById('mountains').appendChild(buildTable(MOUNTAINS));

</script>
