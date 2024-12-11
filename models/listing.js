const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: Object,
    price: Number,
    location: String,
    country: String
})

let Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;