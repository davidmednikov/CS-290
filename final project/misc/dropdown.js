function populateCountryDropdown() {
  var req = new XMLHttpRequest();
  var payload = {"call": "getCountryDropdown()"};
  var url = "http://flip3.engr.oregonstate.edu:24818/"
  req.open("POST", url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      //document.getElementById('returnedFromHttpBin').textContent = response.json.args;
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
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
      //document.getElementById('returnedFromHttpBin').textContent = response.json.args;
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
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
      //document.getElementById('returnedFromHttpBin').textContent = response.json.args;
    } else {
      console.log("There was a network error: " + req.status + ' ' + req.statusText);
    }
  });
  req.send(JSON.stringify(payload));
}
