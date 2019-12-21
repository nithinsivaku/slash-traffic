/**
 * commandParser is probably the core module of our project. 
 * It has the goal to take an arbitrary string of text/ 2 strings
 * and extract origin and destination informations for slashcommand to process.
 */

const commandParser = (body) => {
    const params = body.split("' '")
    const size = params.length
    const result = {
        origin: '75 Portsmouth Blvd Suite 130, Portsmouth, NH 03801',
        dest: '',
        error: ''
    }
    
    if (size == 0) {
        result.error = 'No destination provided'
        return result
    } else {
        switch (size) {
            case 1: {
                result.dest = params[0]
                break
            }
            case 2: {
                result.origin = params[0]
                result.dest = params[1]
                break
            }
            default: {
                result.error = 'Check your arguments! Traffic app accepts either one or two arguments and not more than two.'
                break
            }
        }
    }
    return result
}

module.exports = commandParser