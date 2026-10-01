import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { URL } from '../../constants/constant';
import '../addInstitute.css'
import DivisionRow from './DivisionRow';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';

const AddDivision = () => {

    const { stdId } = useParams()
    useEffect(() => { loadDivision() }, [])
    const [list, setList] = useState([]);
    const [display, setDisplay] = useState(false);
    const [divisionName, setDivisionName] = useState("");
    const [div_id, setDiv_id] = useState();
    const [result, setResult] = useState("");
    const [std, setStdId] = useState()
    const history = useHistory()
    const body = new FormData()
    const id = { stdId }.stdId

    const loadDivision = () => {

        axios.get(URL + '/finddiv/' + id).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result)
                console.log(result.data[0])
                console.log(result.data[0].instituteid.id)
                console.log(result.data[0].id)  // Standard id
                setResult(result)
                setStdId(result.data[0].id)
                setList(result.data[0].divisionList)
            } else {
                alert("failed to fetch division List")
            }
        })
    }

    console.log(std)
    const newDivision = () => {

        if (divisionName === 'A')
            setDiv_id(1)
        else if (divisionName === 'B')
            setDiv_id(2)
        else if (divisionName === 'C')
            setDiv_id(3)
        else
            alert("Please add A,B or C division")

        body.append('std_id', result.data[0].id)
        body.append('div_id', div_id)
        body.append('div_name', divisionName)
        body.append('institute_id', result.data[0].instituteid.id)

        console.log(body)

        axios.post(URL + '/adddiv', body).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result.data)
                alert("Successfulyy added New Division")
                window.location.reload(false);
            } else {
                alert("failed to add Division")
            }
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
                                    <p className="text-white text-uppercase mb-5">All Division</p>
                                    <div class="tableFixHead">
                                        <table class="table">
                                            <thead class="thead-dark" >
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Division</th>
                                                    <th scope="col">action</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    list.map((list, index) => {
                                                        return <DivisionRow list={list} index={index} std={std} />
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {display ?
                                            <div>
                                                <div> <input className="borderRadius form-control input-sm" type="text" value={divisionName} name="enter Standard to add" onChange={e => setDivisionName(e.target.value)} /></div>
                                                <div className="text-center button1"><button onClick={newDivision} className="btn btn-outline-light" type="submit" >add division</button></div>
                                            </div>
                                            :
                                            <div className="text-center"><button className="btn btn-outline-light  " onClick={() => { setDisplay(true) }} type="submit" >add division</button></div>
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

export default AddDivision