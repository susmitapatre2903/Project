import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { URL } from '../../constants/constant';
import '../addInstitute.css'
import SubjectRow from './SubjectRow';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';

const AddSubject = () => {

    const { stdId } = useParams()

    //const {id} = stdId.stdId
    //console.log(id)
    useEffect(() => { loadSubject() }, [])

    // const location = useLocation()
    // const id = location.state.any

    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [subjectName, setSubjectName] = useState("");
    const [sub_id, setSub_id] = useState();
    const [result, setResult] = useState("");
    // const [id,setId] = useState("")
    const history = useHistory()
    const body = new FormData()
    const a = 0

    const loadSubject = () => {

        // setId(props.match.params.id)
        const id = { stdId }.stdId

        axios.get(URL + '/findsub/' + id).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result.data)
                setResult(result)
                setList(result.data.subjectList)

            } else {
                alert("failed to fetch subject List")
            }
        })
    }


    const newSubject = () => {

        if (subjectName === 'mathematics')
            setSub_id(1)
        else if (subjectName === 'science')
            setSub_id(2)
        else if (subjectName === 'history')
            setSub_id(3)
        else if (subjectName === 'english')
            setSub_id(4)
        else
            alert("Please choose from mathematics science history english")

        body.append('std_id', result.data.id)
        body.append('sub_id', sub_id)
        body.append('sub_name', subjectName)
        body.append('institute_id', result.data.instituteid.id)

        console.log(result.data.id)
        console.log(sub_id)
        console.log(subjectName)
        console.log(result.data.instituteid.id)

        axios.post(URL + '/addsub', body).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result.data)
                alert("Successfully added New Subject")
                window.location.reload(false);
            } else {
                alert("failed to add Subject")
            }
            //console.log(result)
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
                                    <p className="text-white text-uppercase mb-5">All Subjects</p>
                                    <div class="tableFixHead">
                                        <table class="table">
                                            <thead class="thead-dark" >
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Subject</th>
                                                    <th scope="col">action</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    list.map((list, index) => {
                                                        return <SubjectRow list={list} index={index} />
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {display ?
                                            <div>
                                                <div> <input className="borderRadius form-control input-sm" type="text" value={subjectName} name="enter Standard to add" onChange={e => setSubjectName(e.target.value)} /></div>
                                                <div className="text-center button1"><button onClick={newSubject} className="btn btn-outline-light" type="submit" >add Subject</button></div>
                                            </div>
                                            :
                                            <div className="text-center"><button className="btn btn-outline-light  " onClick={() => { setDisplay(true) }} type="submit" >add Subject</button></div>
                                        }
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

export default AddSubject