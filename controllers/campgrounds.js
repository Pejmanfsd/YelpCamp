// Step 39(A): Creating the "controllers" folder, creating a controller file for campgrounds
// Creating the controllers by moving the functionalities of each route handler to this file
// and export them (the "Campground" model is not required here, so we should require it)
// and also requiring this file in the routes file:
const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
} // Now indicate "campgrounds.index" as the input of the route handler whose
// functionalities are just moved here, in this controller

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
} // Now indicate "campgrounds.renderNewForm" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename })); // Step 42(J): mappin through "files"
    // (which is an array) andassigning the values of "path" and "filename" to variables of the main
    // variable, which is the "images" field of the "campgrounds" collection
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
} // Now indicate "campgrounds.createCampground" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
} // Now indicate "campgrounds.showCampground" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
} // Now indicate "campgrounds.renderEditForm" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
} // Now indicate "campgrounds.updateCampground" as the input of the route handler
// whose functionalities are just moved here, in this controller

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
} // Now indicate "campgrounds.deleteCampground" as the input of the route handler
// whose functionalities are just moved here, in this controller