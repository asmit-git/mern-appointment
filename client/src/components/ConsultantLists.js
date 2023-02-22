import React from 'react'
import { useNavigate } from 'react-router-dom'

const ConsultantLists = ({ consultant }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='card p-2 m-2' style={{cursor:"pointer"}} onClick={() => navigate(`/consultants/book-consultant/${consultant._id}`)}>
                <div className='card-header'>
                    Mr. {consultant.firstName} {consultant.lastName}
                </div>
                <div className='card-body'>
                    <p>
                        <b>Specialization:</b> {consultant.specialization}
                    </p>
                    <p>
                        <b>Experience:</b> {consultant.experience}
                    </p>
                    <p>
                        <b>Consultation Fees:</b> {consultant.consultationFees}/Hour
                    </p>
                    <p>
                        <b>Available between :</b> {consultant.times[0]} - {consultant.times[1]}
                    </p>
                </div>
            </div>
        </>
    )
}

export default ConsultantLists