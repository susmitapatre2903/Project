import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams, Link } from "react-router-dom"
import { URL } from './../../constants/constant';
import '../addInstitute.css'
import TeacherRow from './TeacherRow';
import { useLocation } from 'react-router';

const AllTeacher = () => {

    useEffect(() => { loadTeacher() }, [])

    const { instituteId } = useParams()
    const id = { instituteId }.instituteId
    console.log(id)

    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [teacher, setTeacher] = useState("");
    const history = useHistory()
    const body = new FormData()
    const role = "teacher"
    const stddivsub = []

    const loadTeacher = () => {

        body.append('institute_id', id)
        body.append('role', role)
        console.log(role)
        axios.post(URL + '/findAllteacher', body).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result)
                setList(result.data)
            } else {
                alert("failed to fetch teachers List")
            }
            console.log(result)
        })
    }

    return (
        <div >
            <section className="vh-100 gradient-custom ">
                <div className="container py-5 h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100 ">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
                            <div className="card colour text-white " >
                                <div className="backofList p-5 text-center border1 ">
                                    <h2 className="fw-bold mb-2 text-uppercase"></h2>
                                    <p className="text-white text-uppercase mb-5">All Teachers</p>
                                    <div class="tableFixHead">
                                        <table class="table">
                                            <thead class="thead-dark" >
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">name</th>
                                                    <th scope="col">action</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    list.map((list, index) => {
                                                        return <TeacherRow list={list} index={index} id={id} />
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {display ?
                                            <div>
                                                <div> <input className="borderRadius form-control input-sm" type="text" value={teacher} name="enter Standard to add" onChange={e => setTeacher(e.target.value)} /></div>
                                            </div>
                                            :
                                            <div className="text-center"><Link to={"/addteacher/" + id} className="btn btn-outline-light">add teacher</Link></div>
                                        }
                                        <div className="p-2">  </div>
                                        <div> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AllTeacher
// addSDS --> add standard Division Subjects