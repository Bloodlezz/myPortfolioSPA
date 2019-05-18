const requester = require('../utils/requester');

module.exports = (() => {

    function addProject(projectData) {
        return requester.post('appdata', 'projects', 'kinvey', projectData);
    }

    function updateProject(projectData) {
        return requester.update('appdata', `projects/${projectData._id}`, 'kinvey', projectData);
    }

    function getAllByCategory(category) {
        return requester.get('appdata', `projects?query={"category":"${category}"}`, 'free');
    }

    function getProject(id) {
        return requester.get('appdata', `projects/${id}`, 'kinvey');
    }

    return {
        addProject,
        updateProject,
        getAllByCategory,
        getProject,
    }
})();