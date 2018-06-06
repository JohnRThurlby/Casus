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
        },
        {
            title: "placeholder2",
            image: "image2",
            description: "description2",
            start: "start2",
            end: "end2"
        }]


    console.log(oData)
    oData.events.event.forEach(element => {
        events.push(element)
    });
    console.log(events)

            // var router = express.Router()
            var source   = document.getElementById("entry-template").innerHTML;
            var template = Handlebars.compile(source);
    
            var html    = template(events);

            console.log(html)
    });
}
feedPopulate();
})