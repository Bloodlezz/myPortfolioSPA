const requester = require('../utils/requester');

module.exports = (() => {

    function loginUser(credentialsObj) {
        return requester.post('user', 'login', 'basic', credentialsObj);
    }

    function getUserInfo(id) {
        return requester.get('user', id, 'kinvey');
    }

    function logoutUser() {
        return requester.post('user', '_logout', 'kinvey');
    }

    return {
        loginUser,
        logoutUser,
        getUserInfo,
    }
})();