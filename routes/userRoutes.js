const express = require('express');
const {
    loginController,
    registerController,
    authController,
    applyConsultantController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllConsultantsController,
    bookAppointmentController,
    bookingAvailabilityController,
    userAppointmentsController
} = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router()

//Routes

//LOGIN || POST
router.post('/login', loginController)

//Register || POST
router.post('/register', registerController)

//Auth || POST
router.post('/getUserData',authMiddleware, authController)

//Apply Consultant || POST
router.post('/apply-consultant',authMiddleware, applyConsultantController)

//Get all notifications admin || POST
router.post('/get-all-notifications',authMiddleware, getAllNotificationController)

//Delete all notifications admin || POST
router.post('/delete-all-notifications',authMiddleware, deleteAllNotificationController)

//Get All consultatns
router.get('/getAllConsultants',authMiddleware,getAllConsultantsController)

//Book Appointment 
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//Check consultant availability for Appointment 
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

//Appointment lists
router.get('/user-appointments',authMiddleware,userAppointmentsController)
module.exports = router