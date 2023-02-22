const express = require('express');
const { getConsultantInfoController, updateProfileController, getConsultantById, consultantAppointmentController, handleAppointmentStatus } = require('../controllers/consultantInfoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

// Post single consultant info
router.post('/getConsultantInfo',authMiddleware, getConsultantInfoController)

//Post Update Profile
router.post('/updateProfile',authMiddleware,updateProfileController)

//POST Get consultant by id
router.post('/getConsultantById',authMiddleware,getConsultantById)

//Get Appointments for doctor
router.get('/consultant-appointments', authMiddleware, consultantAppointmentController)

//Approve or Unapprove appointments
router.post('/handle-appointments', authMiddleware,handleAppointmentStatus)

module.exports = router