// for logging into a window on devices that you can't easily see
// the console
function log() {
    let args = Array.prototype.slice.call(arguments);
    let logger = document.querySelector("#log");
    if (!logger) {
        logger = document.createElement("div");
        logger.style.margin = "0.5rem";
        logger.id = "log";
        document.body.appendChild(logger);
    }
    let msg = document.createElement("div");

    msg.textContent = args.join(" ");
    logger.appendChild(msg);
}

// handle left/right arrow for moving foward/back in the trip
function configureArrowKeys() {
    window.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 37: // left arrow
            {
                let arrowLinks = document.querySelectorAll("#navArrows a");
                window.location = arrowLinks[0].href;
                break;
            }
            case 39: // right arrow
            {
                let arrowLinks = document.querySelectorAll("#navArrows a");
                window.location = arrowLinks[1].href;
                break;
            }
            default:
                break;
        }
    });
}

function configureMenuClick() {
    // this is complicated because the click event comes after
    // the focus event so even when the menu was not yet visible,
    // it will already be visible when the initial click addEventListener
    // comes through.  So, we have make sure the click was some period of
    // time after the focus event before we process it
    const debug = true;
    const clickTime = 300;
    const burger = document.querySelector("#menu .burger");
    let burgerFocusTime = Date.now();
    burger.addEventListener("click", function(e) {
        if (debug) log("click on burger");
        let popup = document.querySelector("#menu .popup");
        let style = window.getComputedStyle(popup);
        let left = parseInt(style.left, 10);
        if (debug) log("left is: " + left);
        if (left < 0) {
            popup.style.left = "0";
        } else {
            popup.style.left = "-9999px";
        }
    });
    burger.addEventListener("focus", function(e) {
        if (debug) log("focus on burger");
        burgerFocusTime = Date.now();
    });
    burger.addEventListener("blur", function(e) {
        if (debug) log("blur on burger");
    });


    // debugging
    if (debug) {
        let links = document.querySelectorAll(".popup a");
        for (let link of links) {
            link.addEventListener("mousedown", function(e) {
                log("mousedown on popup a");
            });
            link.addEventListener("mouseup", function(e) {
                log("mouseup on popup a");
            });
            link.addEventListener("focus", function(e) {
                log("focus on popup a");
            });
            link.addEventListener("blur", function(e) {
                log("blur on popup a");
            });
            link.addEventListener("click", function(e) {
                log("click on popup a");
            });
        }
    }
}

configureArrowKeys();
configureMenuClick();