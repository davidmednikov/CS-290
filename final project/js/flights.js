document.addEventListener('DOMContentLoaded', loadTable);

function loadTable() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getFlights()"};
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
  setTimeout(function() {populateAirportDropdowns();}, 400);
  setTimeout(function() {populateAirlineDropdowns();}, 600);
  setTimeout(function() {searchButtonOverride();}, 800);
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
      renderAddFlightAirlines(response);
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
      renderOriginDropdown(response);
      renderDestinationDropdown(response);
      renderAddFlightOrigins(response);
      renderAddFlightDestinations(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function renderTable(flights) {
  var source = $("#flight-table-template").html();
  var template = Handlebars.compile(source);
  var data = {
    flight : flights
  };
  $("#flightsTable").html(template(data));
}

function renderAirlineDropdown(airlines) {
  var source = $("#airline-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airline : airlines
  };
  $("#airlinesDropdown").html(template(data));
}

function renderAddFlightAirlines(airlines) {
  var source = $("#add-flight-airline-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airline : airlines
  };
  $("#addFlightAirlines").html(template(data));
}

function renderOriginDropdown(airports) {
  var source = $("#origin-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#originDropdown").html(template(data));
}

function renderDestinationDropdown(airports) {
  var source = $("#destination-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#destinationDropdown").html(template(data));
}

function renderAddFlightOrigins(airports) {
  var source = $("#add-flight-origin-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#addFlightOrigins").html(template(data));
}

function renderAddFlightDestinations(airports) {
  var source = $("#add-flight-destination-template").html();
  var template = Handlebars.compile(source);
  var data = {
    airport : airports
  };
  $("#addFlightDestinations").html(template(data));
}

function searchButtonOverride() {
  document.getElementById('flightSearchButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredText = document.getElementById('flightSearchBox').value;
    var call = "searchFlights('" + enteredText + "')";
    var payload = {"call": call};
    var url = "http://flip3.engr.oregonstate.edu:24818/"
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        console.log(response);
        renderTable(response);
        resetFilters();
      } else {
        console.log("There was a network error: " + req.status + ' ' + req.statusText);
      }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}

function searchSubmitOverride() {
  document.getElementById('flightSearchBox').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      var req = new XMLHttpRequest();
      var enteredText = document.getElementById('flightSearchBox').value;
      var call = "searchFlights('" + enteredText + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
          var response = JSON.parse(req.responseText);
          console.log(response);
          renderTable(response);
          resetFilters();
        } else {
          console.log("There was a network error: " + req.status + ' ' + req.statusText);
        }
      });
      req.send(JSON.stringify(payload));
    }
});
}

function addFlight() {
  var enteredAirline = document.getElementById('add-flight-airline-dropdown').value;
  var enteredFlightNum = document.getElementById('newFlightNumber').value;
  var enteredOrigin = document.getElementById('add-flight-origin-dropdown').value;
  var enteredDestination = document.getElementById('add-flight-destination-dropdown').value;
  var enteredDepartTime = document.getElementById('newFlightDepartTime').value;
  var enteredArriveTime = document.getElementById('newFlightArriveTime').value;
  var enteredFlightTime = document.getElementById('newFlightLength').value;

  if(enteredAirline == "") {
    alert("You need to select an airline!");
  } else if (enteredFlightNum == "") {
    alert("You need to enter the flight number!");
  } else if (enteredOrigin == "") {
    alert("You need to select the departure airport!");
  } else if (enteredDestination == "") {
    alert("You need to select the arrival airport!");
  } else if (enteredDepartTime == "") {
    alert("You need to enter the departure time!");
  } else if (enteredArriveTime == "") {
    alert("You need to enter the arrival time!");
  } else if (enteredFlightTime == "") {
    alert("You need to enter the flight time!");
  } else {
      var req = new XMLHttpRequest();
      var call = "insertFlight('" + enteredAirline + "', '" + enteredFlightNum + "', '" + enteredOrigin + "', '"
        + enteredDestination + "', '" + enteredDepartTime + "', '" + enteredArriveTime + "', '" + enteredFlightTime + "')";
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
  var payload = {"call": "getFlights()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log(response);
      renderTable(response);
      resetFilters();
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function deleteFlight(flight) {
  var req = new XMLHttpRequest();
  var call = "deleteFlight('" + flight + "')";
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

function flightFilter() {
  var selectedAirline = document.getElementById("airline-dropdown").value;
  var selectedOrigin = document.getElementById("origin-dropdown").value;
  var selectedDestination = document.getElementById("destination-dropdown").value;

  if (selectedAirline == "") {
    if (selectedOrigin == "") {
      if (selectedDestination == "" ) {
        sendFilterQuery("getFlights()");
      }
      else {
        sendFilterQuery("filterFlightsByDestination('" + selectedDestination + "')");
      }
    } else {
      if (selectedDestination == "") {
        sendFilterQuery("filterFlightsByOrigin('" + selectedOrigin + "')");
      } else {
        sendFilterQuery("filterFlightsByOriginAndDestination('" + selectedOrigin + "', '" + selectedDestination + "')");
      }
    }
  } else {
    if (selectedOrigin == "") {
      if (selectedDestination == "") {
        sendFilterQuery("filterFlightsByAirline('" + selectedAirline + "')");
      } else {
        sendFilterQuery("filterFlightsByAirlineAndDestination('" + selectedAirline + "', '" + selectedDestination + "')");
      }
    } else {
      if (selectedDestination == "") {
        sendFilterQuery("filterFlightsByAirlineAndOrigin('" + selectedAirline + "', '" + selectedOrigin + "')");
      } else {
        sendFilterQuery("filterFlightsByAirlineAndOriginAndDestination('" + selectedAirline + "', '" + selectedOrigin + "', '" + selectedDestination + "')");
      }
    }
  }
}

function sendFilterQuery(query) {
  var req = new XMLHttpRequest();
  var payload = {"call": query};
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

function resetFilters() {
  var airlineDropdown = document.getElementById("airline-dropdown");
  var originDropdown = document.getElementById("origin-dropdown");
  var destinationDropdown = document.getElementById("destination-dropdown");
  airlineDropdown.selectedIndex = "0";
  originDropdown.selectedIndex = "0";
  destinationDropdown.selectedIndex = "0";
}
