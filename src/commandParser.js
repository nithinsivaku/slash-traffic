/**
 * commandParser take an arbitrary string of text/ 2 strings
 * and extract origin and destination informations for slashcommand to process.
 */
const validateInputCommand = require('./validateInput')

const parse = (text) => {
    let result
    const regEx = /\'.*?\'/g;
    result = text.match(regEx)
    return result
}

const format = (params) => {
    const spaceRgx = / /g
    const quoteRgx = /'/g
    let formatted = Array
    for (let index = 0; index < params.length; index++) {
        formatted[index] = params[index].replace(quoteRgx, '').replace(spaceRgx, '+');
    }
    return formatted
}

const commandParser = (body) => {
    const params = parse(body)
    const size = params.length
    const result = {
        origin: '75 Portsmouth Blvd Suite 130, Portsmouth, NH 03801',
        dest: '',
        error: ''
    }

    if (size == 0) {
        result.error = 'No destination provided'
        return result
    } else if (size > 2) {
        result.error = 'Check your arguments! Traffic app accepts either one or two arguments and not more than two.'
        return result
    } else {
        const parsed = format(params)
        if (size == 1) {
            result.dest = parsed[0]
        } else {
            result.origin = parsed[0]
            result.dest = parsed[1]
        }
    }
    return result
}

module.exports = commandParser