const mongoose = require("mongoose");

// // Product schema without any validation: 
// const ProductSchema = mongoose.Schema({
    
//     // we don't need to define the _id. it is built automatically.

//     name: String,
//     price: Number,
//     stock: Number

// }, { versionKey: false }); // versionKey: false --> don't add __v field for version.


// Product schema with validation: 
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name must be minimum 2 chars"],
        maxlength: [100, "Name can't exceed 100 chars"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    stock: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
}, { versionKey: false });



const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;

