const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    
    async authMiddleware(req, res, next){

        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new HttpException('Token is required.', 401, 'token_not_informed');
        }

        const [, token] = authHeader.split(' ');

        if (!token) {   
            res.status(401).json({
                message: 'Token not found.',
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            return next();
        } catch (err) {
            res.status(401).json({
                message: 'Token is invalid or expired.',
            })
        }

    }
}