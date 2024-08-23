import path from 'path'
import ProductModel from '../models/product.model.js'
import { access } from 'fs'
class ProductController {
    getProduct(req, res) {
        let products = ProductModel.getAll()
        //console.log(products)
        res.render("index", { products: products })
        //return res.sendFile(path.join(path.resolve(), 'src', 'views', 'index.ejs'))
    }

    getAddForm(req, res) {
        return res.render('new-product', { errorMessage: null });
    }

    postAddProduct(req, res, next) {
        const { name, desc, price } = req.body;
        const imageurl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageurl);
        var products = ProductModel.getAll()
        return res.render('index', { products: products })
    }

    getUpateProductView(req, res, next) {
        //1. If product exist then return view
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (productFound) {
            res.render('update-product', { product: productFound, errorMessage: null });
        }
        //2. else return errors
        else {
            res.status(401).send("Product not Found")
        }
    }

    postUpdateProduct(req, res) {
        ProductModel.update(req.body);
        var products = ProductModel.getAll();
        res.render('index', { products });
    }

    //Delete Product Function
    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if (productFound) {
            return res.status(401).send("Product not Found")
        }
        ProductModel.delete(id);
        var products = ProductModel.getAll();
        res.render('index', { products });
    }
}

export default ProductController;