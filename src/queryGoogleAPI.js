/**
 * implements the business logic that invokes Google APIs to get
 * distance and traffic informations.
 */

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

/**
 * Create google api client with provided api_key
 * Get the distance and duration between places by calling
 * Google Directions api
 * @param {array} params | input parameters
 * @param {Object} googleMaps | googleClientObject
 * @param {function} callback | process json response
 */
const getDirections = (api_key) => (params) => new Promise((resolve, reject) => {
    
    // inititalize response json
    const res = {
        distance: '',
        duration: '',
        error: ''
    };
    const googleMaps = require('@google/maps').createClient({
        key: api_key
    });
    googleMaps.directions({ 'origin': params.origin, 'destination': params.dest },
        function (err, response) {
            if (!err) {
                res.distance = getDistance(response.json);
                res.duration = getDuration(response.json);
            } else {
                res.error = err.message;
            }
            resolve(res);
        });
})


module.exports = getDirections