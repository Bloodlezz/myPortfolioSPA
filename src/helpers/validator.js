const storage = require('../utils/storage');

module.exports = (() => {

    storage.saveAsJson('validator', {});

    function validateFormData(dataObj, formName) {
        let formsValidation = {
            login: loginValidation,
            project: projectValidation
        };

        function loginValidation(dataObj, key) {
            let currentInput = $(`[name=${key}]`);

            switch (key) {
                case 'username':
                    dataObj[key] !== ''
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Username is required!');
                    break;

                case 'password':
                    dataObj[key] !== ''
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Password is required!');
                    break;
            }
        }

        function projectValidation(dataObj, key) {
            let currentInput = $(`[name=${key}]`);

            switch (key) {
                case 'title':
                    const titleRegex = RegExp('^.{3,20}$');
                    titleRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Minimum 1, maximum 20 characters allowed!');
                    break;

                case 'description':
                    const descriptionRegex = RegExp('^.{10,330}$');
                    descriptionRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Minimum 10, maximum 330 characters allowed!');
                    break;

                case 'url':
                case 'githubUrl':
                    const httpRegex = RegExp('^http://?.+$');
                    const httpsRegex = RegExp('^https://?.+$');
                    if (dataObj[key] === '') {
                        invalidInput(currentInput, 'URL is required!');
                    } else {
                        if (httpRegex.test(dataObj[key]) || httpsRegex.test(dataObj[key])) {
                            validInput(currentInput);
                        } else {
                            invalidInput(currentInput, 'Invalid URL!');
                        }
                    }
                    break;

                case 'image':
                    if (dataObj[key] === '') {
                        invalidInput(currentInput, 'Image is required!');
                    } else {
                        dataObj[key].endsWith('.jpg')
                            ? validInput(currentInput)
                            : invalidInput(currentInput, 'Image must be of type ".jpg"!');
                    }
                    break;

                case 'category':
                    if (dataObj[key] !== 'choose') {
                        validInput(currentInput);
                    } else {
                        invalidInput(currentInput, 'Please choose category!');
                    }
                    break;
            }
        }

        for (let key in dataObj) {
            formsValidation[formName](dataObj, key);
        }
    }

    function isFormValid() {
        const formValidations = storage.getJson('validator');
        return !Object.values(formValidations).includes('invalid');
    }

    function isCategoryValid(category) {
        switch (category) {
            case 'js-express':
                return true;

            case 'js-spa':
                return true;

            case 'php':
                return true;
        }
    }


    // Helper function for project validation
    async function validInput(jqueryElement) {
        const inputName = jqueryElement.attr('name');
        storage.saveToValidator(inputName, 'valid');

        if ($(`#${inputName}`.concat('Msg')).length !== 0) {
            await $(`#${inputName}`.concat('Msg'))
                .slideUp('slow', () => {
                    jqueryElement.removeClass('is-invalid');
                    $(`#${inputName}`.concat('Msg')).remove();
                });
        }

        jqueryElement.addClass('is-valid');
    }

    // Helper function for project validation
    async function invalidInput(jqueryElement, message) {
        jqueryElement.removeClass('is-valid');
        const inputName = jqueryElement.attr('name');
        storage.saveToValidator(inputName, 'invalid');
        const errorDiv = $(`<div id="${inputName}Msg" class="text-danger text-center font-weight-bold" style="display: none">${message}</div>`);

        if ($(`#${inputName}`.concat('Msg')).length === 0) {
            jqueryElement.addClass('is-invalid');

            jqueryElement.after(errorDiv);
            errorDiv.slideDown('slow');
        } else {
            $(`#${inputName}`.concat('Msg')).html(message);
        }
    }

    return {
        validateFormData,
        isFormValid,
        isCategoryValid
    }
})();