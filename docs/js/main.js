const pages = [
    "About the Trail", "",
    "Getting the Planning Started", "getting-started.html",
    "Getting in Shape", "getting-in-shape.html",
    "Planning the Hike", "planning-the-hike.html",
    "Gear Planning", "gear-planning.html",
    "Water on the JMT", "water-on-the-jmt.html",
    "Clothing", "clothing.html",
    "Other Gear and Pack Weight", "gear-and-pack-weight.html",
    "Day 1 - Arriving and Hiking to Illilouette", "day-1-arriving-hiking-to-illilouette.html",
    "Day 2 - Illilouette to Sunrise High Sierra Camp", "day-2-illilouette-to-sunrise.html",
    "Day 3 - Sunrise High Sierra Camp to Tuolumne Meadows", "day-3-sunrise-high-sierra-camp-to-tuolumne-meadows.html",
    "Day 4 - Tuolumne Meadows to Lake Before Lyell Glacier", "day-4-tuolumne-meadows-to-lake.html",
    "Day 5 - Over Donohue Pass and Down to Shadow Lake", "day-5-donohue-pass-to-shadow-lake.html",
];

function configureLinks() {
    let bottomNav = document.getElementById("bottom-nav");
    if (bottomNav) {
        let pathname = window.location.pathname.toLowerCase();
        let pieces = pathname.split("/");
        let filename = pieces[pieces.length - 1];
        console.log(filename);
        if (filename === "index.html") {
            filename = "";
        }
        let currentIndex = -1;
        for (let i = 0; i < pages.length; i += 2) {
            if (pages[i + 1] === filename) {
                currentIndex = i;
                break;
            }
        }
        if (currentIndex !== -1) {
            let html = "";
            if (currentIndex !== 0) {
                html += `<a href="${pages[currentIndex - 1]}">Prev Page: ${pages[currentIndex - 2]}</a>`;
            }
            if (currentIndex + 2 < pages.length) {
                if (currentIndex !== 0) {
                    html += " | ";
                }
                html += `<a href="${pages[currentIndex + 3]}">Next Page: ${pages[currentIndex + 2]}</a>`;
            }
            bottomNav.innerHTML = html;
        } else {
            console.log("Didn't find matching filename in the pages table");
        }
    }
}

configureLinks();