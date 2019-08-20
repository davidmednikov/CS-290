var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var returnedData;

app.set('port', 45678);
app.use(bodyParser.json());

//app.use(cors({origin: 'null'}));
app.use(cors({origin: 'http://people.oregonstate.edu'}));

app.get('/',function(req,res){
  console.log("GET");
  eval("getExercises()");
  setTimeout(function() {res.json(returnedData);}, 10);
});

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
  user            : 'cs290_mednikod',
  password        : '8465',
  database        : 'cs290_mednikod',
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
//    view all records
*/

function getExercises() {
  con.query("SELECT id, name, reps, weight, DATE_FORMAT(date, '%m/%d/%Y') AS date, unit FROM Exercise ORDER BY id", function (err, result) {
  if (err) throw err;
  setValue(result);
});
}

/*
//    insert record
*/


function insertExercise(name, reps, weight, date, unit) {
  con.query("INSERT INTO Exercise (name, reps, weight, date, unit) VALUES ('" + name + "', " + reps + ", " + weight + ", '" + date + "', " + unit + ")", function (err, result) {
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
//    remove record
*/

function deleteExercise(exerciseId) {
  con.query("DELETE FROM Exercise WHERE id=" + exerciseId + "", function (err, result) {
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
//    update records
*/

function updateExercise(id, name, reps, weight, date, unit) {
  con.query("UPDATE Exercise SET name = '" + name + "',  reps = " + reps + ", weight = " + weight + ", date = '" + date + "', unit = " + unit + " WHERE id = " + id + "", function (err, result) {
    if (err) {
      console.log(err);
      setValue(err);
    }
    else {
       setValue(result);
    }
  });
}

function keepAlive() {
  con.query('SELECT 1');
  console.log("Ah, ha, ha, ha, stayin' live, stayin' alive")
}
