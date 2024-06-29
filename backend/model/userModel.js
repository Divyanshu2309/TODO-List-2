const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, " please add the user name"],
    },
    email: {
        type: String,
        required: [true, "please add the user email address"],
        unique: [true, "Email address already exist"],
    },
    password: {
        type: String,
        required: [true, "User should enter the required password"],
    },
},  
);

module.exports = mongoose.model("User", userSchema);
