import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../../constants/constant';
import "../teacher.css"
const ViewAssignment = () => {

    useEffect(() => { loadAssignment() }, [])
    const [assignment, setAssignment] = useState(undefined)
    const { aid } = useParams()
    const assignmentid = { aid }.aid
    const loadAssignment = () => {

        axios.get(URL + '/findassignmentbyid/' + assignmentid).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result.data.assignment)
                setAssignment(result.data.assignment)
            } else {
                alert("something went wrong")
            }
        })
    }

    return (
        <div>
            <div><img src={URL + '/' + assignment} className="assignmentsize" /></div>
        </div>
    )
}

export default ViewAssignment