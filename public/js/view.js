$(document).ready(function() {

    var getEvents = function () {
      //let query = document.getElementById("search").value
      
      var oArgs = {
  
          app_key: "kZVX6GMpxCX83vh9",
  
          //  q: query,
  
          page_size: 10,
  
          sort_order: "popularity",
  
          location: "orlando"
  
      };
  
      EVDB.API.call("/events/search", oArgs, function(oData) {
  
  
      console.log(oData)
            //   var source   = document.getElementById("entry-template").innerHTML;
            //   var template = Handlebars.compile(source);
      });
  }
  getEvents();
  })