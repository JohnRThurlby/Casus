$(document).ready(function() {
              var source   = document.getElementById("entry-template").innerHTML;
              var template = Handlebars.compile(source);
    // this is the eventful API call
    var getEvents = function () {
        //   //let query = document.getElementById("search").value
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
            //   objectEv.events.push(oData)
            //   these compile our handlebars template
          });
        
        // unirest.get("https://community-eventful.p.mashape.com/events/search?app_key=kZVX6GMpxCX83vh9&keywords=books")
        // .header("X-Mashape-Key", "35ZWjjUvuxmshz4RIV2HACPs4csep18CfcAjsnas8mTje72Nko")
        // .header("Accept", "text/plain")
        // .end(function (result) {
        
        //   var result1 = convert.xml2json(result.body, {compact: true, spaces: 4});
        //   console.log(result1);
        }
    getEvents();
  })