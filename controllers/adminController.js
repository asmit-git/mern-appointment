const consultantModel = require('../models/consultantModel')
const userModel = require('../models/userModels')

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: "users data list",
            data: users
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while fetching users"
        })
    }
}

const getAllConsultantsController = async (req, res) => {
    try {
        const consultants = await consultantModel.find({})
        res.status(200).send({
            success: true,
            message: "consultants data list",
            data: consultants
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while fetching Consultants"
        })
    }
}

//Consultant Account status
const changeAccountStatusController = async (req, res) => {
    try {
        const {consultantId, status} = req.body
        const consultant = await consultantModel.findByIdAndUpdate(consultantId,{status})
        const user = await userModel.findOne({_id:consultant.userId})
        const notifications = user.notifications 
        notifications.push({
            type:'consultant-account-request-approval',
            message:`Your Consultant Account Request Status is:  ${status}`,
            onClickPath:'/notifications'
        })
        user.isConsultant = status === 'approved' ? true : false;
        await user.save()
        res.status(201).send({
            success:true,
            message:'Account Status Updated',
            data: consultant
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while changing account status"
        })
    }
}

module.exports = { getAllUsersController, getAllConsultantsController, changeAccountStatusController }