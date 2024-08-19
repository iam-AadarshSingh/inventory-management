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
        return res.render('new-product', { errorMessage: null });
    }

    addNewProduct(req, res) {
        //Validating Data
        const { name, price, imageurl } = req.body;
        let errors = [];
        if (!name || name.trim() == '') {
            errors.push("Name is required");
        }
        if (!price || parseFloat(price) < 1) {
            errors.push("Price must br positive value");
        }
        try {
            const validUrl = new URL(imageurl)
        }
        catch (err) {
            errors.push("URL is invalid");
        }
        if (errors.length > 0) {
            return res.render('new-product', { errorMessage: errors[0] });
        }
        //access data from form
        ProductModel.add(req.body);
        var products = ProductModel.get()
        return res.render('products', { products: products })
    }
}

//export default ProductController;