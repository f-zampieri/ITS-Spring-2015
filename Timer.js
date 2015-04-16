/*
A simple timer. Usage is very straightforward.
To create a timer simply pass in the element in your html where you want to create a timer.
elem is the element where the timer will be created
hasBtn is a boolean that allow you to give the user start, stop, and reset buttons
warn is an integer, the number of seconds that pass before the timer warns the user
limit is an integer, the number of seconds that pass before the timer runs out and stops
example usage:

    var e = document.getElementById("timer-area");
    var t = new Timer(e, false, 10, 300);
    t.startf();
    
Author Ramamurthy Siripuram
*/
var Timer = function(elem, hasBtn, warn, limit) {

    var start = document.createElement("BUTTON"),
        stop = document.createElement("BUTTON"),
        reset = document.createElement("BUTTON"),
        display = document.createElement("div"),
        out = document.createElement("div"),
        hide = document.createElement("BUTTON"),
        show = document.createElement("BUTTON");

    var sec,
        min,
        outSec,
        t1,
        t2 = 0,
        pause = false,
        intID,
        flash;

    display.innerHTML = "0:00.00";
    out.appendChild(display);
    elem.appendChild(out);

    show.appendChild(document.createTextNode("+"));
    show.title = "show";
    hide.appendChild(document.createTextNode("-"));
    hide.title = "hide";

    show.style.display = "none"

    elem.appendChild(show);
    elem.appendChild(hide);

    if (hasBtn) {
        start.appendChild(document.createTextNode("start"));
        stop.appendChild(document.createTextNode("stop"));
        reset.appendChild(document.createTextNode("reset"));
        out.appendChild(start);
        out.appendChild(stop);
        out.appendChild(reset);
        stop.style.display = "none";
    };

    start.addEventListener("click",startf);
    stop.addEventListener("click",stopf);
    reset.addEventListener("click",resetf);
    show.addEventListener("click", showf);
    hide.addEventListener("click", hidef);

    function startf () {
        if (!pause) {
            t1 = new Date().getTime();
        } else {
            t2 = sec;
            t1 = new Date().getTime();
        };
        intID = setInterval(tick, 10);
        // console.log(intID);
        pause = false;
        start.style.display = "none";
        stop.style.display = "inline";
    }

    function stopf () {
        clearInterval(intID);
        pause = true;
        start.style.display = "inline";
        stop.style.display = "none";
    }

    function resetf (newWarn, newLim) {
        if(newWarn != undefined) {
            warn = newWarn;
        };
        if (newLim != undefined) {
            limit = newLim;
        };
        clearInterval(intID);
        // if (flash != undefined) {
        //     clearInterval(flash);
        // };
        outSec = 0;
        t2 = 0;
        sec = 0;
        min = 0;
        updateText();
        display.style.color = "black";
        display.style.visibility = "visible";
        pause = false;
        start.style.display = "inline";
        stop.style.display = "none";
    }

    function updateText() {
        if (outSec<10000) {
                display.innerHTML = "" + min + ":0" + ((Math.floor(outSec/10))/100).toFixed(2);
        } else if (outSec>=10000){
                display.innerHTML = "" + min + ":" + ((Math.floor(outSec/10))/100).toFixed(2);
        };
        // console.log("updated!");
    }

    function tick() {
        sec = (new Date().getTime()) - t1 + t2;
        min = Math.floor(sec/60000);
        outSec = sec%60000;
        // console.log(outSec);
        if (sec >= warn*1000) {
            display.style.color = "red";
        } else {
            display.style.color = "black";
        };
        if (sec >= limit*1000) {
            stopf();
            start.style.display = "none";
            outSec = (limit*1000)%60000;
            display.style.color = "red";
            // console.log(outSec);
            setTimeout(timeup, 10);
        };
        updateText();
    }

    function timeup() {
        alert("Times Up!");
        // var delay = 300;

        // flash = setInterval(function() {
        //     if (display.style.visibility == "visible") {
        //         setTimeout(function() {display.style.visibility = "hidden";}, delay);
        //     } else {
        //         setTimeout(function() {display.style.visibility = "visible";}, delay);
        //     };
        // }, 2*delay);
    }

    function showf() {
        out.style.display = "inline";
        hide.style.display = "inline";
        show.style.display = "none";
    }

    function hidef() {
        out.style.display = "none";
        hide.style.display = "none";
        show.style.display = "inline";
    }

    this.startf = startf;
    this.stopf = stopf;
    this.resetf = resetf;
};