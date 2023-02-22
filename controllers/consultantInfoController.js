const appointmentModel = require('../models/appointModel');
const consultantModel = require('../models/consultantModel');
const userModel = require('../models/userModels');

const getConsultantInfoController = async (req, res) => {
    try {
        const consultant = await consultantModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "consultant data fetch successfully",
            data: consultant
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching Consultant details"
        })
    }
}

const updateProfileController = async (req, res) => {
    try {
        const consultant = await consultantModel.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(200).send({
            success: true,
            message: "consultant data updated successfully",
            data: consultant
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating Consultant details"
        })
    }
}

const getConsultantById = async (req, res) => {
    try {
        const consultant = await consultantModel.findOne({ _id: req.body.consultantId })
        res.status(200).send({
            success: true,
            message: "consultant data fetch successfully",
            data: consultant
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching Consultant"
        })
    }
}

const consultantAppointmentController = async (req, res) => {
    try {
        const consultant = await consultantModel.findOne({ userId: req.body.userId })
        const appointments = await appointmentModel.find({ consultantId: consultant._id })
        res.status(200).send({
            success: true,
            message: "consultant data fetch successfully",
            data: appointments
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in fetching Consultant Appointments"
        })
    }
}

const handleAppointmentStatus = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status })
        const user = await userModel.findOne({ _id: appointments.userId })
        user.notifications.push({
            type: 'appointment-status-updated',
            message: `Your appointment is updated to ${status}`,
            onClickPath: '/user/appointments'
        })
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updating Consultant Appointments"
        })
    }
}

module.exports = { getConsultantInfoController, updateProfileController, getConsultantById, consultantAppointmentController, handleAppointmentStatus }