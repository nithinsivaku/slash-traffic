/**
 * implements the high level business logic needed for the slash command to work. 
 * It reiceves the content of the HTTP request coming from the Slack server and 
 * will use other submodules to process it and validate it. It will also invoke 
 * the module that deals with the Google APIs and manage the response, properly 
 * formatting it into JSON objects that are recognized by Slack. It will delegate 
 * some of the business logic to other modules: commandParser, apiGateway and .
 */
const queryGoogleMaps = require('./queryGoogleAPI');

const request = {
    origin: "Dover, NH",
    dest: "Portsmouth, NH"
}

const api_key = "XXX";


queryGoogleMaps(request, api_key, function (result) {
    console.log("Response: ");
    console.log(`Distance ${result.distance} `);
    console.log(`duration ${result.duration} `);
});


