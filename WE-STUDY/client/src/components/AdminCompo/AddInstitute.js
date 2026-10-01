import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { URL } from './../../constants/constant';
import InstituteListRow from './InstituteList';
import '../addInstitute.css'

// add, delete, search Institute
const AddInstitute = () => {

    useEffect(() => { loadInstitute() }, [])

    const [list, setList] = useState([]);
    const [name, setName] = useState("");
    const [display, setDisplay] = useState(false);

    // const [user,setUser] = useState([])
    const history = useHistory()
    const body = new FormData()

    const loadInstitute = (e) => {

        axios.get(URL + '/findinstitute').then((response) => {

            const result = response.data;
            if (result.status === "success") {
                setList(result.data)
            } else {
                alert("failed to fetch institute List")
            }
            console.log(result)
        })
    }

    const newInstitute = () => {

        body.append('name', name)

        axios.post(URL + '/addinstitute', body).then((response) => {
            const result = response.data;
            if (result.status === "success") {
                console.log(result.data)
                alert("Successfulyy added New Institute")
            } else {
                alert("failed to add Institute")
            }
        })
        window.location.reload(false);
    }

    const logout = () => {

        alert("You are Logged out, see you")
        history.push("/");
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
                                    <p className="text-white text-uppercase mb-5">All Institute</p>
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
                                                        return <InstituteListRow list={list} index={index} />
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <div>
                                            <div className="text-center button1"><button className="btn btn-outline-light" type="submit" ><a href="/addinstitutedetail">add institute</a></button></div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={logout} className="btn btn-outline-light btn-sm px-5" type="submit">Logout</button>
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

export default AddInstitute