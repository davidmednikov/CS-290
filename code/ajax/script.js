document.addEventListener('DOMContentLoaded', loadTable);

function loadTable() {
  var req = new XMLHttpRequest();
  var url = "http://flip3.engr.oregonstate.edu:45678/"
  req.open("GET", url, true);
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderTable(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(null);
}

function renderTable(exercises) {
  var source = $("#exercise-table-template").html();
  var template = Handlebars.compile(source);
  var data = {
    exercise : exercises
  };
  $("#exerciseTable").html(template(data));
}

function addExercise() {
  var enteredName = document.getElementById('newExerciseName').value;
  var enteredReps = document.getElementById('newExerciseReps').value;
  var enteredWeight = document.getElementById('newExerciseWeight').value;
  var enteredDate = document.getElementById('newExerciseDate').value;
  var enteredUnits = document.getElementById('newExerciseUnit').value;

  if(enteredName == "") {
    alert("You need to enter the exercise name!");
  } else if (enteredReps == "") {
    alert("You need to enter the number of reps!");
  } else if (enteredWeight == "") {
    alert("You need to enter the weight!");
  } else if (enteredDate == "") {
    alert("You need to enter the date!");
  } else if (enteredUnits == "") {
    alert("You need to select a unit of measurement!");
  } else {
      var req = new XMLHttpRequest();
      var call = "insertExercise('" + capitalize(enteredName) + "', " + enteredReps + ", " + enteredWeight + ", '" + enteredDate + "', " + enteredUnits + ")";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:45678/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        var response = JSON.parse(req.responseText);
        if (response.errno) {
          alert(response.sqlMessage);
        }
        else if (req.status >= 200 && req.status < 400) {
          loadTableAfterAdd();
        } else {
            console.log("There was a network error: " + req.status + ' ' + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
  }
}

function loadTableAfterAdd() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getExercises()"};
  var url = "http://flip3.engr.oregonstate.edu:45678/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderTable(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function deleteExercise(exercise) {
  var req = new XMLHttpRequest();
  var call = "deleteExercise(" + exercise + ")";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:45678/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    var response = JSON.parse(req.responseText);
    if (response.errno) {
      alert(response.sqlMessage);
    }
    else if (req.status >= 200 && req.status < 400) {
      loadTableAfterAdd();
    } else {
        console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateExercise(exercise) {
  editName(exercise);
  editReps(exercise);
  editWeight(exercise);
  editDate(exercise);
  editUnits(exercise);
  var getButton = "update(" + exercise + ")";
  var saveButton = document.getElementById(getButton);
  saveButton.textContent = "Save";
  saveButton.id = "saveUpdateButton";
  saveButton.setAttribute("onclick", "saveUpdate(" + exercise + ")");
}

function editName(exercise) {
  var nameCell = document.getElementById("editName" + exercise);
  var name = nameCell.textContent;
  nameCell.textContent = "";
  var textBoxDiv = document.createElement("div");
  textBoxDiv.className = "updateDiv";
  var textBox = document.createElement("input");
  textBox.id = "newName" + exercise;
  textBox.className = "updateTextbox";
  textBox.value = name;
  textBoxDiv.appendChild(textBox);
  nameCell.appendChild(textBoxDiv);
}

function editReps(exercise) {
  var repsCell = document.getElementById("editReps" + exercise);
  var reps = repsCell.textContent;
  repsCell.textContent = "";
  var textBoxDiv = document.createElement("div");
  textBoxDiv.className = "updateDiv";
  var textBox = document.createElement("input");
  textBox.id = "newReps" + exercise;
  textBox.setAttribute("type", "number");
  textBox.className = "updateNumInput";
  textBox.value = reps;
  textBoxDiv.appendChild(textBox);
  repsCell.appendChild(textBoxDiv);
}

function editWeight(exercise) {
  var weightCell = document.getElementById("editWeight" + exercise);
  var weight = weightCell.textContent;
  weightCell.textContent = "";
  var textBoxDiv = document.createElement("div");
  textBoxDiv.className = "updateDiv";
  var textBox = document.createElement("input");
  textBox.id = "newWeight" + exercise;
  textBox.setAttribute("type", "number");
  textBox.className = "updateNumInput";
  textBox.value = weight;
  textBoxDiv.appendChild(textBox);
  weightCell.appendChild(textBoxDiv);
}

function editDate(exercise) {
  var dateCell = document.getElementById("editDate" + exercise);
  var date = dateCell.textContent;
  var dateArray = date.split("/");
  var newDate = dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1];
  dateCell.textContent = "";
  var textBoxDiv = document.createElement("div");
  textBoxDiv.className = "updateDiv";
  var textBox = document.createElement("input");
  textBox.id = "newDate" + exercise;
  textBox.setAttribute("type", "date");
  textBox.className = "updateTextbox";
  textBox.value = newDate;
  textBoxDiv.appendChild(textBox);
  dateCell.appendChild(textBoxDiv);
}

function editUnits(exercise) {
  var unitCell = document.getElementById("editUnits" + exercise);
  var units = unitCell.textContent;
  unitCell.textContent = "";
  var dropdownDiv = document.createElement("div");
  dropdownDiv.className = "updateDiv";
  var dropdown = document.createElement("select");
  dropdown.id = "newUnits" + exercise;
  dropdown.className = "updateDropdown";
  var pounds = document.createElement("option");
  pounds.value = 0;
  pounds.textContent = "Pounds";
  var kilos = document.createElement("option");
  kilos.value = 1;
  kilos.textContent = "Kilograms ☭";
  dropdown.appendChild(pounds);
  dropdown.appendChild(kilos);
  if (units == "Lbs") {
    dropdown.selectedIndex = 0;
  }
  else {
    dropdown.selectedIndex = 1;
  }
  dropdownDiv.appendChild(dropdown);
  unitCell.appendChild(dropdownDiv);
}

function saveUpdate(exercise) {
  var enteredName = document.getElementById('newName' + exercise).value;
  var enteredReps = document.getElementById('newReps' + exercise).value;
  var enteredWeight = document.getElementById('newWeight' + exercise).value;
  var enteredDate = document.getElementById('newDate' + exercise).value;
  var enteredUnits = document.getElementById('newUnits' + exercise).value;

  if(enteredName == "") {
    alert("You need to enter the exercise name!");
  } else if (enteredReps == "") {
    alert("You need to enter the number of reps!");
  } else if (enteredWeight == "") {
    alert("You need to enter the weight!");
  } else if (enteredDate == "") {
    alert("You need to enter the date!");
  } else {
      var req = new XMLHttpRequest();
      var call = "updateExercise(" + exercise + ", '" + capitalize(enteredName) + "', " + enteredReps + ", " + enteredWeight + ", '" + enteredDate + "', " + enteredUnits + ")";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:45678/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        var response = JSON.parse(req.responseText);
        if (response.errno) {
          alert(response.sqlMessage);
        }
        else if (req.status >= 200 && req.status < 400) {
          loadTableAfterAdd();
        } else {
            console.log("There was a network error: " + req.status + ' ' + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
  }
}
