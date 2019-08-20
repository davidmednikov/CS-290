document.addEventListener('DOMContentLoaded', loadTable);

function loadTable() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getAirports()"};
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
  setTimeout(function() {populateAirportDropdown();}, 300);
  setTimeout(function() {populateCountryDropdown();}, 600);
  setTimeout(function() {searchButtonOverride();}, 1000);
  setTimeout(function() {searchSubmitOverride();}, 1000);
}

function populateAirportDropdown() {
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
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function populateCountryDropdown() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getCountryDropdown()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderCountryDropdown(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function renderTable(airports) {
  var source = $("#airport-table-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#airportsTable").html(template(data));
}

function renderAirportDropdown(airports) {
  var source = $("#airport-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#airportsDropdown").html(template(data));
}

function renderCountryDropdown(countries) {
  var source = $("#country-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    country : countries
  };
  $("#countriesDropdown").html(template(data));
}

function searchButtonOverride() {
  document.getElementById('airportSearchButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredText = document.getElementById('airportSearchBox').value;
    var call = "searchAirports('" + enteredText + "')";
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
  document.getElementById('airportSearchBox').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      var req = new XMLHttpRequest();
      var enteredText = document.getElementById('airportSearchBox').value;
      var call = "searchAirports('" + enteredText + "')";
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

function selectAirport() {
  var req = new XMLHttpRequest();
  var enteredText = document.getElementById('airport-dropdown').value;
  var call = "selectAirport('" + enteredText + "')";
  if (enteredText == "") call = "getAirports()";
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

function addAirport() {
  var enteredName = document.getElementById('newAirportName').value;
  var enteredCode = document.getElementById('newAirportCode').value;
  var enteredCity = document.getElementById('newAirportCity').value;
  var enteredCountry = document.getElementById('country-dropdown').value;

  if(enteredName == "") {
    alert("You need to enter the airport name!");
  } else if (enteredCode == "") {
    alert("You need to enter the airport code!");
  } else if (enteredCity == "") {
    alert("You need to enter the city!");
  } else if (enteredCountry == "") {
    alert("You need to select a country!");
  } else {
      var req = new XMLHttpRequest();
      var call = "insertAirport('" + enteredCode.toUpperCase() + "', '" + capitalize(enteredName) + "', '" + capitalize(enteredCity) + "', '" + enteredCountry + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        var response = JSON.parse(req.responseText);
        if (response.errno) {
          alert("Airport code is already in the database and cannot be added again:\n\n" + response.sqlMessage);
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
  var payload = {"call": "getAirports()"};
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
  setTimeout(function() {populateAirportDropdown();}, 300);
}

function deleteAirport(airport) {
  var req = new XMLHttpRequest();
  var call = "deleteAirport('" + airport + "')";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    var response = JSON.parse(req.responseText);
    if (response.errno) {
      alert("Airport could not be deleted due to being referenced in the table mentioned right before 'CONSTRAINT' in the error message below:\n\n" + response.sqlMessage);
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

function updateAirport(airport) {
  createTextboxInTable(airport);
  createDropdownInTable(airport);
  getUpdateDropdown();
  var getButton = "update(" + airport + ")";
  var saveButton = document.getElementById(getButton);
  saveButton.textContent = "Save";
  saveButton.id = "saveUpdateButton";
  saveButton.setAttribute("onclick", "saveUpdateAirport('" + airport + "')");
}

function createTextboxInTable(airport) {
  var nameCell = document.getElementById("editText" + airport);
  var airportName = nameCell.textContent;
  nameCell.textContent = "";
  var textBoxDiv = document.createElement("div");
  textBoxDiv.className = "updateDiv";
  var textBox = document.createElement("input");
  textBox.id = "updateAirportName";
  textBox.className = "updateTextbox";
  textBox.value = airportName;
  textBoxDiv.appendChild(textBox);
  nameCell.appendChild(textBoxDiv);
}

function createDropdownInTable(airport) {
  var countryCell = document.getElementById("editCountry" + airport);
  var currentCountry = countryCell.textContent;
  countryCell.textContent = "";
  var dropDownDiv = document.createElement("div");
  dropDownDiv.className = "updateDiv";
  var dropdown = document.createElement("select");
  dropdown.id = "updateCountryDropdown";
  dropdown.className = "updateDropdown";
  dropDownDiv.appendChild(dropdown);
  countryCell.appendChild(dropDownDiv);
}

function saveUpdateAirport(airport) {
  var dropdown = document.getElementById('updateCountryDropdown');
  if (dropdown.selectedIndex != 0) {
    alert("This one-to-many relationship cannot be changed. Set the country dropdown back to \"Don't change me\".");
  }
  else {
      var nameCell = document.getElementById("updateAirportName");
      var airportName = nameCell.value;
      var req = new XMLHttpRequest();
      var call = "updateAirport('" + airport + "', '" + airportName + "')";
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
  var payload = {"call": "getCountryDropdown()"};
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

function renderUpdateDropdown(countries) {
  var source = $("#update-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    country : countries
  };
  $("#updateCountryDropdown").html(template(data));
}
