const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    food_id: String,
    food_name: String
});

const model = mongoose.model('product', productSchema);

module.exports = model;

