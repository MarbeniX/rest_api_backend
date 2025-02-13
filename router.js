"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const product_1 = require("./Handlers/product");
const middlewares_1 = require("./middlewares");
const product_2 = require("./Handlers/product");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *  schemas:
 *     Product:
 *      type: object
 *      properties:
 *         id:
 *          type: integer
 *          description: The Products ID
 *          example: 1
 *         name:
 *          type: string
 *          description: The Product name
 *          example: Monitor curvo de 20 pulgadas
 *         price:
 *          type: integer
 *          description: The Product price
 *          example: 300
 *         availability:
 *          type: boolean
 *          description: The Product availability
 *          example: true
 */
/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Get a list of products
 *   tags:
 *    - Products
 *   description: Get a list of products
 *   responses:
 *    200:
 *     description: Successful respnse
 *     content:
 *       application/json:
 *          schema:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Product'
 */
router.get('/', product_1.getProducts);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *      - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the products to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *      200:
 *         description: Successful response
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Product'
 *      404:
 *          description: Not found
 *      400:
 *         description: Bad request - Invalid ID
 *
 * */
router.get('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), middlewares_1.handleInputErrors, product_2.getProductByID);
/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo de 20 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input
 */
router.post('/', (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre es requerido'), (0, express_validator_1.body)('price')
    .notEmpty().withMessage('El precio es requerido')
    .isNumeric().withMessage('El precio debe ser un número')
    .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'), middlewares_1.handleInputErrors, product_1.createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo de 20 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid input
 *          404:
 *              description: Product not found
 *
 */
router.put('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), (0, express_validator_1.body)('name')
    .notEmpty().withMessage('El nombre es requerido'), (0, express_validator_1.body)('price')
    .notEmpty().withMessage('El precio es requerido')
    .isNumeric().withMessage('El precio debe ser un número')
    .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'), (0, express_validator_1.body)('availability')
    .isBoolean().withMessage('Valor para disponibilidad no valido'), middlewares_1.handleInputErrors, product_1.updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a product by ID
 *      tags:
 *          - Products
 *      description: Returns the deleted product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          type:
 *              integer
 *      responses:
 *          200:
 *              description: Product deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Product deleted"
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 *
 */
router.delete('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), middlewares_1.handleInputErrors, product_1.deleteProduct);
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update the availability
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID
 *          404:
 *              description: Product not found
 */
router.patch('/:id', (0, express_validator_1.param)('id').isInt().withMessage('ID no valido'), middlewares_1.handleInputErrors, product_1.updataAvailability);
exports.default = router;
//# sourceMappingURL=router.js.map