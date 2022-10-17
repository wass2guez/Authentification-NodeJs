const { body , validationResult} = require ("express-validator")


const registerValidators = () => [

    // (nom du champ , msg d'erreur)
    body("name" , "name is required").notEmpty().isLength({max : 20}),
    body("lastName" , "lastName is required").notEmpty(),
    body("email" , "email is not valid").isEmail(),
    body("password" , "password must contains 6 caracters ").isLength({ min : 5 , max : 20}),
]

const loginValidator = () => [
    body("email" , "email is not valid").isEmail(),
    body("password" , "password must contains 6 caracters ").isLength({ min : 5 , max : 20}),
]

const validator = ( req , res , next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
return res.send( customError(errors.array()))
    }
    // si pas d'err passe au middleware suivant
    else next()
}

//cistomize errors 
const customError = (errorsAarray)=> errorsAarray.map((err) => ({ msg : err.msg}))

module.exports = {
    validator , 
    loginValidator,
    registerValidators,
}
