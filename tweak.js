module.exports = {
    process: function(file, data, renderInput) {
        // Input:
        //   renderInput._info.base
        //   renderInput._info.outputDir
        //   renderInput._info.outputBase
        //   file
        // Ouput:
        //   renderInput.nextUrl
        //   renderInput.nextName
        //   renderInput.prevUrl
        //   renderInput.prevName
        if (!renderInput.pages) {
            throw new Error("Expecting renderInput.pages to be an object")
        }
        // find this file in renderInput.pages
        let currentItem;
        let currentIndex;
        for (let [index, item] of renderInput.pages.entries()) {
            // have to special case "index.html" because the matching
            // url for that is ""
            if (item.url === renderInput._info.outputBase ||
              (renderInput._info.outputBase === "index.html" && item.url === "")) {
                currentItem = item;
                currentIndex = index;
                break;
            }
        }
        // it is OK to not find currentItem as long as the
        // page being processed does not need the data we're putting in the page
        if (currentItem) {
            if (currentIndex !== 0) {
                renderInput.prevUrl = renderInput.pages[currentIndex - 1].url;
                renderInput.prevName = renderInput.pages[currentIndex - 1].name;
            }
            if (currentIndex + 1 < renderInput.pages.length) {
                renderInput.nextUrl = renderInput.pages[currentIndex + 1].url;
                renderInput.nextName = renderInput.pages[currentIndex + 1].name;
            }
        }

    }
}
