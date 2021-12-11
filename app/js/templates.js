const Handlebars = require('handlebars')

module.exports = {
    homepage: Handlebars.compile(require('../templates/homepage.hbs')),
    services: Handlebars.compile(require('../templates/services.hbs')),
    studio: Handlebars.compile(require('../templates/studio.hbs')),
    contact: Handlebars.compile(require('../templates/contact.hbs')),
    about: Handlebars.compile(require('../templates/about.hbs')),
    projects: Handlebars.compile(require('../templates/projects.hbs')),
    login: Handlebars.compile(require('../templates/login.hbs')),
    signup: Handlebars.compile(require('../templates/signup.hbs')),
    //drive: Handlebars.compile(require('../templates/drive.hbs')),
    //loggedIn: Handlebars.compile(require('../templates/loggedIn.hbs')),
    //loggedOut: Handlebars.compile(require('../templates/loggedOut.hbs'))
}