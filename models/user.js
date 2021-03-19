const mongoose                = require("mongoose");
const passportLocalMongoose   = require("passport-local-mongoose");
const Schema                  = mongoose.Schema;

//SCHEMA SETUP
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);