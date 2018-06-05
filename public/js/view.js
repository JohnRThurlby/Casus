$(document).ready(function() {

  var feedPopulate = function () {
    //let query = document.getElementById("search").value
    
    var oArgs = {

        app_key: "kZVX6GMpxCX83vh9",

        //  q: query,

        page_size: 10,

        sort_order: "popularity",

        location: "orlando"

    };

    EVDB.API.call("/events/search", oArgs, function(oData) {


        var events = [{
            title: "Placeholder event",
            image: "imgsrc",
            description: "this is the event description",
            start: "August 20, 2018",
            end: "August 21, 2018"
        }]


    console.log(oData)
    events.push(oData.events.event)
    console.log(events[0])

            // var router = express.Router()
            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
    
            var html    = template(events[0]);

            console.log(html)
    });
}
feedPopulate();
})