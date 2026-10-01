import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { URL } from '../../constants/constant';
import { useHistory } from 'react-router-dom';
import "./teacher.css"

const ViewAssignmentStudent = () => {
    
    const history = useHistory()
    useEffect(() => { loadStudentStandardDivSub() }, [])
    useEffect(() => { loadAssignment() }, [])
    const [assignment, setAssignment] = useState(undefined)
    const { studentid } = useParams()
    const studentId = { studentid }.studentid
    const { id } = useParams()
    const instituteId = { id }.id
    const location = useLocation()
    const student = location.state.student
    console.log(student)
    const [studentName, setStudentName] = useState("")
    const [studentPhoto, setStudentPhoto] = useState(undefined)
    const [division, setDivision] = useState(-1)
    const [divisionName, setDivisionName] = useState("")
    const [standard, setStandard] = useState(1)
    const [standardName, setStandardName] = useState("")
    const [allstandard, setAllStandard] = useState([])
    const [assignmentId, setAssignmentId] = useState(-1)
    const [pdf, setPdf] = useState(undefined)
    const [instituteName, setInstituteName] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [subjectList, setSubjectList] = useState([])
    const [changeDIV, setChangeDIV] = useState(false)
    const [userid, setUserid] = useState(-1)
    const body = new FormData()

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
            setUserid(result.data.id)
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
                setChangeDIV(true)
            })
        })
    }

    const loadAssignment = () => {

        axios.get(URL + '/findassignmentbyid/' + student.id).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                setAssignment(student.assignment)
                setAssignmentId(student.id)
            } else {
                alert("something went wrong")
            }
        })
    }

    const onFileSelect = (event) => {
        const file = event.target.files[0]
        setPdf(file)
    }

    const addAssignment = () => {

        body.append('std_id', standard)
        body.append('div_id', division)
        body.append('user_id', studentId)
        body.append('stddetails_id', userid)
        body.append('assignment_id', assignmentId)
        body.append('assignment_data', pdf)

        console.log(pdf)

        axios.post(URL + '/addstudentassignment', body).then((response) => {
            const result = response.data;
            console.log(result)
            if (result.status === "success") {
                alert("successfully inserted assignment")
                window.location.reload(false);
            } else {
                alert("Something went wrong")
            }
        })
    }

    const allassignment = () => {
        history.push("/allassigments/" + studentid + "/" + instituteId, { student: student });
    }

    const logout = () => {
        alert("You are Logged out, see you")
        history.push("/");
    }

    return (
        <div>
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
                                <div onClick={allassignment} className="w-15 btn btn-outline-dark me-2" ><label htmlFor="">all assignments </label>
                                </div>
                                <div className="w-15 btn btn-outline-dark me-2" ><label htmlFor="">Standard: {standardName} </label>
                                </div>
                                <div className="m name">{studentName} </div>
                                <div className="m "><img src={URL + '/' + studentPhoto} className="profile-bar" />  </div>
                            </div>
                        </div>
                        <div className=" SubjectBar  d-flex flex-row">
                            <div className="SubjectBar-row ">
                                <div className="effect" id="title" >
                                    assignment
                                </div>
                            </div>
                        </div>
                        <div className="changeable">
                            <div className="timetablesize1">
                                {changeDIV ? <div><img src={URL + '/' + assignment} className="timetablesize2" /></div> : <div className="message">Please click on assignment</div>}
                            </div>
                            <div className="table-height2 ">
                                <div className="table-height2 ">
                                    <div>
                                        <label htmlFor="">add homework photo</label>
                                        <input accept="image/*" onChange={onFileSelect} type="file" className="form-control" />
                                    </div>
                                    <div className="m-2 center">
                                        <button onClick={addAssignment} className="btn btn-outline-dark btn-sm px-3 center" type="submit" >Add</button>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAssignmentStudent