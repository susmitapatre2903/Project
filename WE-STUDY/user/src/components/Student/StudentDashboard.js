import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./teacher.css"
import StudentTableRow from "./StudentTableRow"
import "./login.css"
import { URL } from '../../constants/constant';
import SubjectRow from './SubjectRow';

const StudentDashboard = () => {

    const { studentid } = useParams()
    const studentId = { studentid }.studentid
    const { id } = useParams()
    const instituteId = { id }.id
    const [studentName, setStudentName] = useState("")
    const [studentPhoto, setStudentPhoto] = useState(undefined)
    const [division, setDivision] = useState(-1)
    const [divisionName, setDivisionName] = useState("")
    const [standard, setStandard] = useState(1)
    const [standardName, setStandardName] = useState("")
    const [allstandard, setAllStandard] = useState([])
    const [assignmentList, setAssignmentList] = useState([])
    const [pdf, setPdf] = useState(undefined)
    const [title, setTitle] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [subjectList, setSubjectList] = useState([])
    const [subjectid, setSubjectId] = useState(-1)
    const [subjectNameDIV, setSubjectNameDIV] = useState(false)
    const [changeDIV, setChangeDIV] = useState(false)
    const body = new FormData()
    const history = useHistory()
    useEffect(() => { loadStudentStandardDivSub() }, [])
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

    const getAssignmentWrtStdDivSub = (list) => {

        console.log(standard)
        console.log(division)
        console.log(list)
        body.append('std_id', standard)
        body.append('div_id', division)
        body.append('sub_id', list)
        axios.post(URL + '/findassignmentwrtStdDiv', body).then((response) => {
            const result = response.data;
            console.log(result)
            setAssignmentList(result.data)
        })
    }

    const addAssignment = () => {

        body.append('user_id', studentid)
        body.append('std_id', standard)
        body.append('div_id', division)
        body.append('sub_id', subjectid)
        body.append('assignment_title', title)
        body.append('assignment', pdf)
        console.log(pdf)

        axios.post(URL + '/addAssignment', body).then((response) => {
            const result = response.data;
            console.log(result)
            if (result.status === "success") {
                alert("Successfully inserted assignment")
                window.location.reload(false);
            } else {
                alert("Something went wrong")
            }
        })
    }

    const onFileSelect = (event) => {
        const file = event.target.files[0]
        setPdf(file)
    }

    console.log(standard)
    console.log(division)
    console.log(subjectList)

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
                            <div className="effect" id="title"  ><a className="text-light" href={"/studentnotice/" + studentid + "/" + id} >Notice</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/studentprofile/" + studentid + "/" + id} >Profile</a></div>
                        </li>
                        <li className="row"  >
                            <div className="effect" id="title"  ><a className="text-light" href={"/studenthelp/" + studentid + "/" + id} >Help</a></div>
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
                    <div className=" SubjectBar  d-flex flex-row">
                        {
                            subjectList.map((list, index) => {
                                return <SubjectRow onItemSelect={getAssignmentWrtStdDivSub} list={list} index={index} instituteid={instituteId} standard={standard} division={division} />
                            })
                        }
                    </div>
                    <div className="changeable">
                        <div className="table-height1">
                            <table class="table table-striped r-10">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">title</th>
                                        <th scope="col">deadline</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        assignmentList.map((list, index) => {
                                            return <StudentTableRow list={list} index={index} instituteid={instituteId} standard={standard} division={division} studentid={studentId} />
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

export default StudentDashboard