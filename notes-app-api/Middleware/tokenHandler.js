const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (_req, res, next) => {
    let token;
    let authHeader = _req.headers.Authorization || _req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized" });
            } else {
                _req.user = decoded.user;
                console.log(decoded.user);
                next();
            }
        });
    } else {
        return res.status(401).json({ message: "Authorization header is missing or invalid" });
    }
});

module.exports = validateToken;