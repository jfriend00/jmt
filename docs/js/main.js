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

// accepts a rect that has top, left, right, bottom (like a DOMRect object)
function pointInRect(rect, x, y, margin) {
    const top = rect.top - margin;
    const left = rect.left - margin;
    const right = rect.right + margin;
    const bottom = rect.bottom + margin;
    return (x >= left && x <= right && y >= top && y <= bottom);
}

// clickParent may be passed as a selector DOM element
function configureMenuClick(burgerSelector, popupSelector, clickParent = null, clickMargin = 0) {
    const debug = false;
    const burger = document.querySelector(burgerSelector);
    if (!clickParent) {
        clickParent = burger;
    } else if (typeof clickParent === "string") {
        clickParent = document.querySelector(clickParent);
    }

    function isPopupVisible(popup) {
        return popup.classList.contains("showing");
    }

    function closePopup(popup, e) {
        if (e) {
            // eat this event so the event isn't otherwise processed
            e.preventDefault();
            e.stopImmediatePropagation();
        }
        if (!popup) {
            popup = document.querySelector(popupSelector);
        }
        popup.classList.remove("showing");
        clearEventHandlers();
    }

    function checkClose(e) {
        if (debug) {
            log("-----------------")
            log("checkClose");
        }
        let popup = document.querySelector(popupSelector);
        if (isPopupVisible(popup)) {
            // if target is the burger, let the click go
            // because the click handler on the burger will close the menu
            if (e.target !== burger) {
                // now check if e.target is in the popup
                let parentPopup = e.target.closest(popupSelector);
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

    function checkKeyClose(e) {
        // if Esc key, then close menu
        if (e.keyCode === 27) {
            let popup = document.querySelector(popupSelector);
            if (isPopupVisible(popup)) {
                closePopup(popup);
            }
        }
    }

    // remove the transient click handlers that aren't needed when the
    // popup menu is down
    function clearEventHandlers() {
        window.removeEventListener("click", checkClose, true);
        window.removeEventListener("keydown", checkKeyClose, true);
    }

    function addEventHandlers() {
        // capture other events that should close the menu
        window.addEventListener("click", checkClose, true);
        //    window.addEventListener("touchstart", checkClose, true);
        window.addEventListener("keydown", checkKeyClose, true);
    }


    clickParent.addEventListener("click", function(e) {
        // check if the click is actually close enough to the burger
        // e.clientX, e.clientY coordinate within the viewport
        // element.getBoundingClientRect(); provides top, left, bottom, right
        //    relative to the viewport
        // isPointInRect(domRect, x, y, margin)
        if (pointInRect(burger.getBoundingClientRect(), e.clientX, e.clientY, clickMargin)) {
            if (debug) log("click on burger or its margin");
            let popup = document.querySelector(popupSelector);
            // toggle the popup
            if (isPopupVisible(popup)) {
                if (debug) log("hiding popup");
                popup.classList.remove("showing");
                clearEventHandlers();
            } else {
                if (debug) log("showing popup");
                popup.classList.add("showing");
                addEventHandlers();
            }
        } else {
            if (debug) log("click in parent, outside of burger margin");
        }
    });
}

// Transform from this:
// https://photos.smugmug.com/photos/i-Bx7RMpc/0/25b951e5/L/i-Bx7RMpc-L.png
// to this:
// https://photos.smugmug.com/photos/i-Bx7RMpc/0/25b951e5/O/i-Bx7RMpc.png
// or to this:
// https://photos.smugmug.com/photos/i-Bx7RMpc/0/25b951e5/X5/i-Bx7RMpc-X5.png
function getSizeUrl(base, size = "O") {
    const sizePieceIndexFromEnd = 2;
    const filenamePieceIndexFromEnd = 1;
    const pieces = base.split("/");
    const len = pieces.length;
    // replace size in URL with original "O"
    pieces[len - sizePieceIndexFromEnd] = size;

    const filename = pieces[len - filenamePieceIndexFromEnd];
    // regex
    // image size shorthand such as XL or S
    // (-[^.]{1,2})    a dash folowed by one or two characters that are not a period
    // file extension
    // (\..{1,4})$    a period followed by 1-4 characters at the end of the string
    const newSize = size === "O" ? "" : `-${size}`;
    const newFilename = filename.replace(/(-[^.]{1,2})(\..{1,4})$/, newSize + "$2");
    pieces[len - filenamePieceIndexFromEnd] = newFilename;
    return pieces.join("/");
}

function configureDragScroll(elem) {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    let mouseDownTime;

    function mouseDownHandler(e) {
        elem.classList.add("dragging");

        pos = {
            left: elem.scrollLeft,
            top: elem.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('click', dragClickHandler, {
            capture: true,
            once: true
        });
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        mouseDownTime = Date.now();
    }

    function mouseMoveHandler(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        elem.scrollTop = pos.top - dy;
        elem.scrollLeft = pos.left - dx;
    }

    function mouseUpHandler(e) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('click', dragClickHandler);

        elem.classList.remove("dragging");
    }

    // if the mouse was down for more than 250ms, treat this as a drag
    //     and prevent the click event
    // if the mouse was down for less than 250ms, treat this is a click
    //     and let the click event occur
    function dragClickHandler(e) {
        const deltaT = Date.now() - mouseDownTime;
        const dx = Math.abs(e.clientX - pos.x);
        const dy = Math.abs(e.clientY - pos.y);
        const minT = 250;
        const minXY = 15;
        if (deltaT > 250 || dx > minXY || dy > minXY) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }

    // silly Firefox seems to ignore the draggable attribute
    // so this is needed to stop the built-in drag/drop behavior
    // for images
    function dragStartHandler(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    elem.addEventListener("dragstart", dragStartHandler);
    elem.addEventListener('mousedown', mouseDownHandler, true);

    // return an object that contains a .clear() function that
    // will clear all remaining event handlers
    // This can be called when the drag behavior is no longer
    // desired.
    return {
        clear: function() {
            elem.removeEventListener('mousedown', mouseDownHandler);
            elem.removeEventListener('dragstart', dragStartHandler);
        }
    }
}

function configureExpandos() {
    let expandos = document.querySelectorAll(".captionImage.expando");
    for (let expando of expandos) {
        expando.addEventListener("click", function(e) {
            let img = expando.querySelector("img");
            let src = getSizeUrl(img.src, "X5");

            // hide existing image and caption
            expando.classList.add("hidden");
            let div = document.createElement("div");
            div.className = "expandedContainer";
            div.setAttribute("draggable", "false");
            let contentContainer = expando.closest(".content");

            function configureExpandedSize() {
                // now set up the width of the container
                // document.documentElement.clientWidth is the width inside the scrollbars
                //    of the overall browser window
                // TODO: use the data-width and data-height attributes off the expando image
                // to limit how much we grow the element to the max dimentions of the image
                // TODO: if content is already 100%, then skip all of this width setting
                let windowWidth = document.documentElement.clientWidth;
                let computedWidth = parseInt(window.getComputedStyle(contentContainer).width, 10);

                let leftMargin = Math.round((windowWidth - computedWidth) / 2);
                let rightMargin = windowWidth - leftMargin - computedWidth;
                div.style["margin-left"] = `-${leftMargin}px`;
                div.style["margin-right"] = `-${rightMargin}px`;
                div.style.width = `${windowWidth}px`;
            }

            // set up the size parameters
            configureExpandedSize();
            div.innerHTML = `<img class="expanded" draggable="false" src="${src}">`;
            const dragger = configureDragScroll(div);

            // handle click anywhere in our expando div to close it all
            div.addEventListener("click", function(e) {
                window.removeEventListener("resize", configureExpandedSize);
                expando.classList.remove("hidden");
                div.remove();
                dragger.clear();
            });
            // insert into DOM
            expando.parentNode.insertBefore(div, expando);
            // readjust sizing whenever window size changes
            window.addEventListener("resize", configureExpandedSize);
        });
    }
}

// Run initialization now
configureArrowKeys();
configureMenuClick("#menu .burger", "#menu .popup", ".header", 20);
configureExpandos();