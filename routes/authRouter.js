const express = require ('express')

const router = express.Router()

const {validator , loginValidator , registerValidators} = require ('../middlewares/bodyValidator')

const { register , login , getAuthUser} = require('../controllers/authController')
const isAuth = require('../middlewares/isAuth')


/**
 * @params POST api/auth/register
 * @description register user
 * @access PUBLIC
 */
// on execute registervalidator puis validator d'err et enfin le register
router.post('/register', registerValidators(), validator, register)
router.post('/login' , loginValidator(), validator ,  login)
router.get('/me' , isAuth, getAuthUser)








module.exports = router