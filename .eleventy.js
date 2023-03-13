const sass = require("sass");
const markdownIt = require("markdown-it");
// const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/icons");
    eleventyConfig.addPassthroughCopy("src/docs");

    eleventyConfig.addTemplateFormats("scss");

    eleventyConfig.setBrowserSyncConfig({
        files: "assets/style/*.css",
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    function filterTagList(tags) {
        return (tags || []).filter(
            (tag) => ["nav", "post", "posts", "blog"].indexOf(tag) === -1
        );
    }

    eleventyConfig.addFilter("filterTagList", filterTagList);

    // Create an array of all tags
    eleventyConfig.addCollection("tagList", function (collection) {
        let tagSet = new Set();
        collection.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    });

    // Customize Markdown library and settings:
    // let markdownLibrary = markdownIt({
    //     html: true,
    //     linkify: true,
    // }).use(markdownItAnchor, {
    //     permalink: markdownItAnchor.permalink.ariaHidden({
    //         placement: "after",
    //         class: "direct-link",
    //         symbol: "#",
    //         wrapper: 'div'
    //     }),
    //     level: [1, 2, 3, 4],
    //     slugify: eleventyConfig.getFilter("slugify"),
    // });
    // let markdownLibrary = markdownIt({
    //     html: true
    // });
    // eleventyConfig.setLibrary("md", markdownLibrary);

    let options = {
        html: true,
        breaks: true,
        linkify: true
    };

    eleventyConfig.setLibrary("md", markdownIt(options));

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: async function (inputContent) {
            let result = sass.compileString(inputContent);
            return async (data) => {
                return result.css;
            };
        },
    });

    return {
        templateFormats: ["md", "njk", "html", "liquid"],
        markdownTemplateEngine: "html",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src/",
            includes: "_includes",
            data: "_data",
            output: "_site"
        },
    };
};
