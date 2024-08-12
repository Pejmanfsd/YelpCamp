// Step 32(A): For the authentication process, create this file (models/user.js)
// install the 3 tools in Terminal:
// npm i passport passport-local passport-local-mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    // We don't mention "username" and "password"
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// By typing the following line, "username" and "password"
// will be assigned to the schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);