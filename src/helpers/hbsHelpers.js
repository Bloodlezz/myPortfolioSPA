const Handlebars = require('../../node_modules/handlebars/dist/handlebars.min');
const storage = require('../utils/storage');

module.exports = (() => {

    function isActive() {
        Handlebars.registerHelper('isActive', function (hash) {
            return window.location.hash.includes(hash) ? 'is-active' : '';
        });
    }

    function isSelected() {
        Handlebars.registerHelper('isSelected', function (formValue, category) {
            return formValue === category ? 'selected' : '';
        });
    }

    return {
        isActive,
        isSelected
    }
})();