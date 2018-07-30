const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) return res.status(400).json({message: 'missing token'});
    // console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    try {
        // const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = jwt.verify(token, process.env.JWT_KEY);
        next()
    } catch (e) {
        return res.status(401).json({message: 'user unauthorized'})
    }
};