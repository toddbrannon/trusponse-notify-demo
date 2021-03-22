var mongoose = require("mongoose");

// SCHEMA SETUP
var prospectSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    /* phoneNumber: {
        type: String,
        required: true
    },*/
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

var Prospect = mongoose.model("Prospect", prospectSchema);
module.exports = Prospect;

//Paste command below into console to export csv of current db
//mongoexport -h ds125453.mlab.com:25453 -d tve_prospects -c prospects -u toddbrannon -p tve2018 -o prospects.csv --csv -f firstName, secondName, emailAddress, phoneNumber