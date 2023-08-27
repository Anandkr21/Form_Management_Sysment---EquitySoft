const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    authentication: async (req, res, next) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: "Unauthorized: Please login."
                });
            }

            jwt.verify(token, process.env.Secret_Key, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        status: false,
                        message: "Invalid token: Please provide a valid token."
                    });
                }

                // Attach the decoded payload to the request object for further use if needed
                req.user = decoded;

                // Proceed to the next middleware
                next();
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                error: error.message
            });
        }
    }
};
