// Step 42(F): Create the "cloudinary" folder in the main directory,
// inside this folder create the "index.js" file and type the basic
// codes of cloudinary. First require the recently installed packages:
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Then make the connection to our account in cloudinary by creating the
// cloudinary object and the mentioned information in .env file:
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
// Then instanciate an instance of the "CloudinaryStorage" Class/Model:
const storage = new CloudinaryStorage({
    cloudinary, // the cloudinary object we created
    params: {
        folder: 'YelpCamp', // A new folder called 'YelpCamp' will be created in cloudinary
        // and the uploaded image will be stored there
        allowedFormats: ['jpeg', 'png', 'jpg'] // The acceptable image formats
    }
}); // The storage variable is connected to cloudinary and has the credentials

// Finally export the created variables:
module.exports = {
    cloudinary,
    storage
}