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

const Notice = () => {

    const { teacherid } = useParams()
    const Teacherid = { teacherid }.teacherid
    const { id } = useParams()
    const instituteId = { id }.id
    const [list, setList] = useState([])
    const [teacherStdDivList, setTeacherStdDivList] = useState([])
    const [teacherName, setTeacherName] = useState("")
    const [teacherPhoto, setTeacherPhoto] = useState(undefined)
    const [standard, setStandard] = useState(-1)
    const [allstandard, setAllStandard] = useState([])
    const [notice, setNotice] = useState(undefined)
    const [noticeId, setNoticeId] = useState()
    const [deadline, setDeadline] = useState("")
    const [notice1, setNotice1] = useState("")
    const [title, setTitle] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [changeDIV, setChangeDIV] = useState(false)
    const teacherId = Teacherid;
    const body = new FormData()
    const history = useHistory()
    useEffect(() => { loadTeacherStandardDivSub() }, [])
    useEffect(() => { loadStandard() }, [])

    const loadTeacherStandardDivSub = () => {

        axios.get(URL + '/finduser/' + Teacherid).then((response) => {
            const result = response.data;
            setInstitutePhoto(result.instituteid.profilepicture)
            setInstituteName(result.instituteid.name)
            setTeacherStdDivList(result.teacherStdDivList)
            setTeacherName(result.firstname + " " + result.lastname)
            setTeacherPhoto(result.profilepicture)
        })
    }

    const loadStandard = () => {

        axios.get(URL + '/findallstdbyinstitute/' + instituteId).then((response) => {
            const result = response.data;
            console.log(result.data)
            setAllStandard(result.data)
            setStandard(result.data[0].id)   // By Default Loading 1st available Standard in List
        })
    }

    const handleChange = (e) => {
        setStandard(e.target.value)
    }

    const getNotice = () => {

        body.append('user_id', Teacherid)
        body.append('std_id', standard)

        console.log(Teacherid + " " + standard)

        axios.post(URL + '/getnotice', body).then((response) => {

            const result = response.data;

            if (result.status === "success") {
                console.log(result)
                setNotice(result.data.information)
                setNoticeId(result.data.id)
                setChangeDIV(true)
            } else {
                alert("Please add notice")
                window.location.reload(false);
            }
        })
    }

    const deleteNotice = () => {

        console.log(list.id)
        axios.get(URL + '/deletenotice/' + noticeId).then((response) => {

            const result = response.data;
            if (result.status === "success") {
                alert("successfully deleted notice")
            } else {
                alert("something went wrong")
            }
            console.log(result)
        })
        window.location.reload(false);
    }

    const addNotice = () => {

        body.append('user_id', Teacherid)
        body.append('std_id', standard)
        body.append('information', notice1)
        console.log(notice)

        axios.post(URL + '/addnotice', body).then((response) => {
            const result = response.data;
            console.log(result)
            if (result.status === "success") {
                alert("successfully inserted Notice")
                window.location.reload(false);
            } else {
                alert("Something went wrong")
            }
        })
    }

    const onFileSelect = (event) => {
        const file = event.target.value
        setNotice1(file)
    }

    console.log(standard)
    console.log(notice)

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
                            <div className="w-15 btn btn-outline-dark me-2" ><label htmlFor="">Standard</label>
                                <select onChange={handleChange} className="form-control">
                                    {
                                        allstandard.map((standard) => {
                                            return (
                                                <option value={standard.id}>
                                                    {standard.standardName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="m name">{teacherName} </div>
                            <div className="m"><img src={URL + '/' + teacherPhoto} className="profile-bar" /> </div>
                        </div>
                    </div>
                    <div className=" SubjectBar row">
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
                            <div>
                                <label htmlFor="">enter notice</label>
                                <input accept="text" onChange={onFileSelect} type="text" className="form-control" />
                            </div>
                            <div className="m-2 center">
                                <button disabled={changeDIV} onClick={addNotice} className="btn btn-outline-dark btn-sm px-3 center" type="submit" >Add</button>
                                <div></div>
                                <button onClick={deleteNotice} className="btn btn-outline-dark btn-sm px-3 center " type="submit" >delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice