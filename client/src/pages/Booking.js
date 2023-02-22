import { DatePicker, message, TimePicker } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'

const Booking = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const [consultant, setConsultant] = useState([])
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [block, setBlock] = useState()

  //get consultant data
  const getConsultant = async () => {
    try {
      const res = await axios.post('/api/v1/consultant/getConsultantById',
        { consultantId: params.consultantId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        })
      if (res.data.success) {
        setConsultant(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*----------booking appointment-----------*/
  const bookAppointment = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/book-appointment',
        {
          consultantId: params.consultantId,
          userId: user._id,
          consultantInfo: consultant,
          date: date,
          userInfo: user,
          time: time
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {
        setBlock(true);
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  const handleAvailability = async () => {
    try {
      setBlock(true);
      if(!date && !time){
        return alert("Date and Time Required")
      }
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/booking-availability',
        {
          consultantId: params.consultantId, date, time
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setBlock(true);
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  useEffect(() => {
    getConsultant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <h3>Book Consultant</h3>
      <div className='container'>
        {consultant && (
          <>
            <h4>
              Mr.{consultant.firstName} {consultant.lastName}
            </h4>
            <h4>Fees: {consultant.consultationFees}</h4>
            {/* <h4>Available between: {consultant.times[0]} - {consultant.times[1]}</h4> */}
            <div className='d-flex flex-column w-50'>
              <DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value) => {
                // setBlock(false)
                setDate(moment(value).format("DD-MM-YYYY"))
              }} />
              <TimePicker className='m-2' format="HH:mm" onChange={(value) => {
                // setBlock(false)
                setTime(
                  moment(value).format("HH:mm")
                )
              }} />
              <button className='btn btn-primary mt-2' onClick={handleAvailability}>
                Check Availability
              </button>
              {/* {!block &&
                <button className='btn btn-dark mt-2' onClick={bookAppointment}>
                  Book Consultant
                </button>
              } */}
              <button className='btn btn-dark mt-2' onClick={bookAppointment}>
                  Book Consultant
                </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Booking