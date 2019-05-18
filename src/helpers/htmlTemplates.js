module.exports = (() => {
    const notFoundHtml = '' +
        '<div id="notfound">\n' +
            '<div class="notfound">\n' +
                '<div class="notfound-404">\n' +
                    '<div></div>\n' +
                    '<h1>404</h1>\n' +
                '</div>\n' +
                '<h2 class="custom-bg custom-shadow text-white rounded">Page not found</h2>\n' +
                '<p class="custom-bg custom-shadow text-white rounded">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>\n' +
                '<a href="#/about">home page</a>\n' +
            '</div>\n' +
        '</div>';

    return {
        notFoundHtml
    }
})();