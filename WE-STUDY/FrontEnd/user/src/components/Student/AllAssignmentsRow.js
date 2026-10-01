import axios from "axios"
import { URL } from '../../constants/constant';

const AllAssignmentsRow = ({ list, index, standard, division, teacherid }) => {

    const deleteAssignment = (list) => {

        axios.get(URL + '/deletestudentassignment/' + list.id).then((response) => {

            const result = response.data;
            if (result.status === "success") {
                alert("successfully deleted assignment" + list.assignment.assignment_title)
                window.location.reload(false);
            } else {
                alert("something went wrong")
            }
            console.log(result)
        })
    }

    console.log(list.studentdetails.user.firstname + " " + list.studentdetails.user.lastname)

    return (
        <tr >
            <th scope="row">{index + 1}</th>
            <td >{list.studentdetails.user.firstname + " " + list.studentdetails.user.lastname}</td>
            <td > {list.studentdetails.user.email}</td>
            <td>
                <a href={"/viewstudentassign/" + list.assignment.assignment} >{list.assignment.assignment_title}</a>
            </td>
            <td> <button onClick={() => { deleteAssignment(list) }} className="btn btn-primary btn-sm px-3 " type="submit" >delete</button></td>
        </tr>
    )
}

export default AllAssignmentsRow