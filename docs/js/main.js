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
        let marker = document.createElement("div");
        marker.id = "logger-end";
        marker.innerHTML = "<hr>";
        document.body.appendChild(marker);

    }
    let msg = document.createElement("div");

    args = args.map(function(item) {
        if (typeof item === "object") {
            return JSON.stringify(item);
        } else {
            return item;
        }
    });

    msg.textContent = args.join(" ");
    logger.appendChild(msg);
    let marker = document.getElementById("logger-end");
    marker.scrollIntoView({ behavior: "smooth", block: "end" });
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
    const debug = false;
    const burger = document.querySelector("#menu .burger");

    function isPopupVisible(popup) {
        let style = window.getComputedStyle(popup);
        let left = parseInt(style.left, 10);
        if (debug) log("left is: " + left);
        return left >= 0;
    }

    function closePopup(popup, e) {
        if (e) {
            // eat this event so the event isn't otherwise processed
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        if (!popup) {
            popup = document.querySelector("#menu .popup");
        }
        popup.style.left = "-9999px";
    }

    function checkClose(e) {
        if (debug) {
            log("-----------------")
            log("checkClose");
        }
        let popup = document.querySelector("#menu .popup");
        if (isPopupVisible(popup)) {
            // if target is the burger, let the click go
            // because the click handler on the burger will close the menu
            if (e.target !== burger) {
                // now check if e.target is in the popup
                let parentPopup = e.target.closest(".popup");
                if (!parentPopup) {
                    if (debug) log("click detected outside popup, so close popup")
                    closePopup(popup, e);
                } else {
                    if (debug) log("click detected in the popup");
                }
            } else {
                if (debug) log("click detected on burger by outside handlers");
            }
        } else {
            if (debug) log("popup not visible, so no need to close it with any click");
        }
        if (debug) {
            log("done checkClose");
            log("-----------------")
        }
    }
    // capture other events that should close the menu
    window.addEventListener("click", checkClose, true);
    window.addEventListener("touchstart", checkClose, true);
    window.addEventListener("keydown", function(e) {
        // if Esc key, then close menu
        if (e.keyCode === 27) {
            let popup = document.querySelector("#menu .popup");
            if (isPopupVisible(popup)) {
                closePopup(popup);
            }
        }
    }, true);

    burger.addEventListener("click", function(e) {
        if (debug) log("click on burger");
        let popup = document.querySelector("#menu .popup");
        // toggle the popup
        if (isPopupVisible(popup)) {
            if (debug) log("hiding popup");
            popup.style.left = "-9999px";
        } else {
            if (debug) log("showing popup");
            popup.style.left = "0";
        }
    });
}

configureArrowKeys();
configureMenuClick();