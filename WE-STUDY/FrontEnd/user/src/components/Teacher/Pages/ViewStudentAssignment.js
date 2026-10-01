import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../../constants/constant';
import "../teacher.css"
const ViewStudentAssignment = () => {

    const [assignment, setAssignment] = useState(undefined)
    const { id } = useParams()
    const assignmentid = { id }.id

    return (
        <div>
            <div><img src={URL + '/' + assignmentid} className="assignmentsize" /></div>
        </div>
    )
}

export default ViewStudentAssignment