import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import moment from 'moment'
import { Table } from 'antd'

const Appointments = () => {
    const [bookings, setBookings] = useState([])

    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setBookings(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAppointments();
    }, [])

    console.log(bookings)

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'

        }, {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.consultantInfo.firstName}  {record.consultantInfo.lastName}
                </span>
            )
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            render: (text, record) => (
                <span>
                    {record.consultantInfo.phone}
                </span>
            )
        }, {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        }, {
            title: 'Status',
            dataIndex: 'status'
        }
    ]
    return (
        <Layout>
            <h1>Appointments Lists</h1>
            {bookings.length > 0 && <Table columns={columns} dataSource={bookings} />}
        </Layout>
    )
}

export default Appointments