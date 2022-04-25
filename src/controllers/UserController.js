require('dotenv').config();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class HttpException extends Error {
    message;
    status;
    code;

    constructor(message, status, code) {
        super(message);
        this.message = message;
        this.status = status;
        this.code = code;
    }
}

module.exports = {

    async createUser(req, res) {

        function validadeUserFields(name, email, password){

            if(!name || !email || !password){
                throw new HttpException('Fill in all fields', 400, 'Fill in all fields');
            }
            if(password.length < 6){
                throw new HttpException('Password must be at least 6 characters long', 400, 'Password must be at least 6 characters long');
            } else if( password.length > 16){
                throw new HttpException('The password must be a maximum of 16 characters', 400, 'The password must be a maximum of 16 characters');
            }

            if(!email.includes('@') || !email.includes('.') || email.length > 50 ){ 
                throw new HttpException('Invalid email', 400, 'invalid email');
            }

            if(name.length > 50){
                throw new HttpException('Invalid name', 400, 'Invalid name');
            }
            
        }
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const userExist = await User.findOne({  where: { email:email } });
        if(userExist){
            throw new HttpException('User already exist', 400, 'user_already_exist');
        }

        const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        try {

            validadeUserFields(name, email, password);
            const user = await User.create({
                name,
                email,
                password: hash
            });

            return res.status(201).json({
                message: user,
                token
            });
            
        } catch (error) {
            if(error instanceof HttpException){
                res.status(error.status).json(error.message)
            }else {
                res.status(500).json(error);
            }
        }
    },

    async login(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
            if(!user){
                throw new HttpException('User not found', 400, 'user_not_found');
            }
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
                throw new HttpException('Invalid password', 400, 'invalid_password');
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({
                name,
                email,
                password,
                token
            });
        }
        catch (error) {
            if(error instanceof HttpException){
                res.status(error.status).json(error.message)
            }else {
                res.status(500).json(error);
            }
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}
