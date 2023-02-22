const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const consultantModel = require('../models/consultantModel')
const appointmentModel = require('../models/appointModel')

//User registration callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({ message: "user already exist", success: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, salt)
        req.body.password = hashedPwd
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({ message: "Registration successful", success: true });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Register controller ${error.message}` })
    }
}

//Login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(200).send({ message: "user not found", success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(200).send({ message: "Invalid email or password", success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({ message: "login success", success: true, token })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: `Error in login: ${error.message}` })
    }
}

//authController Callback
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        const { password, ...others } = user._doc;

        if (!user) {
            return res.status(200).send({
                message: "User not found",
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: others
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Auth error', success: false, error })
    }
}

//Apply consultant callback
const applyConsultantController = async (req, res) => {
    try {
        const newConsultant = await consultantModel({ ...req.body, status: "pending" });
        await newConsultant.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notifications = adminUser.notifications;
        notifications.push({
            type: "apply-consultant-request",
            message: `${newConsultant.firstName} ${newConsultant.lastName} Has Applied For A Consultant Account`,
            data: {
                consultantId: newConsultant._id,
                name: newConsultant.firstName + " " + newConsultant.lastName,
                onClickPath: "/admin/consultants",
            },
        });
        await userModel.findByIdAndUpdate(adminUser._id, { notifications });
        res.status(201).send({
            success: true,
            message: "Consultant Account Applied SUccessfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error WHile Applying For Consultant",
        });
    }
};

//Get all notifications
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seennotifications = user.seennotifications;
        const notifications = user.notifications;
        seennotifications.push(...notifications);
        user.notifications = [];
        user.seennotifications = notifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: "all notifications marked as read",
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error getting notifications",
        });
    }
}

//Get all notifications
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.notifications = [];
        user.seennotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: "notifications cleared",
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error clearing notifications",
        });
    }
}

const getAllConsultantsController = async (req, res) => {
    try {
        const consultants = await consultantModel.find({ status: 'approved' })
        res.status(200).send({
            success: true,
            message: "Consultants fetched successfully",
            data: consultants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Fetching Consultants",
        });
    }
}

//Book appointment
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time, 'HH:mm').toISOString();
        req.body.status = 'pending'
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({ _id: req.body.consultantInfo.userId })
        user.notifications.push({
            type: 'New-appointment-request',
            message: `You have received new appointment request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Booked successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error Booking Appointment",
        });
    }
}

const bookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YY').toISOString()
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString()
        const consultantId = req.body.consultantId
        const appointments = await appointmentModel.find({
            consultantId, date, time: {
                $gte: fromTime, $lte: toTime
            }
        })
        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointments slots not available",
                success: false
            })
        } else {
            return res.status(200).send({
                message: "Appointments slot available",
                success: true
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Booking Availability",
        });
    }
}

const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId })
        res.status(200).send({
            success:true,
            message: "Users appointment fetched successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Appointments",
        });
    }
}



module.exports = { loginController, registerController, authController, applyConsultantController, getAllNotificationController, deleteAllNotificationController, getAllConsultantsController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController };