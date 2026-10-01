import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios';
import StudentAssignmentRow from './StudentAssignmentRow';
import FaceIcon from '@mui/icons-material/Face';
import { SubjectBarData } from "../SubjectBarData";
import "../teacher.css"
import TableRow from "./TableRow"
import "./login.css"
import { URL } from '../../../constants/constant';
import SideBar from './SideBar';
import image from "../images/logo.jpg"

const StudentAssignment = () => {

    const location = useLocation()
    const student = location.state.student
    console.log(student)
    const { teacherid } = useParams()
    const Teacherid = { teacherid }.teacherid
    const { id } = useParams()
    const instituteId = { id }.id
    const [assignmentList, setAssignmentList] = useState([])
    const [list, setList] = useState([])
    const [teacherStdDivList, setTeacherStdDivList] = useState([])
    const [teacherName, setTeacherName] = useState("")
    const [teacherPhoto, setTeacherPhoto] = useState(undefined)
    const [teacherSubList, setTeacherSubList] = useState([])
    const [AllDivisionWrtStandard, setAllDivisionWrtStandard] = useState([])
    const [division, setDivision] = useState(-1)
    const [standard, setStandard] = useState(-1)
    const [subject, SetSubject] = useState([])
    const [allstandard, setAllStandard] = useState([])
    const [deadline, setDeadline] = useState("")
    const [pdf, setPdf] = useState(undefined)
    const [title, setTitle] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [subjectNameDIV, setSubjectNameDIV] = useState(false)
    const subjectName = subject.sub_name
    const body = new FormData()
    const history = useHistory()
    useEffect(() => { loadTeacherStandardDivSub() }, [])
    useEffect(() => { loadAssignment() }, [])

    const loadTeacherStandardDivSub = () => {

        axios.get(URL + '/finduser/' + Teacherid).then((response) => {
            const result = response.data;
            console.log(result)
            console.log(result.teacherStdDivList)
            setInstituteName(result.instituteid.name)
            setTeacherStdDivList(result.teacherStdDivList)
            setTeacherSubList(result.subjectTeacherStdList)
            setTeacherName(result.firstname + " " + result.lastname)
            setTeacherPhoto(result.profilepicture)
            console.log(teacherSubList)
        })
    }

    const loadAssignment = () => {

        axios.get(URL + '/findAssigmentById/' + student.id).then((response) => {
            const result = response.data;
            console.log(result.data)
            setAssignmentList(result.data)
        })
    }

    const logout = () => {
        alert("You are Logged out, see you")
        history.push("/");
    }

    return (
        <div>
            <div className="row row-height" >
                <div className="col-sm-2 Sidebar">
                    <div className="height">
                        <div><img src={image} className="image" /> </div>
                        <div className="text-white">{instituteName}</div>
                    </div>
                    <ul className="SidebarList" >
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/dashboard/" + teacherid + "/" + id} >   Dashboard </a>  </div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/timetable/" + teacherid + "/" + id} >Timetable</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/notice/" + teacherid + "/" + id} >Notice</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/profile/" + teacherid + "/" + id} >Profile</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/help/" + teacherid + "/" + id} >Help</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect text-light" id="title" onClick={logout}  >logout</div>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-10 p-0">
                    <div className="  Bar ">
                        <div className="adjust">
                            <div className="m name">{teacherName} </div>
                            <div className="m "><img src={URL + '/' + teacherPhoto} className="profile-bar" />  </div>
                        </div>
                    </div>
                    <div className=" SubjectBar row">
                        <div className="SubjectBar-row ">
                            <div className="effect" id="title"  >
                                {student.assignment_title}
                            </div>
                        </div>
                    </div>
                    <div className="changeable">
                        <div className="table-height1">
                            <table class="table table-striped r-10">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">name</th>
                                        <th scope="col">email</th>
                                        <th scope="col">assignment title</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        assignmentList.map((list, index) => {
                                            return <StudentAssignmentRow list={list} index={index} standard={standard} division={division} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="table-height2 ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentAssignment