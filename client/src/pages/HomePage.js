import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { message, Row } from 'antd'
import ConsultantLists from '../components/ConsultantLists'

const HomePage = () => {
  const [consultants, setConsultants] = useState([])

  //get consultant data
  const getConsultants = async () => {
    try {
      const res = await axios.get('/api/v1/user/getAllConsultants', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setConsultants(res.data.data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getConsultants();
  }, []);

  return (
    <Layout>
      <h1 className='text-center'>HomePage</h1>
      <Row>
        {consultants && consultants.map((consultant, key) => (
          <ConsultantLists key={key} consultant={consultant} />
        ))}
      </Row>
    </Layout>
  )
}

export default HomePage