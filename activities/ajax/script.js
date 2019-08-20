document.addEventListener('DOMContentLoaded', weatherButtonOverride);
document.addEventListener('DOMContentLoaded', postButtonOverride);

function weatherButtonOverride() {
  document.getElementById('weatherSubmitButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredZip = document.getElementById('zipBox').value;
    var enteredCity = document.getElementById('cityBox').value;
    var enteredCountry = document.getElementById('countryBox').value;
    var url = null;
    if(enteredZip != null && enteredZip != "") {
      url = "http://api.openweathermap.org/data/2.5/weather?zip=" + enteredZip + "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
    } else if (enteredCountry != null && enteredCountry != ""){
      url = "http://api.openweathermap.org/data/2.5/weather?q=" + enteredCity + "," + enteredCountry + "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
    } else {
      url = "http://api.openweathermap.org/data/2.5/weather?q=" + enteredCity + "&appid=fa7d80c48643dfadde2cced1b1be6ca1";
    }
    req.open("GET", url, true);
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        document.getElementById('returnedCity').textContent = response.name;
        var weatherStuff = response.main;
        document.getElementById('returnedTemp').textContent = weatherStuff.temp;
        document.getElementById('returnedHumidity').textContent = weatherStuff.humidity;
      } else {
        console.log("There was a network error: " + req.status + ' ' + req.statusText);
      }
    });
    req.send(null);
    event.preventDefault();
  });
}

function postButtonOverride() {
  document.getElementById('postSubmitButton').addEventListener('click', function (event) {
    var req = new XMLHttpRequest();
    var enteredText = document.getElementById('postTextBox').value;
    var payload = {args: null};
    payload.args = enteredText;
    var url = "http://httpbin.org/post"
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        document.getElementById('returnedFromHttpBin').textContent = response.json.args;
      } else {
        console.log("There was a network error: " + req.status + ' ' + req.statusText);
      }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
}
