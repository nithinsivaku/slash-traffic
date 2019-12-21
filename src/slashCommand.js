/**
 * implements the high level business logic needed for the slash command to work. 
 * It reiceves the content of the HTTP request coming from the Slack server and 
 * will use other submodules to process it and validate it. It will also invoke 
 * the module that deals with the Google APIs and manage the response, properly 
 * formatting it into JSON objects that are recognized by Slack. It will delegate 
 * some of the business logic to other modules: commandParser, apiGateway and .
 */

const processCommand = require('./commandParser')

const slashCommandFactory = (getDirections, slackToken) => (body) => new Promise((resolve, reject) => {
    const command = processCommand(body)
    if(typeof command.error == undefined) {
        return resolve(command.error)
    }
    





    getDirections(origin, dest)
        .then((result) => {
            return resolve(result);
        })
})


module.exports = slashCommandFactory
