const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const ProductModel = require("../models/product-model");
const router = express.Router();

// GET http://localhost:3001/api/products
router.get("/", async (request, response) => {
    try {
        const products = await logic.getAllProductsAsync();
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET http://localhost:3001/api/products/the_id
router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;

        const product = await logic.getOneProductAsync(_id);
        if (!product) return response.status(404).send(`_id ${_id} not found.`);

        response.json(product);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3001/api/products
router.post("/", async (request, response) => {
    try {
        const product = new ProductModel(request.body);

        // Validation: 
        const errors = product.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const addedProduct = await logic.addProductAsync(product);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3001/api/products/the_id
router.put("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const product = new ProductModel(request.body);

        // Validation: 
        const errors = product.validateSync();
        if (errors) return response.status(400).send(errors.message);

        const updatedProduct = await logic.updateProductAsync(product);
        if (!updatedProduct) return response.status(404).send(`_id ${_id} not found.`);

        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH http://localhost:3001/api/products/the_id
router.patch("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const product = new ProductModel(request.body);

        const updatedProduct = await logic.updateProductAsync(product);
        if (!updatedProduct) return response.status(404).send(`_id ${_id} not found.`);

        response.json(updatedProduct);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3001/api/products/the_id
router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;

        await logic.deleteProductAsync(_id);

        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET by price range http://localhost:3001/api/products/price-range/10/20
router.get("/price-range/:minPrice/:maxPrice", async (request, response) => {
    try {
        const minPrice = +request.params.minPrice;
        const maxPrice = +request.params.maxPrice;
        const products = await logic.getProductsByPriceRangeAsync(minPrice, maxPrice);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET by price1 or price2 http://localhost:3001/api/products/prices/10/20
router.get("/prices/:price1/:price2", async (request, response) => {
    try {
        const price1 = +request.params.price1;
        const price2 = +request.params.price2;
        const products = await logic.getProductsByPriceesAsync(price1, price2);
        response.json(products);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;