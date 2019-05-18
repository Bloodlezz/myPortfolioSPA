import Sammy from '../node_modules/sammy/lib/sammy';
import '../node_modules/sammy/lib/plugins/sammy.handlebars';

const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const projectController = require('./controllers/projectController');

const htmlTemplates = require('./helpers/htmlTemplates');

$(() => {
    const app = Sammy('#main', router);

    app.run('#/about');
});

function router() {
    this.use('Handlebars', 'hbs');

    this.route('get', '#/about', homeController.about);
    this.route('get', '#/certificates', homeController.certificates);

    this.route('get', '#/login', userController.loginGet);
    this.route('post', '#/login', userController.loginPost);
    this.route('get', '#/logout', userController.logout);

    this.route('get', '#/project/add', projectController.addGet);
    this.route('post', '#/project/add', projectController.addPost);
    this.route('get', '#/project/edit/:id', projectController.editGet);
    this.route('post', '#/project/edit/:id', projectController.editPost);

    this.route('get', '#/projects/:category', projectController.byCategory);

    this.notFound = function () {
        this.swap('');
        $(htmlTemplates.notFoundHtml).appendTo(this.$element());
    }
}