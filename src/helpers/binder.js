const storage = require('../utils/storage');
const hbsHelpers = require('../helpers/hbsHelpers');

module.exports = (() => {

    function bindFormToObj(sammyObj) {
        return Object.getOwnPropertyNames(sammyObj)
            .reduce((acc, cur) => {
                if (cur === 'id') {
                    acc['_id'] = sammyObj[cur];
                } else {
                    acc[cur] = sammyObj[cur];
                }

                return acc;
            }, {});
    }

    function bindPartials(context, extraPartialsObj) {
        context.isGuest = storage.isGuest();
        context.username = storage.getData('username');
        hbsHelpers.isActive();

        let partials = {
            header: 'views/common/header.hbs',
            // footer: 'views/common/footer.hbs'
        };

        if (extraPartialsObj) {
            for (let key in extraPartialsObj) {
                partials[key] = extraPartialsObj[key];
            }
        }

        return context.loadPartials(partials)
    }

    return {
        bindFormToObj,
        bindPartials
    }
})();