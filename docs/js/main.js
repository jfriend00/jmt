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
    const clickTime = 300;
    const burger = document.querySelector("#menu .burger");
    let burgerFocusTime = Date.now();
    burger.addEventListener("click", function(e) {
        let popup = document.querySelector("#menu .popup");
        let style = window.getComputedStyle(popup);
        if (style.display !== "none" && Date.now() - burgerFocusTime > clickTime) {
            burger.blur();
            e.preventDefault();
        }
    });
    burger.addEventListener("focus", function(e) {
        burgerFocusTime = Date.now();
    });
}

configureArrowKeys();
configureMenuClick();
