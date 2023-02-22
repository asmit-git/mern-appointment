import React from 'react'
import Layout from '../components/Layout'
import { Col, Form, Input, message, Row, TimePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'

const ApplyConsultant = () => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-consultant', {
                ...values, userId: user._id, times: [
                    moment(values.times[0]).format("HH:mm"),
                    moment(values.times[1]).format("HH:mm"),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error("Something went wrong")
        }
    }
    return (
        <Layout>
            <h2 className='text-center'>Apply for consultant</h2>
            <Form layout='vertical' onFinish={handleFinish} className="m-3">
                <h4 className='text-left'>Personal Details:</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your first name'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your last name'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="phone" name="phone" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your phone number'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="email" name="email" required rules={[{ required: true }]}>
                            <Input type="email" placeholder='your email'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="website" name="website">
                            <Input type="text" placeholder='your website'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="address" name="address" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your address'>
                            </Input>
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className='text-left'>Professional Details:</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="specialization" name="specialization" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your specialization'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="experience" name="experience" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your experience'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Consultation Fees" name="consultationFees" required rules={[{ required: true }]}>
                            <Input type="text" placeholder='your consultation fees'>
                            </Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings available" name="times" required rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button type="submit" className='btn form-btn'>Submit</button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyConsultant