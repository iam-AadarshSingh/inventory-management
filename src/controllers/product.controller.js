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
        ProductModel.add(req.body);
        var products = ProductModel.getAll()
        return res.render('index', { products: products })
    }
}

export default ProductController;