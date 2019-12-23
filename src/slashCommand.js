/**
 * implements the high level business logic needed for the slash command to work. 
 * It will delegate some of the business logic to commandParser, googleAPI modules
 */

const processCommand = require('./commandParser')

const createErrorResponse = (error) => ({
    color: 'danger',
    text: `*Error*:\n${error}`,
    mrkdwn_in: ['text']
})

/**
 * It reiceves the content of the request coming from the Slack server and 
 * will use commadParser module to process it and validate it.
 * It will also invoke ggogleAPI module and manage the response, formatting 
 * into JSON Objects for the Slack. 
 * 
 * @param {method} getDirections 
 * @param {String} slackToken 
 * @param {String} body
 */
const slashCommandFactory = (getDirections, slackToken) => (body) => new Promise((resolve, reject) => {
    const command = processCommand(body)
    console.log(`${command.origin} -> ${command.dest}`)
    if (typeof command.error != undefined) {
        return resolve({
            text: '',
            attachments: [createErrorResponse(command.error)]
        })
    }
    getDirections(command.origin, command.dest)
        .then((result) => {
            return resolve(result);
        })
})

module.exports = slashCommandFactory
