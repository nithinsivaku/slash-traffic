/**
 * implements the business logic that invokes Google APIs to get
 * distance and traffic informations.
 */

const origin = "Durham, NH";
let dest = "Dover, NH";
const api_key = 'XXX';

const params = {
    origin: origin,
    dest: dest
};

// Create google api client with api_key
const googleMaps = require('@google/maps').createClient({
    key: api_key
});

/**
 * Get the distance and duration between places by calling
 * Google Directions api
 * @param {array} params | input parameters
 * @param {Object} googleMaps | googleClientObject
 * @param {function} callback | process json response
 */
const getDirections = (params, googleMaps, callback) => {
    googleMaps.directions({ 'origin': params.origin, 'destination': params.dest },
        function (err, response) {
            if (!err) {
                callback(response.json);
            }
        });
};

/**
 * Helper func to get distance text from json response
 * @param {array} apiResult | json response from googleapi
 */
const getDistance = (apiResult) => {
    return apiResult.routes[0].legs[0].distance.text;
};

/**
 * Helper func to get duration text from json response
 * @param {array} apiResult | json response from googleapi
 */
const getDuration = (apiResult) => {
    return apiResult.routes[0].legs[0].duration.text;
};

getDirections(params, googleMaps, function (result) {
    console.log("Response: ");
    console.log(`Distance ${getDistance(result)} `);
    console.log(`duration ${getDuration(result)} `);
});