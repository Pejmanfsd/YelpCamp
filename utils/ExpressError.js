// Step 23(A): Express Error Class
// Create the "utils" folder, then this file ("ExpressError.js")
// We create the Class here:
class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;
// Create the "catchAsync.js" in the "utils" folder