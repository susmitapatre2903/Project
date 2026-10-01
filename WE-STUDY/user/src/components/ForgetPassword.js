import '../components/user/login.css'
import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { URL } from './../../src/constants/constant';

const ForgetPassword = () => {

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [verified, setVerified] = useState(false);
	const [disabled, setDisable] = useState(true);   // password disable
	const [disabled1, setDisable1] = useState(false);  // email disable
	const [passwordSuccess, setPasswordSuccess] = useState(false)
	const [emailValid, setEmailValid] = useState(false)
	const history = useHistory()
	const body = new FormData()

	const validateEmail = (e) => {

		e.preventDefault();

		setEmailValid(false)
		// body.append('password',password)

		// console.log(email,password)

		axios.get(URL + '/verify/' + email).then((response) => {
			const result = response.data;
			console.log(result.data)
			if (result.status === 'success') {
				setVerified(true)
				setDisable(false)
				setEmailValid(false)
			} else {
				setEmailValid(true)
			}
		})
	}

	const updatePassword = (e) => {

		e.preventDefault();

		body.append('email', email)
		body.append('password', password)

		axios.post(URL + '/forgetpassword', body).then((response) => {
			const result = response.data;
			console.log(result.data)
			if (result.status === 'success') {
				setPasswordSuccess(true)
				setDisable1(true)
				setDisable(true)
			}
		})
	}

	return (
		<div >
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
											<h2 className="fw-bold mb-2 text">Change Password</h2>
											<p className="text-white-50 mb-5">Please enter your email to verify</p>
											<form >
												<div className="row  sizeDiv">
													<table >
														<tr disabled={disabled1}>
															<td> <label className="form-label" for="typeEmailX">Email:</label> </td>
															<td>  <input className="borderRadius" type="text" value={email} name="username" onChange={e => setEmail(e.target.value)} />  </td>
														</tr>
														<tr disabled={disabled}>
															<td>  <label className="form-label" for="typePasswordX">Password:</label> </td>
															<td>   <input className="borderRadius" type="password" value={password} onChange={e => setPassword(e.target.value)} />  </td>
														</tr>
													</table>
												</div>
												<div className="margind">
													{passwordSuccess ? "Password changed successfully " : emailValid ? "email entered is not valid" : verified ? "Email verified" : ""}
													<div>
													</div>
													<div>   {passwordSuccess ? <a class="text-white" href="/"> login   </a> : ""}    </div>
												</div>
												{passwordSuccess ? " " : <button onClick={verified ? updatePassword : validateEmail} className="btn btn-outline-light btn-lg px-5 topMargin" type="submit"
												> {verified ? "change password" : "Verify email"}</button>}
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default ForgetPassword