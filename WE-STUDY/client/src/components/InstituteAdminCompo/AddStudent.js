import '../user/login.css'

import { useHistory, useParams } from "react-router-dom"
import { useLocation } from 'react-router';

const AddStudent = () => {

    const { instituteId } = useParams()
    const id = { instituteId }.instituteId

    console.log(id)
    
    const location = useLocation()
    const history = useHistory()

    return (
        <div >
            Welcome
        </div>
    )
}

export default AddStudent