// Import MySQL database connection
   var database = require("../config/connection.js");

// Get question mark string for SQL syntax based on number of values
   function getQuestionMarksForSQL(numberOfVals) {
      var questionMarkArray = [];
      for (var i = 0; i < numberOfVals; i++) {questionMarkArray.push("?");}
      return questionMarkArray.toString();
   }

// --------------------------------------------------------
// function to convert object key/value pairs to SQL syntax
// --------------------------------------------------------
   function getColumnsForUpdateSQL(obj) {
   var arrayOfStrings = [];
   // loop through the column key/value pairs
   // convert key/value to a string
   // push the key/value strings into the arrayOfStrings
   for (var key in obj) {
      var column = key;
      var value  = obj[key];  
      if (Object.hasOwnProperty.call(obj, key)) {
         // check for spaces in the string 
         if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = " ' " + value + " ' ";
         }
         arrayOfStrings.push(column + "=" + value);
      }
   }
   // convert array of strings to a signle comma-separated string
   return arrayOfStrings.toString();
   }

// orm object for all SQL statements

var orm = {

  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    database.query(queryString, function(err, result) {
      if (err) { throw err; }
      cb(result);
    });
  },

   create: function(table, cols, vals, cb) {
      var queryString = "";
      var QuestionMarks = getQuestionMarksForSQL(vals.length)
      queryString += "INSERT INTO " + table;
      queryString += " (" + cols.toString() + ")";
      queryString += " VALUES (" + QuestionMarks + ") ";
      console.log("In orm.js, create function, queryString is", queryString);

      database.query(queryString, vals, function(err, result) {
         if (err) { throw err; }
         cb(result);
      });
   },

   update: function(table, objColVals, condition, cb) {
      var queryString = "";
      queryString += "UPDATE " + table;
      queryString += " SET ";
      queryString += getColumnsForUpdateSQL(objColVals);
      queryString += " WHERE ";
      queryString += condition;
      console.log("In orm.js, update function, queryString is", queryString);
      database.query(queryString, function(err, result) {
         if (err) { throw err; }
         cb(result);
      });
   },

   delete: function(table, condition, cb) {
      var queryString = "";
      queryString += "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
      database.query(queryString, function(err, result) {
         if (err) { throw err; }
         cb(result);
      });
   }

// End of orm 
};

module.exports = orm;
