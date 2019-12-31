/**
 * This is projects web server app. It spins up an HTTP server using Express
 * that can be called by the Slack server. The file itself will deal only with 
 * the HTTP nuances of the app (routing, request parsing, response formatting, etc.) 
 * The actual business logic will be spread in the other files.
 */

// initialize new express app and activate body-parser
const Express = require('express');
const bodyParser = require('body-parser');
const slashCommandFactory = require('./slashCommand')
const connectGoogleClient = require('./queryGoogleAPI')
const app = new Express();
app.use(bodyParser.urlencoded({ extended: true }));

// verify if the app has been initialized with all the necessary environment variables
const { SLACK_TOKEN: slackToken, GOOGLE_APIKEY: api_key, PORT } = process.env
if (!slackToken || !api_key) {
    console.error('missing environment variables SLACK_TOKEN and/or GOOGLE_APIKEY');
    process.exit(1)
}

const port = 8080

// initialize google and slack client with api_key and slacktoken
const googleClient = connectGoogleClient(api_key)
const slashCommand = slashCommandFactory(googleClient, slackToken)

//app serves as an entry point for the whole app
app.post('/', (req, res) => {
    console.log(req.body.text)
    slashCommand(req.body.text)
        .then((result) => {
            return res.json(result)
        })
        .catch(console.error)
})

app.listen(PORT, () => {
    console.log(`Server started at localhost:${port}`)
})