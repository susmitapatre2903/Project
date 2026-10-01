import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./teacher.css"
import "./login.css"
import { URL } from '../../constants/constant';

const StudentNotice = () => {

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
    const [notice, setNotice] = useState(undefined)
    const [noticeId, setNoticeId] = useState()
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

            axios.get(URL + '/findstd/' + result.data.std_id).then((response) => {
                const result = response.data;
                console.log(result)
                setSubjectList(result.data.subjectList)
                setStandardName(result.data.standardName)
            })

            if (division === 1) {
                setDivisionName("A")
            } else if (division === 2) {
                setDivisionName("B")
            } else if (division === 3) {
                setDivisionName("C")
            } else {
                setDivisionName("")
            }
        })
    }

    const getNotice = () => {

        axios.get(URL + '/viewnotice/' + standard).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result)
                setNotice(result.data.information)
                setNoticeId(result.data.id)
                setChangeDIV(true)
            } else {
                alert("something went wrong")
                // window.location.reload(false);
            }
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
                        <div className="SubjectBar-row ">
                            <div className="effect" id="title" onClick={() => { getNotice() }} >
                                Notice
                            </div>
                        </div>
                    </div>
                    <div className="changeable">
                        <div className="timetablesize1">
                            {changeDIV ? <div className="notice"> {notice} </div> : <div className="message">Please click on Notice</div>}
                        </div>
                        <div className="table-height2 ">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentNotice