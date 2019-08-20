var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', 24818);
app.use(bodyParser.json());

app.post('/',function(req,res){
  var query = req.body.function;
  var result = eval(query);
  var response = JSON(stringify(result));
  console.log(response);
  res.json(response);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
});

var mysql = require('mysql');

var con = mysql.createConnection({
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_mednikod',
  password        : '8465',
  database        : 'cs340_mednikod',
  connectTimeout  : 1000000000
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/*
//    view all records
*/

function getCountries() {
  con.query("SELECT * FROM Country", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function getAirports() {
  con.query("SELECT * FROM Airport", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function getAirlines() {
  con.query("SELECT * FROM Airline", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function getFlights() {
  con.query("SELECT * FROM Flight", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function getDestinations() {
  con.query("SELECT * FROM Destination", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

/*
//    insert record
*/

function insertCountry(name, capital) {
  con.query("INSERT INTO Country (name, capital) VALUES ('" + name + "', '" + capital + "')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function insertAirport(code, name, city, country) {
  con.query("INSERT INTO Country (code, name, city, country) VALUES ('" + code + "', '" + name + "', '" + city + "', '" + country + "')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function insertAirline(code, name, country) {
  con.query("INSERT INTO Country (code, name, city, country) VALUES ('" + code + "', '" + name + "', '" + country + "')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function insertFlight(airline, flightNum, origin, destination, departTime, arriveTime, flightTime) {
  con.query("INSERT INTO Flight (airline, flightNum, origin, destination, departTime, arriveTime, flightTime) VALUES " +
  "('" + airlineCode+ "', '" + flightNum+ "', '" + origin+ "', '" + destination+ "', '" + departTime+ "', '" + arriveTime+ "', '" + flightTime+ "')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

/*
//    remove records
*/

function deleteCountry(country) {
  con.query("DELETE FROM Country WHERE name='" + country + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function deleteAirport(airportCode) {
  con.query("DELETE FROM Airport WHERE code='" + airportCode + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function deleteAirline(airlineCode) {
  con.query("DELETE FROM Airline WHERE code='" + airlineCode + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function deleteFlight(airline, flightNum) {
  con.query("DELETE FROM Flight WHERE airline = '" + airlineCode + "' AND flightNum = '" + flightNum + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}


/*
//    associate records
*/

function insertDestination(airline, destination) {
  con.query("INSERT INTO Destination (airline, destination) VALUES ('" + airline + "', '" + destination + "')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function deleteDestination(airline, destination) {
  con.query("DELETE FROM Destination WHERE airline = '" + airline + "' AND destination = '" + destination + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

// Change association of rows between E2 and E3 in many-to-many relationship
function updateDestination(airline, oldDestination, newDestination) {
  con.query("UPDATE Destination SET destination = '" + newDestination + "' WHERE airline = '" + airline + "' AND destination = '" + oldDestination + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}


/*
//    search records
*/

function searchCountries(query) {
  con.query("SELECT * FROM Country WHERE LOWER(name) LIKE LOWER('%" + query + "%') OR LOWER(capital) LIKE LOWER('%" + query + "%')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function searchAirports(query) {
  con.query("SELECT * FROM Airport WHERE LOWER(name) LIKE LOWER('%" + query + "%') OR LOWER(code) LIKE LOWER('%" + query + "%') OR LOWER(city) LIKE LOWER('%" + query + "%')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function searchAirlines(query) {
  con.query("SELECT * FROM Airline WHERE LOWER(name) LIKE LOWER('%" + query + "%') OR LOWER(code) LIKE LOWER('%" + query + "%')", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function searchFlights(query) {
  con.query("SELECT Flight.id, Airline.name, Flight.flightNum, Flight.origin, Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = Airline.code INNER JOIN Airport orig ON Flight.origin = orig.Code INNER JOIN Airport dest ON Flight.destination = dest.code " +
  "WHERE LOWER(Airline.name) LIKE LOWER('%" +query + "%') OR LOWER(Airline.code) LIKE LOWER('%" +query + "%') OR CAST(Flight.flightNum AS CHAR) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(orig.name) LIKE LOWER('%" +query + "%') OR LOWER(orig.code) LIKE LOWER('%" +query + "%') OR LOWER(dest.name) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(dest.code) LIKE LOWER('%" +query + "%') OR LOWER(orig.city) LIKE LOWER('%" +query + "%') OR LOWER(dest.city) LIKE LOWER('%" +query + "%') " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function searchDestinations(query) {
  con.query("SELECT Destination.id, Airline.name, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = Airline.code INNER JOIN Airport ON destination = Airport.code " +
  "WHERE LOWER(Airline.name) LIKE LOWER('%" +query + "%') OR LOWER(Airline.code) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(Airport.name) LIKE LOWER('%" +query + "%') OR LOWER(Airport.code) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(Airport.city) LIKE LOWER('%" +query + "%') ORDER BY Destination.id", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

/*
//    filter records by dropdown
*/

function selectCountry(country) {
  con.query("SELECT * FROM Country WHERE name = '" + country + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function selectAirport(airportCode) {
  con.query("SELECT * FROM Airport WHERE code = '" + airportCode + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function selectAirline(airlineCode) {
  con.query("SELECT * FROM Airline WHERE code = '" + airlineCode + "'", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByAirline(airlineCode) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE airline = '" + airlineCode + "' ORDER BY Flight.id",
  function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByOrigin(origin) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE origin = '" + origin + "' ORDER BY Flight.id",
  function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByDestination(destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE destination = '" + destination + "' ORDER BY Flight.id",
  function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByAirlineAndOrigin(airlineCode, origin) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE airline = '" + airlineCode + "' AND origin = '" + origin + "' " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByAirlineAndDestination(airlineCode, destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE airline = '" + airlineCode + "' AND destination = '" + destination + "' " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByOriginAndDestination(origin, destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE origin = '" + origin + "' AND destination = '" + destination + "' " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterFlightsByAirlineAndOriginAndDestination(airlineCode, origin, destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime FROM Flight " +
  "INNER JOIN Airline ON airline = code WHERE origin = '" + origin + "' AND destination = '" + destination + "' " +
  "AND airline = '" + airlineCode + "' ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  console.log(result);
});
}

function filterDestinationsByAirline(code) {
  con.query("SELECT Destination.id, Airline.name, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = code WHERE airline = '" + code + "' ORDER BY Destination.id",
  function (err, result) {
    if (err) throw err;
    console.log(result);
});
}

function filterDestinationsByAirport(destination) {
  con.query("SELECT Destination.id, Airline.name, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = code WHERE destination = '" + destination + "' ORDER BY Destination.id",
  function (err, result) {
    if (err) throw err;
    console.log(result);
});
}
