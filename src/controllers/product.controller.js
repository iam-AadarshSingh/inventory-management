import path from 'path'
import ProductModel from '../models/product.model.js'
import { access } from 'fs'
export default class ProductController {
    getProduct(req, res) {
        let products = ProductModel.get()
        console.log(products)
        res.render("products", { products: products })
        //return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.ejs'))
    }

    getAddForm(req, res) {
        return res.render('new-product');
    }

    addNewProduct(req, res) {
        //access data from form
        console.log(req.body)
        let products = ProductModel.get()
        res.render('products', { products: products })
    }
}