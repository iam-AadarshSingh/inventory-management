import path from 'path'
import ProductModel from '../models/product.model.js'
export default class ProductController {
    getProduct(req, res) {
        let products = ProductModel.get()
        console.log(products)
        res.render("products", { products: products })
        //return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.ejs'))
    }
}