var currentIndex;
var schedule = [];

// load our page
var loadPage = function() {
    $(".container").empty();

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

// evaluate the current hour, called in our interval every 10 seconds
var assessHour = function() {
    // get the current hour and the period using moment()
    var currentTime = moment().format("h A");

    // calling removeClass and addClass to make sure there is one and only one time class for each block
    $(".container").children().each(function() {
        // get the text content of the hour element
        var hour = $(this)
            .find(".hour")
            .text();
        
        // if the hour and the current hour are equal style it and get it's index
        if (hour === currentTime) {
            // if the current hour obtained from moment() equals one of the hours in our blocks, set that block to the present block...
            $(this)
                .find("textarea")
                .removeClass("past")
                .removeClass("future")
                .addClass("present");
    
                var currentBlock = $(this).find("textarea").hasClass("present");
    
                // ...and get it's index
                if (currentBlock) {
                    currentIndex = $(this).index();
                }
        } else {
            // ..otherwise, set all other blocks to past
            $(this)
                .find("textarea")
                .addClass("past")
                .removeClass("present")
                .removeClass("future");
        }
    
        // ...set all future blocks to ...future...
        if ($(this).index() > currentIndex) {
            $(this)
                .find("textarea")
                .removeClass("past")
                .removeClass("present")
                .addClass("future");
        // ...if a block is less than the current index, set that to the past block
        } else if ($(this).index() < currentIndex) {
            $(this)
                .find("textarea")
                .removeClass("future")
                .removeClass("present")
                .addClass("past");
        }
        
    })

    if ((currentTime.split(" ")[0] > 5 && currentTime.split(" ")[0] != 12) && currentTime.split(" ")[1] === "PM") {
        $(".container")
            .find("textarea")
            .addClass("past");
    }

    if ((currentTime.split(" ")[0] < 9 || currentTime.split(" ")[0] == 12) && currentTime.split(" ")[1] === "AM") {
        $(".container")
            .find("textarea")
            .addClass("future");
    }
}

// function for saving our schedule
var saveSchedule = function() {
    // clear our schedule
    schedule = [];

    // then reappend our new time blocks
    $(".container").children().each(function() {
        var hour = $(this).find(".hour").text();
        var text = $(this).find("textarea").val();
        var block = [hour, text];

        schedule.push(block);
    })

    // then update localStorage
    localStorage.setItem("schedule", JSON.stringify(schedule));
}

// function for loading our schedule
var loadSchedule = function() {
    // get our schedule from localStorage
    schedule = localStorage.getItem("schedule");

    // create a new schedule array if it is null
    if (schedule == null) {
        schedule = [];
        return false;
    }

    // parse the string
    schedule = JSON.parse(schedule);

    // iterate through our container
    $(".container").children().each(function() {
        for (var i = 0; i < schedule.length; i++) {
            // get the hour value of each block
            var hour = $(this).find(".hour").text();

            // if it's equal to one of our times in our schedule, set it's textarea to whatever it's value pair
            if (hour === schedule[i][0]) {
                $(this).find("textarea").text(schedule[i][1]);
            }
        }
    })
}

// save our schedule on click
$(".container").on("click", "button", saveSchedule);

// assess our hour every 10 seconds
setInterval(function() {
    assessHour();
}, 10000);

loadPage();
loadSchedule();
assessHour();