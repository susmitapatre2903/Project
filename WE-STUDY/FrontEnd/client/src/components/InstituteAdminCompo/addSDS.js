import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom"
import { URL } from './../../constants/constant';
import '../addInstitute.css'
import StandardListRow from './StandardRow';
import { useLocation } from 'react-router';

const AddSDS = () => {

    useEffect(() => { loadStandard() }, [])

    const { instituteId } = useParams()
    const id = { instituteId }.instituteId
    console.log(id)

    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [standardName, setStandardName] = useState("");

    const history = useHistory()
    const body = new FormData()

    const loadStandard = () => {

        axios.get(URL + '/findallstdbyinstitute/' + id).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                setList(result.data)
            } else {
                alert("failed to fetch institute List")
            }
            console.log(result)
        })
    }

    const newStandard = () => {

        body.append('standardName', standardName)
        body.append('institute_id', id)
        axios.post(URL + '/addstd', body).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result.data)
                alert("Successfulyy added New Institute")
            } else {
                alert("failed to add Institute")
            }
            //console.log(result)
        })

        window.location.reload(false);
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
                                    <p className="text-white text-uppercase mb-5">All Standard</p>
                                    <div class="tableFixHead">
                                        <table class="table">
                                            <thead class="thead-dark" >
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Standard</th>
                                                    <th scope="col">action</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    list.map((list, index) => {
                                                        return <StandardListRow list={list} index={index} />
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {display ?
                                            <div>
                                                <div> <input className="borderRadius form-control input-sm" type="text" value={standardName} name="enter Standard to add" onChange={e => setStandardName(e.target.value)} /></div>
                                                <div className="text-center button1"><button onClick={newStandard} className="btn btn-outline-light" type="submit" >add standard</button></div>
                                            </div>
                                            :
                                            <div className="text-center"><button className="btn btn-outline-light  " onClick={() => { setDisplay(true) }} type="submit" >add standard</button></div>
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

export default AddSDS