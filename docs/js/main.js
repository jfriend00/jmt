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
    "Day 6 - Shadow Lake to Red's Meadow", "day-6-shadow-lake-to-reds-meadow.html",
    "Day 7 - Red's Meadow to Purple Lake", "day-7-reds-meadow-to-purple-lake.html",
    "Day 8 - Purple Lake Over Silver Pass to Pocket Meadow", "day-8-purple-lake-to-pocket-meadow.html",
    "Day 9 - Pocket Meadow to Rosemarie Meadow", "day-9-pocket-meadow-to-rosemarie-meadow.html",
    "Day 10 - Over Selden Pass to MTR and Start the Climb to Muir Pass", "day-10-selden-pass-to-mtr.html",
    "Day 11 - Aspen Meadow to Sapphire Lake", "day-11-aspen-meadow-to-sapphire-lake.html",
    "Day 12 - Sapphire Lake Over Muir Pass to Deer Meadow", "day-12-sapphire-lake-to-deer-meadow.html",
    "Day 13 - Deer Meadow Over Mather Pass to Kings River", "day-13-deer-Meadow-to-kings-river.html",
    "Day 14 - Kings River over Pinchot Pass to Rae Lakes", "day-14-kings-river-to-rae-lakes.html",
    "Day 15 - Rae Lakes over Glen Pass to Vidette Meadows", "day-15-rae-lakes-to-vidette-meadows.html",
    "Day 16 - Over Forester Pass to Wright Creek", "day-16-over-forester-pass-to-wright-creek.html",
    "Day 17 - Wright Creek to Guitar Lake", "day-17-wright-creek-to-guitar-lake.html",
    "Day 18 - Guitar Lake to Whitney and Down to Whitney Portal", "day-18-guitar-lake-to-whitney-to-whitney-portal.html"
];

function getPageIndex() {
    let pathname = window.location.pathname.toLowerCase();
    let pieces = pathname.split("/");
    let filename = pieces[pieces.length - 1];
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
    return currentIndex;
}

function configureBottomLinks(currentIndex) {
    let bottomNav = document.getElementById("bottom-nav");
    if (bottomNav) {
        if (currentIndex !== -1) {
            let html = "";
            if (currentIndex !== 0) {
                html += `<a href="${pages[currentIndex - 1]}">Prev Page: ${pages[currentIndex - 2]}</a>`;
            }
            if (currentIndex + 3 < pages.length) {
                if (currentIndex !== 0) {
                    html += " | ";
                }
                html += `<a href="${pages[currentIndex + 3]}">Next Page: ${pages[currentIndex + 2]}</a>`;
            }
            bottomNav.innerHTML = html;
        }
    }
}

function configureArrowLinks(currentIndex) {
    let arrowLinks = document.querySelectorAll("#navArrows a");
    if (arrowLinks.length >= 2 && currentIndex !== -1) {
        if (currentIndex === 0) {
            arrowLinks[0].href = window.location;
        } else {
            arrowLinks[0].href = pages[currentIndex - 1];
        }
        if (currentIndex + 3 > pages.length) {
            arrowLinks[1].href = window.location;
        } else {
            arrowLinks[1].href = pages[currentIndex + 3];
        }
    }
}

let currentIndex = getPageIndex();
configureBottomLinks(currentIndex);
configureArrowLinks(currentIndex);