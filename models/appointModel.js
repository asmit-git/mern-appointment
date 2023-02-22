const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    consultantId: {
        type: String,
        required:true
    },
    consultantInfo: {
        type: String,
        required:true
    },
    userInfo: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true,
        default:'pending'
    },
    time: {
        type: String,
        required:true
    }
}, { timeStamps: true })


const appointmentModel = mongoose.model('appointments',appointmentSchema)

module.exports = appointmentModel;