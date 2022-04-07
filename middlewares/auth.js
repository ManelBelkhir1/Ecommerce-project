const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {

    const token = req.header('Authorization')

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    }catch(err){
        res.status(401).json('you are not authorized')
    }

}


const  isAdmin = (req, res, next) => {
    const {role} = req.user

    if(role==="admin"){
        next()
    }else{
        res.status(401).json('you are not admin go away')
    }
}


module.exports = {
    checkAuth,
    isAdmin
}