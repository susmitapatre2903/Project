
import '../user/student.css'
import { useHistory } from "react-router-dom"
import { useLocation } from 'react-router';

const Student = () => {

    const location = useLocation()
    const student = location.state.student
    const history = useHistory()

    const logout = () => {
        alert("You are Logged out, see you")
        history.push("/");
    }

    return (
        <div >
            Welcome {student.username};
            <div></div>
            <button onClick={logout} className="btn btn-outline-light btn-lg px-5 colour" type="submit">Logout</button>
        </div>
    )
}

export default Student