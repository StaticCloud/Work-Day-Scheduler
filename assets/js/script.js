// load our page
var loadPage = function() {

    // get the current day element and set it's inner html to the current day and month
    $("#currentDay")
        .html("<i>" + 
        moment().format("dddd, MMMM Do") + "</i>");

    // load our 9-5 clock using moment().hours() and formatting that to a 12 hour clock
    for (var i = 9; i < 18; i++) {
        // get the nth hour starting from 9am to 5pm
        var hour = moment().hours(i).format("h a");
    
        // create time blocks, which include the hour, the textarea, and a save button
        var timeblockEl = $("<div>")
            .addClass("time-block")
            .addClass("row");

        var hourEl = $("<p>")
            .addClass("hour")
            .html(hour);

        var textareaEl = $("<textarea>");

        var savebtnEl = $("<button>")
            .addClass("saveBtn");

        // append our elements to the page
        timeblockEl.append(hourEl);
        timeblockEl.append(textareaEl);
        timeblockEl.append(savebtnEl);
        $(".container").append(timeblockEl);
    }
}

loadPage();