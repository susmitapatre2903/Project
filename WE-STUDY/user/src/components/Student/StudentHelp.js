import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./teacher.css"
import "./login.css"
import { URL } from '../../constants/constant';
const StudentHelp = () => {

    useEffect(() => { loadTeacherStandardDivSub() }, [])
    const { studentid } = useParams()
    const studentId = { studentid }.studentid
    const { id } = useParams()
    const instituteId = { id }.id
    const [list, setList] = useState([])
    const [teacherStdDivList, setTeacherStdDivList] = useState([])
    const [teacherName, setTeacherName] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [teacherPhoto, setTeacherPhoto] = useState(undefined)
    const [instititeInfo, setInstituteInfo] = useState("")
    const body = new FormData()
    const history = useHistory()

    const loadTeacherStandardDivSub = () => {

        axios.get(URL + '/finduser/' + studentId).then((response) => {
            const result = response.data;
            console.log(result)
            setInstitutePhoto(result.instituteid.profilepicture)
            setInstituteInfo(result.instituteid)
            setInstituteName(result.instituteid.name)
            setTeacherStdDivList(result.teacherStdDivList)
            setTeacherName(result.firstname + " " + result.lastname)
            setTeacherPhoto(result.profilepicture)
        })
    }

    console.log(instititeInfo)

    const logout = () => {
        alert("You are Logged out, see you")
        history.push("/");
    }

    return (
        <div>
            <div className="row row-height" >
                <div className="col-sm-2 Sidebar">
                    <div className="height">
                        <div><img src={URL + "/" + institutePhoto} className="image" /></div>
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
                            <div className="m name">{teacherName} </div>
                            <div className="m"> <img src={URL + '/' + teacherPhoto} className="profile-bar" /> </div>
                        </div>
                    </div>
                    <div className=" SubjectBar row">
                        <div className="SubjectBar-row ">
                            <div className="effect" id="title"  >
                                Contact Information
                            </div>
                        </div>
                    </div>
                    <div className="help container">
                        <div className="row">
                            <div className="col-lg-12 help-height">Institute name: <div>{instititeInfo.name}</div></div>
                            <div className="col-lg-8 help-height">Email:<div>{instititeInfo.email_id}</div></div>
                            <div className="col-lg-4 help-height">Contact No: <div>{instititeInfo.contact_no}</div></div>
                            <div className="col-lg-12 help-height">Address:<div>{instititeInfo.address}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentHelp