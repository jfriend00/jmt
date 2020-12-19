// display captions only when their host image has been loaded
function captionLoaded(img) {
    let figure = img.closest("figure");
    let caption = figure.querySelector("figcaption");
    if (caption) {
        caption.style.display = "table-caption";
    }
}
