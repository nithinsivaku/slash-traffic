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

/**
 * Return the right error message based on error code
 * @param {Integer} code | http error code
 * @param {String} err | error message
 */
const createErrorDescription = (code, err) => {
    switch (code) {
      case 400:
        return 'Bad Request'
      case 401:
        return 'Unauthorized: Be sure you configured the integration to use a valid API key'
      case 403:
        return `Invalid request: ${err.source} ${err.message}`
      case 404:
        return `Not found: ${err.source} ${err.message}`
      case 503:
        return `Traffic service currently under maintanence. Retry later`
      default:
        return `Unexpected error connecting to Google API`
    }
  }


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

module.exports = getDirections