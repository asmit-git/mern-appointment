const express = require('express');
const { getAllUsersController, getAllConsultantsController, changeAccountStatusController } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

//GET Users
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET Consultants
router.get('/getAllConsultants', authMiddleware, getAllConsultantsController)

//POST Account Status
router.post('/changeAccountStatus',authMiddleware, changeAccountStatusController)

module.exports = router