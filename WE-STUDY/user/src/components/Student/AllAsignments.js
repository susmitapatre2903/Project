import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import axios from 'axios';
import "./login.css"
import "./teacher.css"
import { URL } from '../../constants/constant';
import AllAssignmentsRow from './AllAssignmentsRow';

const AllAssignments = () => {

    const location = useLocation()
    const student = location.state.student
    console.log(student)
    const { studentid } = useParams()
    const studentId = { studentid }.studentid
    const { id } = useParams()
    const instituteId = { id }.id
    useEffect(() => { loadStudentStandardDivSub() }, [])
    const [assignmentList, setAssignmentList] = useState([])
    const [teacherSubList, setTeacherSubList] = useState([])
    const [division, setDivision] = useState(-1)
    const [standard, setStandard] = useState(-1)
    const [subject, SetSubject] = useState([])
    const [instituteName, setInstituteName] = useState("")
    const [studentName, setStudentName] = useState("")
    const [studentPhoto, setStudentPhoto] = useState(undefined)
    const [divisionName, setDivisionName] = useState("")
    const [standardName, setStandardName] = useState("")
    const [allstandard, setAllStandard] = useState([])
    const [pdf, setPdf] = useState(undefined)
    const [title, setTitle] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [subjectList, setSubjectList] = useState([])
    const [subjectid, setSubjectId] = useState(-1)
    const [subjectNameDIV, setSubjectNameDIV] = useState(false)
    const [changeDIV, setChangeDIV] = useState(false)
    const body = new FormData()
    const history = useHistory()
    useEffect(() => { loadAssignment() }, [])

    const loadStudentStandardDivSub = () => {

        axios.get(URL + '/finduser/' + studentId).then((response) => {
            const result = response.data;
            console.log(result)

            setInstitutePhoto(result.instituteid.profilepicture)

            console.log(result.teacherStdDivList)

            setInstituteName(result.instituteid.name)
            setStudentName(result.firstname + " " + result.lastname)
            setStudentPhoto(result.profilepicture)
        })

        axios.get(URL + '/findStdDiv/' + studentId).then((response) => {

            const result = response.data;
            console.log(result)
            setStandard(result.data.std_id)
            setDivision(result.data.div_id)
            console.log(division)

            if (division === 1) {
                setDivisionName("A")
            } else if (division === 2) {
                setDivisionName("B")
            } else if (division === 3) {
                setDivisionName("C")
            } else {
                setDivisionName("")
            }
            axios.get(URL + '/findstd/' + result.data.std_id).then((response) => {
                const result = response.data;
                console.log(result)
                setSubjectList(result.data.subjectList)
                setStandardName(result.data.standardName)
            })
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
                        <div><img src={URL + "/" + institutePhoto} className="image" /> </div>
                        <div className="text-white">{instituteName}</div>
                    </div>
                    <ul className="SidebarList" >
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/studentdash/" + studentid + "/" + id} >   Dashboard </a>  </div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/studenttimetable/" + studentid + "/" + id} >Timetable</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/notice/" + studentid + "/" + id} >Notice</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/profile/" + studentid + "/" + id} >Profile</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/help/" + studentid + "/" + id} >Help</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect text-light" id="title" onClick={logout}  >logout</div>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-10 p-0">
                    <div className="  Bar ">
                        <div className="adjust">
                            <div className="w-15 btn btn-outline-dark me-2" ><label htmlFor="">Standard: {standardName} </label>
                            </div>
                            <div className="m name">{studentName} </div>
                            <div className="m "><img src={URL + '/' + studentPhoto} className="profile-bar" />  </div>
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
                                            return <AllAssignmentsRow list={list} index={index} standard={standard} division={division} />
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

export default AllAssignments