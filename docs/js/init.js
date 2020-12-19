// display captions only when their host image has been loaded
function captionLoaded(img) {
    let figure = img.closest("figure");
    let caption = figure.querySelector("figcaption");
    if (caption) {
        caption.style.display = "table-caption";
    }
}

// dynamically adjust content top margin based on height of fixed heaader in
// case a narrow width or large fonts cause the title to wrap to multiple lines
function adjustForHeaderHeight() {
    let headerHeight = document.getElementById("header").offsetHeight;

    console.log("headerHeight: ", headerHeight);
    let content = document.getElementById("content");
    console.log("contentTop before positioning: ", content.getBoundingClientRect(content).top);

    document.getElementById("content").style.marginTop = headerHeight + "px";

    console.log("contentTop after positioning: ", content.getBoundingClientRect(content).top);
}

function initHeader() {
    // readjust whenever the window size is changed
    window.addEventListener("resize", adjustForHeaderHeight);
    window.addEventListener("orientationchange", adjustForHeaderHeight);
    adjustForHeaderHeight();
}