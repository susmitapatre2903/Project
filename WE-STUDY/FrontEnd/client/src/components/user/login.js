import '../user/login.css'
import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { URL } from './../../constants/constant';

const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	//const [user,setUser] = useState([])
	const history = useHistory()
	const body = new FormData()

	const validate = (e) => {

		e.preventDefault();
		// add the data
		body.append('email', email)
		body.append('password', password)
		//console.log(email,password)

		axios.post(URL + '/authenticate', body).then((response) => {

			const result = response.data;
			console.log(result)
			//console.log(result.data.role)
			const role = result.data.role
			if (role === "admin") {
				history.push("/addinstitute", { institute: result.data })
			} else if (role === "teacher") {
				history.push("/teacher", { teacher: result.data })
			} else if (role === "student") {
				history.push("/student", { student: result.data })
			} else if (role === "institute_admin") {
				console.log(result.data)
				console.log(result.data.institute_id)
				history.push("/options/" + result.data.instituteid.id)
			} else {
				alert("Unable to login, please check email password")
				history.push("/")
			}
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
										<h2 className="fw-bold mb-2 text-uppercase">Login</h2>
										<p className="text-white-50 mb-5">Please enter your email and password!</p>
										<form >
											<div className="row  sizeDiv">
												<table >
													<tr>
														<td> <label className="form-label" for="typeEmailX">Email:</label> </td>
														<td>  <input className="borderRadius" type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} />  </td>
													</tr>
													<tr>
														<td>  <label className="form-label" for="typePasswordX">Password:</label> </td>
														<td>   <input className="borderRadius" type="password" value={password} onChange={e => setPassword(e.target.value)} />  </td>
													</tr>
												</table>
											</div>
											<div className="margind">
												<p className="small mb-5 pb-lg-3"><a className="text-white-50" href="/forgetpassword">Forgot password?</a></p>
											</div>
											<button onClick={validate} className="btn btn-outline-light btn-lg px-5" type="submit" disabled={loading} block={true}> {loading ? "Loading.." : "Log In"}</button>
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
};

export default Login; 
