import { message, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

const Consultants = () => {
    const [consultants, setConsultants] = useState([])

    const getconsultants = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllConsultants', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setConsultants(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getconsultants()
    }, [])

    //Handle account status
    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/admin/changeAccountStatus', {
                consultantId: record._id, userId: record.userId, status: status
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                message.success(res.data.message)
                window.location.reload();
            }
        } catch (error) {
            message.error("something went wrong")
        }
    }

    //antd table cols

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Contact',
            dataIndex: 'phone',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === 'pending' ?
                        <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button> :
                        <button className='btn btn-danger'>Reject</button>}
                </div>
            )
        },
    ]

    return (
        <Layout>
            <h1>All consultants</h1>
            <Table columns={columns} dataSource={consultants} />
        </Layout>
    )
}

export default Consultants