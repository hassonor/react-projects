const mongoose = require("mongoose");
require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");

// Get all products: 
function getAllProductsAsync() {
    return ProductModel.find().exec();
}

// Get one product: 
function getOneProductAsync(_id) {
    return ProductModel.findById(_id).exec();
}

// Add new product: 
function addProductAsync(product) {
    return product.save();
}

// Update full or partial product:
async function updateProductAsync(product) {
    const info = await ProductModel.updateOne({ _id: product._id }, product).exec();
    // info contains data on the action performed.
    // info.n = number of objects updated.
    return info.n ? product : null;
}

// Delete product: 
function deleteProductAsync(_id) {
    return ProductModel.deleteOne({ _id }).exec();
}

// Mongo Query Language:
// $gt  Greater Than
// $lt  Lower Than
// $gte Greater Than or Equal to
// $lte Lower Than or Equal to
// $eq  Equal to
// $ne  Not Equal to
// $in  IN
// $nin Not In
// $regex   Regular Expression
// $or  OR

// Get products by price range: 
function getProductsByPriceRangeAsync(minPrice, maxPrice) {
    return ProductModel.find({ price: { $gte: minPrice, $lte: maxPrice } }).exec();
}

function getProductsByPriceesAsync(price1, price2) {
    return ProductModel.find({ price: { $or: [price1, price2] } }).exec();
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync,
    getProductsByPriceRangeAsync,
    getProductsByPriceesAsync
};