import express from 'express'
import ProductController from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path'
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
const server = express();

//Adding JavaScript file here from public folder
server.use(express.static("public"));

//Configuring session middleware
server.use(session(
    {
        secret: 'SecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }
));

//parse from data
server.use(express.urlencoded({ extended: true }))

//View engine setup
server.set('view engine', 'ejs')
server.set("views", path.join(path.resolve(), 'src', 'views'))

server.use(ejsLayouts);

//Create an instance of ProductController
const productController = new ProductController();
server.get(
    "/",
    auth,
    productController.getProduct)

server.get(
    '/update-product/:id',
    auth,
    productController.getUpateProductView)

server.get(
    '/new',
    auth,
    productController.getAddForm);


//Deleting the product
server.post('/delete-product/:id', auth, productController.deleteProduct)

server.post(
    '/',
    auth,
    uploadFile.single('imageurl'), //adding file-upload middleware
    validationMiddleware,
    productController.postAddProduct)

server.post(
    "/update-product",
    auth,
    productController.postUpdateProduct);

//Create an instance of ProductController
const usersController = new UserController();
server.get('/register', usersController.getRegister);
server.get('/login', usersController.getLogin);
server.post('/login', usersController.postLogin);
server.post(
    '/register',
    usersController.postRegister);

//server.use(express.static('src/views'))

server.listen(3400);