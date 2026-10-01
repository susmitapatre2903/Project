import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "../teacher.css"
import "./login.css"
import { URL } from '../../../constants/constant';

const Timetable = () => {

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
    const [timetable, setTimetable] = useState(undefined)
    const [timetableId, setTimetableId] = useState()
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [deadline, setDeadline] = useState("")
    const [pdf, setPdf] = useState(undefined)
    const [title, setTitle] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [changeDIV, setChangeDIV] = useState(false)
    const teacherId = Teacherid;
    const body = new FormData()
    const history = useHistory()
    useEffect(() => { loadTeacherStandardDivSub() }, [])
    useEffect(() => { loadStandard() }, [])

    const loadTeacherStandardDivSub = () => {

        axios.get(URL + '/finduser/' + teacherId).then((response) => {
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

    const getTimetable = () => {
        body.append('user_id', Teacherid)
        body.append('std_id', standard)
        console.log(Teacherid + " " + standard)
        axios.post(URL + '/gettimetable', body).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result)
                setTimetable(result.data.image)
                setTimetableId(result.data.id)
                setChangeDIV(true)
            } else {
                alert("Please add timetable")
                window.location.reload(false);
            }
        })
    }
    const deleteTimetable = () => {

        console.log(list.id)
        axios.get(URL + '/deletetimetable/' + timetableId).then((response) => {
            console.log(list.id)
            const result = response.data;
            if (result.status === "success") {
                alert("successfully deleted timetable")
            } else {
                alert("something went wrong")
            }
            console.log(result)
        })
        window.location.reload(false);
    }

    const addTimetable = () => {

        body.append('user_id', Teacherid)
        body.append('std_id', standard)
        body.append('image', pdf)
        console.log(pdf)

        axios.post(URL + '/addtimetable', body).then((response) => {
            const result = response.data;
            console.log(result)
            if (result.status === "success") {
                alert("successfully inserted Timetable")
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
    console.log(timetable)

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
                            <div className="m"> <img src={URL + '/' + teacherPhoto} className="profile-bar" /> </div>
                        </div>
                    </div>
                    <div className=" SubjectBar row">
                        <div className="SubjectBar-row ">
                            <div className="effect" id="title" onClick={() => { getTimetable() }} >
                                Timetable
                            </div>
                        </div>
                    </div>
                    <div className="changeable">
                        <div className="timetablesize1">
                            {changeDIV ? <img src={URL + '/' + timetable} className="timetablesize2" /> : <div className="message">Please click on Timetable</div>}
                        </div>
                        <div className="table-height2 ">
                            <div>
                                <label htmlFor="">add homework pdf</label>
                                <input accept="image/*" onChange={onFileSelect} type="file" className="form-control" />
                            </div>
                            <div className="m-2 center">
                                <button disabled={changeDIV} onClick={addTimetable} className="btn btn-outline-dark btn-sm px-3 center" type="submit" >Add</button>
                                <div></div>
                                <button onClick={deleteTimetable} className="btn btn-outline-dark btn-sm px-3 center " type="submit" >delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timetable