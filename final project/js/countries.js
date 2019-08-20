document.addEventListener('DOMContentLoaded', loadTable);
document.addEventListener('DOMContentLoaded', searchButtonOverride);
document.addEventListener('DOMContentLoaded', searchSubmitOverride);

function loadTable() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getCountries()"};
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
  setTimeout(function() {populateCountryDropdown();}, 500);
  setTimeout(function() {searchButtonOverride();}, 700);
  setTimeout(function() {searchSubmitOverride();}, 800);
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
      renderDropdown(response);
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}

function renderTable(countries) {
  var source = $("#country-table-template").html();
  var template = Handlebars.compile(source);
  var data = {
    country : countries
  };
  $("#countriesTable").html(template(data));
}

function renderDropdown(countries) {
  var source = $("#country-dropdown-template").html();
  var template = Handlebars.compile(source);
  var data = {
    country : countries
  };
  $("#countriesDropdown").html(template(data));
}

function searchButtonOverride() {
  document.getElementById('countrySearchButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredText = document.getElementById('countrySearchBox').value;
    var call = "searchCountries('" + enteredText + "')";
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
  document.getElementById('countrySearchBox').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      var req = new XMLHttpRequest();
      var enteredText = document.getElementById('countrySearchBox').value;
      var call = "searchCountries('" + enteredText + "')";
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

function selectCountry() {
  var req = new XMLHttpRequest();
  var enteredText = document.getElementById('country-dropdown').value;
  var call = "selectCountry('" + enteredText + "')";
  if (enteredText == "") call = "getCountries()";
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

function addCountry() {
  var enteredName = document.getElementById('newCountryName').value;
  var enteredCapital = document.getElementById('newCapital').value;

  if(enteredName == "") {
    alert("You need to enter the country name!");
  } else if (enteredCapital == "") {
    alert("You need to enter the capital!");
  } else {
      var req = new XMLHttpRequest();
      var call = "insertCountry('" + capitalize(enteredName) + "', '" + capitalize(enteredCapital) + "')";
      var payload = {"call": call};
      var url = "http://flip3.engr.oregonstate.edu:24818/"
      req.open("POST", url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        var response = JSON.parse(req.responseText);
        if (response.errno) {
          alert("Country already exists in database and cannot be added again:\n\n" + response.sqlMessage);
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
  var payload = {"call": "getCountries()"};
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
  setTimeout(function() {populateCountryDropdown();}, 300);
}

function deleteCountry(country) {
  var req = new XMLHttpRequest();
  var call = "deleteCountry('" + country + "')";
  var payload = {"call": call};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    var response = JSON.parse(req.responseText);
    if (response.errno) {
      alert("Country could not be deleted due to being referenced in the table mentioned right before 'CONSTRAINT' in the error message below:\n\n" + response.sqlMessage);
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
