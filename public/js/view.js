$(document).ready(function() {

    // this is the eventful API call
    var getEvents = function () {
      //let query = document.getElementById("search").value
      
      var oArgs = {
  
        // these arguments determine what info you get back from eventful. There are other un-used arguments as well, visible in the eventful documentation under /events/search
          app_key: "kZVX6GMpxCX83vh9",
  
          //  q: query,
  
          page_size: 10,
  
          sort_order: "popularity",
  
          location: "orlando"
  
      };
  
    //   makes the call to the API using the /events/search method. takes oArgs as arguments and spits out the events --- oData
      EVDB.API.call("/events/search", oArgs, function(oData) {
  
  
      console.log(oData)
          objectEv.events.push(oData)

        //   these compile our handlebars template
              var source   = document.getElementById("entry-template").innerHTML;
              var template = Handlebars.compile(source);
      });
  }

//   calling the function --- eventually this will be removed and be called when the user logs in
  getEvents();
  })