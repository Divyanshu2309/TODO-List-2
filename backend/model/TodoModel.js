const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    heading: {
        type: String,
        required: [true, " please give the heading"],
    },
    content: {
        type: String,
        required: [true, "Provide content to be stored in TODO List"],
    },
},
);

module.exports = mongoose.model("Todo", todoSchema);