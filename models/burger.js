
  var orm = require("../config/orm.js");

  var burger = {

    // select all the burgers in the datbase
    // calls orm function found in orm.js in config folder
    all: function(cb) {
      orm.all("burgers", function(res) {
        cb(res);
      });
    },

    // insert a new burger into the database
    create: function(cols, vals, cb) {
      orm.create("burgers", cols, vals, function(res) {
        cb(res);
      });
    },

    // update existing burger(s) in the database
    update: function(objColVals, condition, cb) {
      orm.update("burgers", objColVals, condition, function(res) {
        cb(res);
      });
    },

    delete: function(condition, cb) {
      orm.delete("burgers", condition, function(res) {
        cb(res);
      });
    }
    
  };

module.exports = burger;
