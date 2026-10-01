import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "../teacher.css"
import TableRow from "./TableRow"
import "./login.css"
import { URL } from '../../../constants/constant';

const Dashboard = () => {

    const { teacherid } = useParams()
    const Teacherid = { teacherid }.teacherid
    const { id } = useParams()
    const instituteId = { id }.id
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
    const [assignmentList, setAssignmentList] = useState([])
    const [deadline, setDeadline] = useState("")
    const [pdf, setPdf] = useState(undefined)
    const [title, setTitle] = useState("")
    const [instituteName, setInstituteName] = useState("")
    const [institutePhoto, setInstitutePhoto] = useState(undefined)
    const [subjectNameDIV, setSubjectNameDIV] = useState(false)
    const subjectName = subject.sub_name
    const body = new FormData()
    const history = useHistory()
    useEffect(() => { loadTeacherStandardDivSub() }, [])
    useEffect(() => { loadStandard() }, [])

    const loadTeacherStandardDivSub = () => {

        axios.get(URL + '/finduser/' + Teacherid).then((response) => {
            const result = response.data;
            console.log(result)
            setInstitutePhoto(result.instituteid.profilepicture)
            console.log(result.teacherStdDivList)
            setInstituteName(result.instituteid.name)
            setTeacherStdDivList(result.teacherStdDivList)
            setTeacherSubList(result.subjectTeacherStdList)
            setTeacherName(result.firstname + " " + result.lastname)
            setTeacherPhoto(result.profilepicture)
            console.log(teacherSubList)
        })
    }

    console.log(teacherPhoto)

    const loadStandard = () => {

        axios.get(URL + '/findallstdbyinstitute/' + instituteId).then((response) => {
            const result = response.data;
            console.log(result.data)
            setAllStandard(result.data)
            setStandard(result.data[0].id)   // By Default Loading 1st available Standard in List
            setAllDivisionWrtStandard(result.data[0].divisionList)
            //setDivision(result.data[0].divisionList[0].id) // By Default Loading 1st available Division in List
        })
    }

    const loadDivision = (std) => {

        axios.get(URL + '/finddiv/' + std).then((response) => {
            const result = response.data;
            console.log(result.data[0].divisionList)
            setAllDivisionWrtStandard(result.data[0].divisionList)
            setSubjectNameDIV(true)
        })
    }

    const handleChange = (e) => {
        setStandard(e.target.value)
        loadDivision(e.target.value)
    }

    const setdivision = (e) => {
        setDivision(e.target.value)
        getSubjectWrtStdDiv()
    }

    const getSubjectWrtStdDiv = () => {

        body.append('user_id', teacherid)
        body.append('std_id', standard)
        body.append('div_id', division)

        axios.post(URL + '/findsubjectwrtStdDiv', body).then((response) => {
            const result = response.data;
            console.log(result)
            SetSubject(result.data)
        })
    }

    const getAssignmentWrtStdDivSub = () => {

        var subjectid = subject.id

        body.append('user_id', teacherid)
        body.append('std_id', standard)
        body.append('div_id', division)
        body.append('sub_id', subjectid)

        axios.post(URL + '/findassignmentwrtUser', body).then((response) => {
            const result = response.data;
            console.log(result)
            setAssignmentList(result.data)
        })
    }

    const addAssignment = () => {
        var subjectid = subject.id
        body.append('user_id', teacherid)
        body.append('std_id', standard)
        body.append('div_id', division)
        body.append('sub_id', subjectid)
        body.append('assignment_title', title)
        body.append('deadline', deadline)
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
    console.log(subject)
    console.log(assignmentList)

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
                            <div className="effect" id="title"  >   Dashboard   </div>
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
                            <div className="w-15 btn btn-outline-dark me-2" ><label htmlFor="">Division</label>
                                <select onChange={setdivision} className=" form-control">
                                    {
                                        AllDivisionWrtStandard.map((division) => {
                                            return (
                                                <option value={division.id}>
                                                    {division.divName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
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
                            <div className="m "><img src={URL + '/' + teacherPhoto} className="profile-bar" />  </div>
                        </div>
                    </div>
                    <div className=" SubjectBar row">
                        <div className="SubjectBar-row ">
                            <div className="effect" id="title" onClick={() => { getAssignmentWrtStdDivSub() }} >
                                {subjectNameDIV ? subject.sub_name : "select division"}
                            </div>
                        </div>
                    </div>
                    <div className="changeable">
                        <div className="table-height1">
                            <table class="table table-striped r-10">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">title</th>
                                        <th scope="col">deadline</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        assignmentList.map((list, index) => {
                                            return <TableRow list={list} index={index} standard={standard} division={division} teacherid={Teacherid} instituteid={instituteId} />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="table-height2 ">
                            <div className="Dashboard-flex">
                                <div className="Dashboard-flex-margin">
                                    <label htmlFor="">enter title of homework</label>
                                    <input onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control" />
                                </div>
                                <div>
                                    <label htmlFor="">enter deadline</label>
                                    <input onChange={(e) => { setDeadline(e.target.value) }} type="text" className="form-control" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="">add homework pdf</label>
                                <input accept="image/*" onChange={onFileSelect} type="file" className="form-control" />
                            </div>
                            <div className="m-2 center">
                                <button onClick={addAssignment} className="btn btn-outline-dark btn-sm px-3 center" type="submit" >Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard