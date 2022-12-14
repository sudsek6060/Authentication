const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    console.log(req.cookies);
    const {token} = req.cookies

    //what if token is not there
    if (! token) {
        return res.status(403).send("token is missing")
    }

    //verify token
    try {
        const decode = jwt.verify(token, "shhh")
        console.log(decode);
        req.newUser = decode
    } catch (error) {
        res.status(403).send("token is invalid")
    }
    return next();
}

module.exports = auth;