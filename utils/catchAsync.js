// Step 23(B): In order to avoid the duplicated codes,
// we create a function that accepts another function
// and returns a new function with "req", "res" and "next" as its inputs
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}