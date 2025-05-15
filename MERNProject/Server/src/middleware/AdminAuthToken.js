require('dotenv').config();
const jwt = require('jsonwebtoken');

// Authentication Middleware
exports.AdminAuthenticate = async (req, res, next) => {
    try {
    
        const token = req.headers['x-api-key'];
        if (!token) {
            return res.status(403).send({ status: false, message: 'Access denied. Token is required.' });
        } 

        const decoded = jwt.verify(token, process.env.AdminToken);
        if (!decoded) {
            return res.status(403).send({ status: false, message: 'Access denied. Invalid token.' });
        }

        req.userId = decoded.id; // Attach user ID to request for further use
        next();
    } catch (err) {
        res.status(500).send({ status: false, message: `Authentication failed: ${err.message}` });
    }
};

// Authorization Middleware
exports.AdminAuthorize = async (req, res, next) => {
    try {
        const loggedInUserId = req.userId;
        const targetUserId = req.params.id;

        if (loggedInUserId !== targetUserId) {
            return res.status(403).send({ status: false, message: 'Unauthorized access. You are not allowed to perform this action.' });
        }

        next();
    } catch (err) {
        res.status(500).send({ status: false, message: `Authorization failed: ${err.message}` });
    }
};
