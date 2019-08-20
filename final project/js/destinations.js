document.addEventListener('DOMContentLoaded', loadTable);

function loadTable() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getDestinations()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
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
  setTimeout(function() {populateAirlineDropdowns();}, 500);
  setTimeout(function() {populateAirportDropdowns();}, 700);
  setTimeout(function() {searchButtonOverride();}, 900);
  setTimeout(function() {searchSubmitOverride();}, 1000);
}

function populateAirlineDropdowns() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getAirlineDropdown()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderAirlineDropdown(response);
      renderAddDest_Airlines(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function populateAirportDropdowns() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getAirportDropdown()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderAirportDropdown(response);
      renderAddDest_Airports(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function renderTable(destinations) {
  var source = $("#destination-table-template").html();
  var template = Handlebars.compile(source);
  var data = {
    destination : destinations
  };
  $("#destinationsTable").html(template(data));
}

function renderAirlineDropdown(airlines) {
  var source = $("#airline-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airline : airlines
  };
  $("#airlinesDropdown").html(template(data));
}

function renderAddDest_Airlines(airlines) {
  var source = $("#add-dest-airline-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airline : airlines
  };
  $("#addDestAirlinesDropdown").html(template(data));
}

function renderAirportDropdown(airports) {
  var source = $("#airport-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#airportsDropdown").html(template(data));
}

function renderAddDest_Airports(airports) {
  var source = $("#add-dest-airport-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#addDestAirportsDropdown").html(template(data));
}

function searchButtonOverride() {
  document.getElementById('destinationSearchButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredText = document.getElementById('destinationSearchBox').value;
    var call = "searchDestinations('" + enteredText + "')";
    var payload = {"call": call};
    var url = "http://flip3.engr.oregonstate.edu:24818/"
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
    event.preventDefault();
  });
}

function searchSubmitOverride() {
  document.getElementById('destinationSearchBox').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      var req = new XMLHttpRequest();
      var enteredText = document.getElementById('destinationSearchBox').value;
      var call = "searchDestinations('" + enteredText + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
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
});
}

function selectDestAirline() {
  var req = new XMLHttpRequest();
  var enteredText = document.getElementById('airline-dropdown').value;
  var call = "filterDestinationsByAirline('" + enteredText + "')";
  if (enteredText == "") call = "getDestinations()";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
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

function selectDestAirport() {
  var req = new XMLHttpRequest();
  var enteredText = document.getElementById('airport-dropdown').value;
  var call = "filterDestinationsByAirport('" + enteredText + "')";
  if (enteredText == "") call = "getDestinations()";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
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

function saveDestination() {
  var enteredAirline = document.getElementById('add-dest-airline-dropdown').value;
  var enteredDestnation = document.getElementById('add-dest-airport-dropdown').value;

  if(enteredAirline == "") {
    alert("You need to select an airline!");
  } else if (enteredDestnation == "") {
    alert("You need to select a destination!");
  } else {
      var req = new XMLHttpRequest();
      var call = "insertDestination('" + enteredAirline + "', '" + enteredDestnation + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
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
  var payload = {"call": "getDestinations()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
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

function deleteDestination(destination) {
  var req = new XMLHttpRequest();
  var call = "deleteDestination('" + destination + "')";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
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

function updateDestination(destinationId) {
  var grabId = "pickMe'" + destinationId + "'";
  var destCell = document.getElementById(grabId);
  var selectedAirport = destCell.textContent;
  destCell.textContent = "";
  var dropDownDiv = document.createElement("div");
  dropDownDiv.className = "updateDiv";
  var dropdown = document.createElement("select");
  dropdown.id = "updateDestDropdown";
  dropdown.className = "updateDropdown";
  dropDownDiv.appendChild(dropdown);
  destCell.appendChild(dropDownDiv);
  getUpdateDropdown();
  var getButton = "update(" + destinationId + ")";
  var saveButton = document.getElementById(getButton);
  saveButton.textContent = "Save";
  saveButton.setAttribute("onclick", "saveUpdateDestination('" + destinationId + "')");
}

function saveUpdateDestination(destinationId) {
  var dropdown = document.getElementById('updateDestDropdown');
  if (dropdown.selectedIndex == -1 || dropdown.selectedIndex == 0) {
    alert("You need to select a new destination!");
  }
  else {
      var newDestination = dropdown.value;
      var req = new XMLHttpRequest();
      var call = "updateDestination('" + destinationId + "', '" + newDestination + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
          loadTableAfterAdd();
        } else {
          console.log("There was a network error: " + req.status + ' ' + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
  }
}

function getUpdateDropdown() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getAirportDropdown()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderUpdateDropdown(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function renderUpdateDropdown(airports) {
  var source = $("#update-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#updateDestDropdown").html(template(data));
}
