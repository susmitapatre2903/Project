import axios from "axios"
import { URL } from '../../constants/constant';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


const StudentTableRow = ({ list, index, standard, division, studentid, instituteid }) => {

    const history = useHistory()
    const deleteAssignment = (list) => {

        console.log(list.id)
        axios.get(URL + '/deleteassignment/' + list.id).then((response) => {
            console.log(list.id)
            const result = response.data;
            if (result.status === "success") {
                alert("successfully deleted assignment" + list.assignment_title)
            } else {
                alert("something went wrong")
            }
            console.log(result)
        })
        window.location.reload(false);
    }

    //<a className="text-white" href={"/studentassign/"+ list.id + "/" + standard + "/" + division}>students assignment</a> 
    const toAssignment = (list) => {
        history.push("/viewassignstudent/" + studentid + "/" + instituteid, { student: list });
    }


    return (
        <tr >
            <th scope="row">{index + 1}</th>
            <td onClick={() => toAssignment(list)} ><a href="" >{list.assignment_title}</a></td>
            <td > {list.deadline}</td>
        </tr>
    )
}

export default StudentTableRow