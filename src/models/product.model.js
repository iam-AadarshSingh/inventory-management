export default class ProductModel {
    constructor(_id, _name, _desc, _price, _imageurl) {
        this._id = _id,
            this._name = _name,
            this._desc = _desc,
            this._price = _price,
            this.imageurl = _imageurl
    }

    static getAll() {
        return products;
    }

    static update(productobj) {
        const index = products.findIndex((p) => p._id == productobj._id);
        products[index] = productobj;
    }

    static add(name, desc, price, imageurl) {
        let newProduct = new ProductModel(
            products.length + 1,
            name,
            desc,
            price,
            imageurl);
        products.push(newProduct);
    }

    static getById(_id) {
        return products.find((p) => p._id == _id);
    }

    //Delete product method
    static delete(_id) {
        const index = products.findIndex((p) => p._id == _id);
        products.splice(index, 1);
    }
}

var products = [
    new ProductModel(1, "Product 1", 'Description of Product 1', 19.99, 'https://m.media-amazon.com/images/I/4190S1TDr5L.jpg'),
    new ProductModel(2, 'Product 2', 'Description of Product 2', 29.99, 'https://m.media-amazon.com/images/I/4190S1TDr5L.jpg'),
    new ProductModel(3, 'Product 3', 'Description of Product 3', 39.99, 'https://m.media-amazon.com/images/I/4190S1TDr5L.jpg')
]