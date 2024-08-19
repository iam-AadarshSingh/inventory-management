import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path'
const server = express();
//View engine setup
server.set('view engine', 'ejs')
server.set("views", path.join(path.resolve(), 'src', 'views'))
server.use(ejsLayouts);
//Create an instance of ProductController
const productController = new ProductController();
server.get("/", productController.getProduct)
server.use(express.static('src/views'))
server.listen(3400);