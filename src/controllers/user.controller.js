import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";
export default class UserController {

    //User registration
    getRegister(req, res) {
        res.render('register');
    }

    //Login
    getLogin(req, res) {
        res.render('login',
            {
                errorMessage: null,
            }
        );
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        UserModel.add(name, email, password);
        res.render('login',
            {
                errorMessage: null,
            }
        );
    }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = UserModel.isValidUser(email, password)
        if (!user) {
            return res.render('login',
                {
                    errorMessage: 'Invalid Credentials',
                }
            );
        }
        req.session.userEmail = email;
        let products = ProductModel.getAll();
        res.render('index', { products })
    }
}