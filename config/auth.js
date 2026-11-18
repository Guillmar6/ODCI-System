const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.redirect('/');

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if(err) return res.status(401);
        
        req.user = user;
        next();
    });
};
const authorizedRole = (...role) => {
    return (req, res, next) => {
        if(!req.user || !role.includes(req.user.role)) return res.status(403).json({error: 'You are not authorize to access.'});
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizedRole
};