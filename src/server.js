/**
 * This is projects web server app. 
 * It spins up an HTTP server using Express that can be called by the Slack server. 
 * It servers as an entry point for the whole app, but the file itself will deal only with 
 * the HTTP nuances of the app (routing, request parsing, response formatting, etc.) while 
 * the actual business logic will be spread in the other files.
 */

/**
 * initialize new express app and activate body-parser
 * body-parser allows to parse urlencoded messages from Slack
 */
const Express = require('express');
const bodyParser = require('body-parser');
const slashCommandFactory = require('./slashCommand')
const connectGoogleClient = require('./queryGoogleAPI')
const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));


// verify if the app has been initialized with all the necessary environment variables
// const { SLACK_TOKEN: slackToken, GOOGLE_APIKEY: api_key, PORT } = process.env
// if (!slackToken || !api_key) {
//     console.error('missing environment variables SLACK_TOKEN and/or GOOGLE_APIKEY');
//     process.exit(1)
// }
const port = 8080

const request = {
    origin: "Dover, NH",
    dest: "Portsmouth, NH"
}



const api_key = "XXXXX"
const slackToken = 'XXX'

const googleClient = connectGoogleClient(api_key)
const slashCommand = slashCommandFactory(googleClient, slackToken)
const text = "'Dover, NH' 'Portsmouth, NH'"

slashCommand(text)
    .then((result) => {
        return res.json(result)
    })
    .catch(console.error)


// app.post('/', (req, res) => {
//     slashCommand(req.body)
//         .then((result) => {
//             return res.json(result)
//         })
//         .catch(console.error)
// })

// app.listen(port, () => {
//     console.log(`Server started at localhost:${port}`)
// })





