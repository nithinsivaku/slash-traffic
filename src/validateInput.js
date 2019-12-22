/**
 * implements some validation rule to check if the input 
 * is something that can be used with the googleAPIs to 
 * get distance and traffic.
 */

const validateInputCommand = (input) => {
    let error
    const size = input.length
    if (size == 0) {
        error = 'No destination provided! Please see the usage by typing /traffic in the message box.'
    } else if (size > 2) {
        error = 'Multiple places found! You can specify atmost two places.'
    } else {

    }

}

module.exports = validateInputCommand