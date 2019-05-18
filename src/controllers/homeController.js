const binder = require('../helpers/binder');

module.exports = (() => {

    function about(context) {
        binder.bindPartials(context)
            .then(function () {
                this.partial('views/home/about.hbs');
            });
    }

    function certificates(context) {
        binder.bindPartials(context)
            .then(function () {
                this.partial('views/home/certificates.hbs');
            });
    }

    return {
        about,
        certificates
    }
})();