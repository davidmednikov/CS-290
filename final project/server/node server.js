var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var returnedData;

app.set('port', 24818);
app.use(bodyParser.json());

app.use(cors({origin: 'null'}));
//app.use(cors({origin: 'http://people.oregonstate.edu'}));

app.post('/',function(req,res){
  var query = req.body.call;
  console.log(query);
  eval(query);
  setTimeout(function() {res.json(returnedData);}, 10);
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

setInterval(keepAlive, 30000);

function setValue(value) {
  returnedData = value;
}


/*
//    dropdowns
*/

function getCountryDropdown() {
  con.query("SELECT name FROM Country", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function getAirportDropdown() {
  con.query("SELECT name, code, city FROM Airport", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function getAirlineDropdown() {
  con.query("SELECT name, code FROM Airline ORDER BY id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

/*
//    view all records
*/

function getCountries() {
  con.query("SELECT * FROM Country ORDER BY id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function getAirports() {
  con.query("SELECT * FROM Airport ORDER BY id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function getAirlines() {
  con.query("SELECT * FROM Airline ORDER BY id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function getFlights() {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function getDestinations() {
  con.query("SELECT Destination.id, Airline.name, Airport.city, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport ON Airport.code = Destination.destination ORDER BY Destination.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

/*
//    insert record
*/

function insertCountry(name, capital) {
  con.query("INSERT INTO Country (name, capital) VALUES ('" + name + "', '" + capital + "')", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function insertAirport(code, name, city, country) {
  con.query("INSERT INTO Airport (code, name, city, country) VALUES ('" + code + "', '" + name + "', '" + city + "', '" + country + "')", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function insertAirline(code, name, country) {
  con.query("INSERT INTO Airline (code, name, country) VALUES ('" + code + "', '" + name + "', '" + country + "')", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function insertFlight(airline, flightNum, origin, destination, departTime, arriveTime, flightTime) {
  con.query("INSERT INTO Flight (airline, flightNum, origin, destination, departTime, arriveTime, flightTime) VALUES " +
  "('" + airline+ "', '" + flightNum+ "', '" + origin+ "', '" + destination+ "', '" + departTime+ "', '" + arriveTime+ "', '" + flightTime+ "')", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

/*
//    remove records
*/

function deleteCountry(country) {
  con.query("DELETE FROM Country WHERE name='" + country + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function deleteAirport(airportCode) {
  con.query("DELETE FROM Airport WHERE code='" + airportCode + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function deleteAirline(airlineCode) {
  con.query("DELETE FROM Airline WHERE code='" + airlineCode + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function deleteFlight(id) {
  con.query("DELETE FROM Flight WHERE id = '" + id + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}


/*
//    associate records
*/

function insertDestination(airline, destination) {
  con.query("INSERT INTO Destination (airline, destination) VALUES ('" + airline + "', '" + destination + "')", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function deleteDestination(id) {
  con.query("DELETE FROM Destination WHERE id = '" + id + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

// Change association of rows between E2 and E3 in many-to-many relationship
function updateDestination(id, newDestination) {
  con.query("UPDATE Destination SET destination = '" + newDestination + "' WHERE id = '" + id + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function updateAirport(code, name) {
  con.query("UPDATE Airport SET name = '" + name + "' WHERE code = '" + code + "'", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

/*
//    search records
*/

function searchCountries(query) {
  con.query("SELECT * FROM Country WHERE LOWER(name) LIKE LOWER('%" + query + "%') OR LOWER(capital) LIKE LOWER('%" + query + "%')", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function searchAirports(query) {
  con.query("SELECT * FROM Airport WHERE LOWER(name) LIKE LOWER('%" + query + "%') OR LOWER(code) LIKE LOWER('%" + query + "%') OR LOWER(city) LIKE LOWER('%" + query + "%')", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function searchAirlines(query) {
  con.query("SELECT * FROM Airline WHERE LOWER(name) LIKE LOWER('%" + query + "%') OR LOWER(code) LIKE LOWER('%" + query + "%')  ORDER BY Airline.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function searchFlights(query) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, orig.city AS depCity, dest.City AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = Airline.code INNER JOIN Airport orig ON Flight.origin = orig.Code INNER JOIN Airport dest ON Flight.destination = dest.code " +
  "WHERE LOWER(Airline.name) LIKE LOWER('%" +query + "%') OR LOWER(Airline.code) LIKE LOWER('%" +query + "%') OR CAST(Flight.flightNum AS CHAR) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(orig.name) LIKE LOWER('%" +query + "%') OR LOWER(orig.code) LIKE LOWER('%" +query + "%') OR LOWER(dest.name) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(dest.code) LIKE LOWER('%" +query + "%') OR LOWER(orig.city) LIKE LOWER('%" +query + "%') OR LOWER(dest.city) LIKE LOWER('%" +query + "%') " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function searchDestinations(query) {
  con.query("SELECT Destination.id, Airline.name, Airport.city, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = Airline.code INNER JOIN Airport ON destination = Airport.code " +
  "WHERE LOWER(Airline.name) LIKE LOWER('%" +query + "%') OR LOWER(Airline.code) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(Airport.name) LIKE LOWER('%" +query + "%') OR LOWER(Airport.code) LIKE LOWER('%" +query + "%') " +
  "OR LOWER(Airport.city) LIKE LOWER('%" +query + "%') ORDER BY Destination.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

/*
//    filter records by dropdown
*/

function selectCountry(country) {
  con.query("SELECT * FROM Country WHERE name = '" + country + "'", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function selectAirport(airportCode) {
  con.query("SELECT * FROM Airport WHERE code = '" + airportCode + "'", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function selectAirline(airlineCode) {
  con.query("SELECT * FROM Airline WHERE code = '" + airlineCode + "'", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByAirline(airlineCode) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE airline = '" + airlineCode + "' ORDER BY Flight.id",
  function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByOrigin(origin) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE origin = '" + origin + "' ORDER BY Flight.id",
  function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByDestination(destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE destination = '" + destination + "' ORDER BY Flight.id",
  function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByAirlineAndOrigin(airlineCode, origin) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE airline = '" + airlineCode + "' AND origin = '" + origin + "' " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByAirlineAndDestination(airlineCode, destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE airline = '" + airlineCode + "' AND destination = '" + destination + "' " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByOriginAndDestination(origin, destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE origin = '" + origin + "' AND destination = '" + destination + "' " +
  "ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterFlightsByAirlineAndOriginAndDestination(airlineCode, origin, destination) {
  con.query("SELECT Flight.id, Airline.name, Airline.code, Flight.flightNum, Flight.origin, " +
  "Flight.destination, Flight.departTime, Flight.arriveTime, Flight.flightTime, A.city AS depCity, B.city AS arrCity FROM Flight " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport A on A.code = Flight.origin INNER JOIN Airport B on B.code = Flight.destination WHERE origin = '" + origin + "' AND destination = '" + destination + "' " +
  "AND airline = '" + airlineCode + "' ORDER BY Flight.id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

function filterDestinationsByAirline(code) {
  con.query("SELECT Destination.id, Airline.name, Airport.city, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport ON Airport.code = Destination.destination WHERE airline = '" + code + "' ORDER BY Destination.id",
  function (err, result) {
    if (err) throw err;
    setValue(result);
});
}

function filterDestinationsByAirport(destination) {
  con.query("SELECT Destination.id, Airline.name, Airport.city, Destination.destination FROM Destination " +
  "INNER JOIN Airline ON airline = code INNER JOIN Airport ON Airport.code = Destination.destination WHERE destination = '" + destination + "' ORDER BY Destination.id",
  function (err, result) {
    if (err) throw err;
    setValue(result);
});
}

function keepAlive() {
  con.query('SELECT 1');
  console.log("Ah, ha, ha, ha, stayin' live, stayin' alive")
}
