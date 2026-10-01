import axios from "axios"
import { URL } from "../../../constants/constant"
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';


const TableRow = ({ list, index, standard, division, teacherid, instituteid }) => {

    useEffect(() => { loadprop() }, [])
    const history = useHistory()
    const [data, setData] = useState()
    const [id, setId] = useState(-1)
    const [std, setStd] = useState(-1)
    const [div, setDiv] = useState(-1)
    const [teacher, setTeacher] = useState(-1)

    const loadprop = () => {
        setStd(standard)
        setDiv(division)
        setTeacher(teacherid)
    }

    console.log(standard + " " + division + " " + teacherid)

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

    const toStudentAssignment = (list) => {
        history.push("/studentassign/" + teacherid + "/" + instituteid, { student: list });
    }

    return (
        <tr >
            <th scope="row">{index + 1}</th>
            <td ><a href={"/viewassign/" + list.id} >{list.assignment_title}</a></td>
            <td > {list.deadline}</td>
            <td>
                <tr>
                    <td><button onClick={() => toStudentAssignment(list)} className="btn btn-primary btn-sm px-3 r-5" type="submit" >students assignment </button></td>
                    <td> <button onClick={() => { deleteAssignment(list) }} className="btn btn-primary btn-sm px-3 " type="submit" >delete</button></td>
                </tr>
            </td>
        </tr>
    )
}

export default TableRow