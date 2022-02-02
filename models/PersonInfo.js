const mongoose = require("mongoose")
const PersonInfo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    favoriteFoods: {
        type: [String],
        required: true
    }
})

module.exports = mongoose.model("PersonInfo", PersonInfo)