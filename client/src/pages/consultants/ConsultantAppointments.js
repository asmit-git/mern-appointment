import { message, Table } from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

const ConsultantAppointments = () => {
  const [bookings, setBookings] = useState([])

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/consultant/consultant-appointments', {
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/consultant/handle-appointments', {
        appointmentsId: record._id,
        status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        message.success(res.data.message)
        getAppointments();
      } else {
        message.error("something went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

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
    }, {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' ?
            <div className='d-flex'>
              <button className='btn btn-success m-1' onClick={() => handleStatus(record, 'approved')}>Approve</button>
              <button className='btn btn-danger m-1' onClick={() => handleStatus(record, 'rejected')}>Reject</button>
            </div> : ""}
        </div>
      )
    },
  ]
  return (
    <Layout>
      <h1>Appointments Lists</h1>
      <Table columns={columns} dataSource={bookings} />
    </Layout>
  )
}

export default ConsultantAppointments