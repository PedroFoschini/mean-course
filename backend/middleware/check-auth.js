const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; // "barrear 84r6we46r7eqr86q7rq68wr7"
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error){
        res.status(401).json({ message: "You are not authenticated" });
    }
};