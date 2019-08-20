document.addEventListener('DOMContentLoaded', loadTable);

function loadTable() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getAirlines()"};
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
  setTimeout(function() {populateAirlineDropdown();}, 300);
  setTimeout(function() {populateCountryDropdown();}, 600);
  setTimeout(function() {searchButtonOverride();}, 1000);
  setTimeout(function() {searchSubmitOverride();}, 1000);
}

function populateAirlineDropdown() {
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

function renderTable(airlines) {
  var source = $("#airline-table-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airline : airlines
  };
  $("#airlinesTable").html(template(data));
}

function renderAirlineDropdown(airlines) {
  var source = $("#airline-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airline : airlines
  };
  $("#airlinesDropdown").html(template(data));
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
  document.getElementById('airlineSearchButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredText = document.getElementById('airlineSearchBox').value;
    var call = "searchAirlines('" + enteredText + "')";
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
  document.getElementById('airlineSearchBox').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      var req = new XMLHttpRequest();
      var enteredText = document.getElementById('airlineSearchBox').value;
      var call = "searchAirlines('" + enteredText + "')";
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

function selectAirline() {
  var req = new XMLHttpRequest();
  var enteredText = document.getElementById('airline-dropdown').value;
  var call = "selectAirline('" + enteredText + "')";
  if (enteredText == "") call = "getAirlines()";
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

function addAirline() {
  var enteredName = document.getElementById('newAirlineName').value;
  var enteredCode = document.getElementById('newAirlineCode').value;
  var enteredCountry = document.getElementById('country-dropdown').value;

  if(enteredName == "") {
    alert("You need to enter the airline name!");
  } else if (enteredCode == "") {
    alert("You need to enter the airline code!");
  } else if (enteredCountry == "") {
    alert("You need to select a country!");
  } else {
      var req = new XMLHttpRequest();
      var call = "insertAirline('" + enteredCode.toUpperCase() + "', '" + capitalize(enteredName) + "', '" + enteredCountry + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        var response = JSON.parse(req.responseText);
        if (response.errno) {
          alert("Airline code is already in the database and cannot be added again:\n\n" + response.sqlMessage);
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
  var payload = {"call": "getAirlines()"};
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
  setTimeout(function() {populateAirlineDropdown();}, 300);
}

function deleteAirline(airline) {
  var req = new XMLHttpRequest();
  var call = "deleteAirline('" + airline + "')";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    var response = JSON.parse(req.responseText);
    if (response.errno) {
      alert("Airline could not be deleted due to being referenced in the table mentioned right before 'CONSTRAINT' in the error message below:\n\n" + response.sqlMessage);
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
