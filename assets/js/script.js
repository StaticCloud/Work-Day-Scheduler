// load our page
var loadPage = function() {

    // get the current day element and set it's inner html to the current day and month
    $("#currentDay")
        .html("<i>" + 
        moment().format("dddd, MMMM Do") + "</i>");

    // load our 9-5 clock using moment().hours() and formatting that to a 12 hour clock
    for (var i = 9; i < 18; i++) {
        // get the nth hour starting from 9am to 5pm
        var hour = moment().hours(i).format("h a").toUpperCase();
    
        // create time blocks, which include the hour, the textarea, and a save button
        var timeblockEl = $("<div>")
            .addClass("time-block row")

        var hourEl = $("<p>")
            .addClass("hour text-right col pt-3")
            .html(hour);

        var textareaEl = $("<textarea>")
            .addClass("col-10 past");

        var savebtnEl = $("<button>")
            .addClass("saveBtn col")
            .html("<i class=\"bi bi-archive\"></i>");

        // append our elements to the page
        timeblockEl.append(hourEl);
        timeblockEl.append(textareaEl);
        timeblockEl.append(savebtnEl);
        $(".container").append(timeblockEl);
    }
}

loadPage();