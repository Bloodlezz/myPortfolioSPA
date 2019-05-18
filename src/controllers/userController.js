const binder = require('../helpers/binder');
const validator = require('../helpers/validator');
const notificator = require('../helpers/notificator');
const storage = require('../utils/storage');

const userModel = require('../models/userModel');

module.exports = (() => {

    function loginGet(context) {
        binder.bindPartials(context)
            .then(function () {
                this.partial('views/user/login.hbs');
            });
    }

    function loginPost(context) {
        const credentials = binder.bindFormToObj(context.params);
        validator.validateFormData(credentials, 'login');

        if (validator.isFormValid()) {
            notificator.showLoading();

            userModel.loginUser(credentials)
                .then((userInfo) => {
                    storage.saveSession(userInfo);
                    notificator.hideLoading();
                    this.redirect('#/about');
                    notificator.showInfo('Login successful');
                })
                .catch(function (error) {
                    notificator.hideLoading();
                    notificator.handleError(error);
                });
        } else {
            notificator.showError('Please fill the fields!');
        }
    }

    function logout() {
        notificator.showLoading();
        userModel.logoutUser()
            .then(() => {
                storage.clearSession();
                notificator.hideLoading();
                this.redirect('#/about');
                notificator.showInfo('Logout successful');
            });
    }

    return {
        loginGet,
        loginPost,
        logout
    }
})();