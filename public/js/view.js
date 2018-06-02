$(document).ready(function() {


    var Event = function (title, image, description, location, start, end) {
        this.title = title,
        this.image = image,
        this.description = description,
        this.location = location,
        this.start = start,
        this.end = end,
        this.liked = false,
        this.create = function () {
        }
    }

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


    console.log(oData)
        // Note: this relies on the custom toString() methods below

    // for (var i = 0; i < 10; i++) {
    //     feed.append( oData.events.event[i].title)
    //     feed.append( oData.events.event[i].title)
    //     feed.append( oData.events.event[i].title)
    //     feed.append( oData.events.event[i].title)
    // }

    });
}
feedPopulate();
})