
   var express = require('express');
   var router  = express.Router();
   var burger  = require('../models/burger.js');

// create routes

   router.get('/', function(req, res) {
      burger.all(function(data) {
         var handlebarObj = { burgers: data };
         // console.log(handlebarObj);
         res.render('index', handlebarObj);
      });
   });

   // insert new burger into database
   router.post('/api/burger', function(req, res) {
      burger.create(
         [ "burger_name", "devoured"], 
         [ req.body.burger_name, req.body.devoured ], 
         function(result) { res.json({ id: result.insertId }); }
      );
   });

   // Update a burger in the database
   router.put('/api/burgers/:id', function(req, res) {
      var condition = 'id = ' + req.params.id;
      console.log('In burgers_controller,js, /api/burgers/:id, condition is', condition);
      burger.update (
         { devoured: req.body.devoured }, 
         condition, 
         function(result) {
            if (result.changedRows == 0) { 
               return res.status(404).end();
            } else {
               res.status(200).end();
            }
         }
      );
   });

   router.delete("/api/burger/:id", function(req, res) {
      var condition = "id = " + req.params.id;
      burger.delete (
         condition, 
         function(result) {
            if (result.affectedRows == 0) {
               return res.status(404).end();  
            } else {
               res.status(200).end();
            }
         }
      );
   });

   module.exports = router;
   