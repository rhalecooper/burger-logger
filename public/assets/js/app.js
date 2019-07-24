$(function() {

   $(".change-devoured").on("click", function(event) {
      //console.log ("in app.js, changed-devoured called")
      var id = $(this).data("id");
      var newDevoured = $(this).data("newdevoured");
      var newDevouredState = { devoured: newDevoured };
      //console.log ("in app.js, changed-devoured, newDevoured is", newDevoured);
      //console.log ("in app.js, changed-devoured, newDevouredState is", newDevouredState)

   // ------------------------------------------
   // update burger in database with PUT route
   // ------------------------------------------
      $.ajax("/api/burgers/" + id, {
         type: "PUT",
         data: newDevouredState
      }).then(function() {
         //console.log("changed devoured to " + newDevoured);
         location.reload();
      });
   });

   $(".create-form").on("submit", function(event) {
      event.preventDefault();
      var newBurger = {
         burger_name: $("#ba").val().trim(),
         devoured:    $("[name=devoured]:checked").val().trim()
      };
      $.ajax("/api/burger", {
         type: "POST",
         data: newBurger
      }).then(function() {
         //console.log("Burger added");
         location.reload();
      });
   });

   $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
      $.ajax("api/burger/" + id, {
         type: "DELETE"
      }).then(function() {
         //console.log("deleted burger", id);
         location.reload();
      });
   });

   
});
