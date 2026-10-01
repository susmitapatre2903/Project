import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import FaceIcon from '@mui/icons-material/Face';
import { SubjectBarData } from "../SubjectBarData";
import "../teacher.css"
import TableRow from "./TableRow"
import "./login.css"
import { URL } from '../../../constants/constant';
import SideBar from './SideBar';
import image from "../images/logo.jpg"
const Profile = () => {

    useEffect(() => { loadTeacherStandardDivSub() }, [])
    const { teacherid } = useParams()
    const Teacherid = { teacherid }.teacherid
    const { id } = useParams()
    const instituteId = { id }.id
    const [list, setList] = useState([])
    const [teacherStdDivList, setTeacherStdDivList] = useState([])
    const [teacherName, setTeacherName] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [instititeInfo, setInstituteInfo] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const teacherId = Teacherid;
    const [teacherPhoto, setTeacherPhoto] = useState(undefined)
    const [editPhoto, setPhoto] = useState(undefined)
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const body = new FormData()
    const history = useHistory()
    console.log(Teacherid)

    const loadTeacherStandardDivSub = () => {

        axios.get(URL + '/finduser/' + Teacherid).then((response) => {
            const result = response.data;
            console.log(result)
            setInstitutePhoto(result.instituteid.profilepicture)
            setInstituteInfo(result.instituteid)
            setInstituteName(result.instituteid.name)
            setTeacherStdDivList(result.teacherStdDivList)
            setTeacherName(result.firstname + " " + result.lastname)
            setTeacherPhoto(result.profilepicture)
            setUsername(result.username)
            setFirstname(result.firstname)
            setLastname(result.lastname)
            setMobile(result.mobile)
            setEmail(result.email)
        })
    }
    console.log(instititeInfo)

    const logout = () => {
        alert("You are Logged out, see you")
        history.push("/");
    }

    const onFileSelect = (event) => {
        const file = event.target.files[0]
        setPhoto(file)
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
                            <div className="effect" id="title"  ><a className="text-light" href={"/dashboard/" + teacherid + "/" + id} > Dashboard </a>  </div>
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
                            <div className="m"> <img src={URL + '/' + teacherPhoto} className="profile-bar" /> </div>
                        </div>
                    </div>
                    <div className=" SubjectBar row">
                        <div className="SubjectBar-row ">
                            <div className="effect" id="title"  >
                                <a className="text-light" href={"/editprofile/" + teacherid + "/" + id} >edit profile</a>
                            </div>
                        </div>
                    </div>
                    <div className="help container">
                        <div className="row">
                            <div className="col-lg-4 profile-height1">
                                <div>
                                    <img src={URL + '/' + teacherPhoto} className="profile-height-photo" />
                                </div>
                            </div>
                            <div className="col-lg-8 profile-height2">
                                <div>
                                    <table >
                                        <tr className="profile-line-spacing">
                                            <td >  <label className="form-label text-white profile-line-spacing" >username:</label> </td>
                                            <td >  <div className="profile-line-spacing2 text-white ">{username}</div>  </td>
                                        </tr>
                                        <tr >
                                            <td>  <label className="form-label text-white profile-line-spacing" >firstname:</label> </td>
                                            <td>  <div className="profile-line-spacing2 text-white">{firstname}</div>  </td>
                                        </tr>
                                        <tr >
                                            <td>  <label className="form-label text-white profile-line-spacing" >lastname:</label> </td>
                                            <td>  <div className="profile-line-spacing2 text-white">{lastname}</div>   </td>
                                        </tr>
                                        <tr >
                                            <td>  <label className="form-label text-white profile-line-spacing" >Email:</label> </td>
                                            <td>  <div className="profile-line-spacing2 text-white">{email}</div>  </td>
                                        </tr>
                                        <tr >
                                            <td>  <label className="form-label text-white profile-line-spacing" >mobile:</label> </td>
                                            <td>  <div className="profile-line-spacing2 text-white">{mobile}</div>  </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="col-lg-12 ">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile