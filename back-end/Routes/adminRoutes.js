const { Adminlogin, getUserDatas, updateUser, deleteUser } = require('../Controllers/authControllers');
const { checkAdmin } = require('../Middleware/authMiddleware');

const router = require('express').Router();

router.post('/',checkAdmin)
router.post('/login',Adminlogin) 
router.post('/edit-user',updateUser) 
router.post('/delete-user',deleteUser) 
router.get('/getuserdatas',getUserDatas)

module.exports=router