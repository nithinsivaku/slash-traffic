/**
 * implements some validation rule to check if the result of the command parser 
 * is something that can be used with the googleAPIs to create one or more short URLs.
 */

 const validateInput = (input) => {
     if(!input) {
        return new Error('No source or destination given');
     }
 }