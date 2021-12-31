const path = require("path");
const dal = require("../data-access-layer/dal");
const filesHelper = require("../helpers/files-helper");

async function getAllProductsAsync() {
    const sql = "SELECT ProductID AS id, ProductName AS name, UnitPrice AS price, UnitsInStock AS stock, concat(ProductID, '.jpg') AS imageName FROM Products";
    const products = await dal.executeAsync(sql);
    return products;
}

async function getOneProductAsync(id) {
    const sql = `SELECT ProductID AS id,
                 ProductName AS name,
                 UnitPrice AS price,
                 UnitsInStock AS stock,
                 concat(ProductID, '.jpg') AS imageName
                 FROM Products
                 WHERE ProductID = ?`;


    const products = await dal.executeAsync(sql,[id]);
    return products[0];
}

async function addProductAsync(product, image) {

    const sql = `INSERT INTO Products(ProductName, UnitPrice, UnitsInStock)
                 VALUES(?, ?, ?)`;

    const info = await dal.executeAsync(sql,[product.name,product.price,product.stock]);
    product.id = info.insertId; // this is the new created id.

    // Save the image to disk:
    const extension = image.name.substr(image.name.lastIndexOf("."));
    const fileName = product.id + extension;
    product.imageName = fileName;
    const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
    await image.mv(absolutePath);

    return product;
}

async function updateProductAsync(product, image) {
    const sql = `UPDATE Products SET
                 ProductName = ?,
                 UnitPrice = ?,
                 UnitsInStock = ?
                 WHERE ProductID = ?`;
    const info = await dal.executeAsync(sql,[product.name,product.price,product.stock,product.id]);

    // Save image if exists: 
    if(image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        const fileName = product.id + extension;
        product.imageName = fileName;
        const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
        await image.mv(absolutePath);
    }

    return info.affectedRows === 0 ? null : product;
}

async function deleteProductAsync(id) {

    const sql = `DELETE FROM Products WHERE ProductID = ?`;
    await dal.executeAsync(sql,[id]);
    const fileName = id + ".jpg";
    const absolutePath = path.join(__dirname, "..", "images", "products", fileName);
    filesHelper.safeDelete(absolutePath);
}

module.exports = {
    getAllProductsAsync,
    getOneProductAsync,
    addProductAsync,
    updateProductAsync,
    deleteProductAsync
};
