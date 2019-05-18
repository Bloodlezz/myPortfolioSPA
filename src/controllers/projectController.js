const hbsHelpers = require('../helpers/hbsHelpers');
const binder = require('../helpers/binder');
const notificator = require('../helpers/notificator');
const validator = require('../helpers/validator');
const storage = require('../utils/storage');

const projectModel = require('../models/projectModel');

module.exports = (() => {

    function addGet(context) {
        binder.bindPartials(context)
            .then(function () {
                if (context.isGuest) {
                    this.redirect('#/about');
                    notificator.showError('Access denied!');
                } else {
                    this.partial('views/project/add.hbs');
                }
            });
    }

    function addPost(context) {
        let formData = binder.bindFormToObj(this.params);

        validator.validateFormData(formData, 'project');

        if (validator.isFormValid()) {
            notificator.showLoading();
            projectModel.addProject(formData)
                .then(() => {
                    this.redirect(`#/projects/${formData.category}`);
                    notificator.showInfo(`Project created`);
                })
                .catch(err => {
                    notificator.hideLoading();
                    notificator.handleError(err);
                });
        } else {
            notificator.showError('Please fill the fields correctly!');
        }
    }

    function editGet(context) {
        if (storage.isGuest() === false) {
            notificator.showLoading();
            const projectId = this.params.id;

            projectModel.getProject(projectId)
                .then(project => {
                    context.project = project;
                    hbsHelpers.isSelected();

                    return binder.bindPartials(context);
                })
                .then(function () {
                    notificator.hideLoading();
                    this.partial('views/project/edit.hbs');
                })
                .catch(err => {
                    notificator.hideLoading();
                    notificator.handleError(err);
                });
        } else {
            notificator.hideLoading();
            this.redirect('#/about');
            notificator.showError('Access denied!');
        }
    }

    function editPost(context) {
        let formData = binder.bindFormToObj(this.params);

        validator.validateFormData(formData, 'project');

        if (validator.isFormValid()) {
            notificator.showLoading();
            projectModel.updateProject(formData)
                .then(() => {
                    this.redirect(`#/projects/${formData.category}`);
                    notificator.showInfo(`Edit successful`);
                })
                .catch(err => {
                    notificator.hideLoading();
                    notificator.handleError(err);
                });
        } else {
            notificator.showError('Please fill the fields correctly!');
        }
    }

    function byCategory(context) {
        const rawCategory = this.params.category;

        if (validator.isCategoryValid(rawCategory)) {
            notificator.showLoading();

            projectModel.getAllByCategory(rawCategory)
                .then(projects => {
                    const categoryWords = context.params.category.split('-');
                    let category;

                    if (categoryWords.length === 1) {
                        category = categoryWords[0].toUpperCase();
                    } else {
                        if (categoryWords[1].length === 3) {
                            category = categoryWords.join(' ').toUpperCase();
                        } else {
                            category = `${categoryWords[0].toUpperCase()} ${categoryWords[1][0].toUpperCase().concat(categoryWords[1].slice(1))}`;
                        }
                    }

                    context.projects = projects;
                    context.categoryName = category;

                    binder.bindPartials(context)
                        .then(function () {
                            notificator.hideLoading();
                            this.partial('views/project/byCategory.hbs');
                        });
                })
                .catch(err => {
                    notificator.hideLoading();
                    notificator.handleError(err);
                });
        } else {
            notificator.showError('Project group doesn\'t exist!');
        }
    }

    return {
        addGet,
        addPost,
        editPost,
        editGet,
        byCategory
    }
})();