const { register, login, editProfile } = require('../Controllers/authControllers');
const { checkUser } = require('../Middleware/authMiddleware');
const store = require('../Multer/multer')
const router = require('express').Router();

router.post('/',checkUser)
router.post('/register',register)
router.post('/login',login)
router.post('/editProfile',store.any('Image'),editProfile)
module.exports = router