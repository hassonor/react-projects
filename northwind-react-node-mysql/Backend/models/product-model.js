const Joi = require("joi");

class ProductModel {

    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.imageName = product.imageName;
    }

    // Create post validation schema only once as a private (#) static object:
    static #postValidationSchema = Joi.object({
        id: Joi.forbidden(),
        name: Joi.string().required().min(2).max(100),
        price: Joi.number().required().positive(),
        stock: Joi.number().required().positive().integer(),
        imageName: Joi.allow(),
    });

    // Create put validation schema only once as a private (#) static object:
    static #putValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        name: Joi.string().required().min(2).max(100),
        price: Joi.number().required().positive(),
        stock: Joi.number().required().positive().integer(),
    });

    // Create patch validation schema only once as a private (#) static object:
    static #patchValidationSchema = Joi.object({
        id: Joi.number().required().positive().integer(),
        name: Joi.string().optional().min(2).max(100),
        price: Joi.number().optional().positive(),
        stock: Joi.number().optional().positive().integer(),
    });

    validatePost() {
        const result = ProductModel.#postValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePut() {
        const result = ProductModel.#putValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

    validatePatch() {
        const result = ProductModel.#patchValidationSchema.validate(this, { abortEarly: false }); // abortEarly: false --> return all validation errors and not just one.
        return result.error ? result.error.message : null; // null = no errors.
    }

}

module.exports = ProductModel;
