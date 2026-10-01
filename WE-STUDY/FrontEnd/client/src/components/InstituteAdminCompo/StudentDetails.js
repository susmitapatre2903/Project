import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom"
import { URL } from '../../constants/constant';

const StudentDetails = () => {

	const history = useHistory()
	const body = new FormData()
	const { instituteId } = useParams()
	const id = { instituteId }.instituteId   // Teacher institute id
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [mobile, setMobile] = useState("");
	const [disabled, setDisable] = useState(true);
	const role = "student"

	const addStudent = (e) => {
		e.preventDefault();
		// add the data

		if (mobile.length > 10 && mobile.length < 10)
			alert("Please check number you have entered")
		else
			setMobile(mobile)

		body.append('email', email)
		body.append('password', password)
		body.append('role', role)
		body.append('username', username)
		body.append('firstname', firstname)
		body.append('lastname', lastname)
		body.append('mobile', mobile)
		body.append('institue_id', id)

		console.log(email, password, role)

		axios.post(URL + '/adduser', body).then((response) => {
			const result = response.data;
			console.log(result)
			if (result.status === "success")
				alert("Successfully saved user")
			else
				alert("Unsuccessful ")
		})
	}

	return (
		<div>
			<section className="vh-100 gradient-custom">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<div className="card colour text-white " >
								<div className="card-body p-5 text-center">
									<div className="mb-md-5 mt-md-4 pb-5">
										<div >
										</div>
										<h2 className="fw-bold mb-2 text-uppercase">Student Details</h2>
										<p className="text-white-50 mb-5">fill details of student</p>
										<form >
											<div className="row  sizeDiv">
												<table >
													<tr >
														<td> <label className="form-label" for="typeEmailX">Email:</label> </td>
														<td>  <input className="borderRadius" type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">Password:</label> </td>
														<td>   <input className="borderRadius" type="password" value={password} onChange={e => setPassword(e.target.value)} />  </td>
													</tr>
													<tr disabled={disabled} >
														<td>  <label className="form-label" for="typePasswordX">Role:</label> </td>
														<td>   <input className="borderRadius" type="text" value={role} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">username:</label> </td>
														<td>   <input className="borderRadius" type="text" value={username} onChange={e => setUsername(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">firstname:</label> </td>
														<td>   <input className="borderRadius" type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">lastname:</label> </td>
														<td>   <input className="borderRadius" type="text" value={lastname} onChange={e => setLastname(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">mobile:</label> </td>
														<td>   <input className="borderRadius" type="text" value={mobile} onChange={e => setMobile(e.target.value)} />  </td>
													</tr>
												</table>
											</div>
											<div className="margind">
											</div>
											<button onClick={addStudent} className="btn btn-outline-light btn-lg px-5 " type="submit" > Submit</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default StudentDetails;


