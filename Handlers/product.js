"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updataAvailability = exports.updateProduct = exports.createProduct = exports.getProductByID = exports.getProducts = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProducts = async (req, res) => {
    const products = await Product_model_1.default.findAll({
        order: [
            ['id', 'ASC']
        ],
        attributes: ['id', 'name', 'price', 'availability']
    });
    res.json({ data: products });
};
exports.getProducts = getProducts;
const getProductByID = async (req, res) => {
    try {
        const product = await Product_model_1.default.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductByID = getProductByID;
const createProduct = async (req, res) => {
    try {
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_model_1.default.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        await product.update(req.body);
        await product.save();
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateProduct = updateProduct;
const updataAvailability = async (req, res) => {
    try {
        const product = await Product_model_1.default.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updataAvailability = updataAvailability;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_model_1.default.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        await product.destroy();
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map