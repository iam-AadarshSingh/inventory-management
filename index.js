import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path'
import validationMiddleware from './src/middlewares/validation.middleware.js';
const server = express();

//Adding JavaScript file here from public folder
server.use(express.static("public"));

//parse from data
server.use(express.urlencoded({ extended: true }))

//View engine setup
server.set('view engine', 'ejs')
server.set("views", path.join(path.resolve(), 'src', 'views'))

server.use(ejsLayouts);

//Create an instance of ProductController
const productController = new ProductController();
server.get("/", productController.getProduct)

server.get('/new', productController.getAddForm);
server.get('/update-product/:id', productController.getUpateProductView)

//Deleting the product
server.post('/delete-product/:id', productController.deleteProduct)

server.post(
    '/',
    validationMiddleware,
    productController.postAddProduct)

server.post(
    "/update-product",
    productController.postUpdateProduct);

//server.use(express.static('src/views'))

server.listen(3400);