// Step 25(N): We require "Joi" here and
const Joi = require('joi');
// Step 25(M): We paste the validation codes here,
// after the "exports" keyword (Because we want to export it to app.js)
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // images: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
})
// (Later we can add other validations here)
// Now we should require the "campgroundSchema"
// Step 26(I): Creating and exporting review validations:
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        // rating: Joi.number().required(),
        rating: Joi.number().required().min(1).max(5), // Step 26(N): Assigning the min/max values for the rating
        body: Joi.string().required()
    }).required()
})