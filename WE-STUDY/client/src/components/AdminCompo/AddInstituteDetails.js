import '../user/login.css'
import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom"
import { URL } from '../../constants/constant';

const AddInstituteDetails = () => {

	const history = useHistory()
	const body = new FormData()
	const { instituteId } = useParams()
	const id = { instituteId }.instituteId   // Teacher institute id
	const [email, setEmail] = useState("");;
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [profilephoto, setProfilePhoto] = useState(undefined);
	const [mobile, setMobile] = useState("");
	const [disabled, setDisable] = useState(true);
	const role = "teacher"

	const onFileSelect = (event) => {
		const file = event.target.files[0]
		setProfilePhoto(file)
	}

	const addInstitute = (e) => {

		e.preventDefault();

		if (mobile.length > 10 && mobile.length < 10)
			alert("Please check number you have entered")
		else
			setMobile(mobile)

		body.append('email', email)
		body.append('name', name)
		body.append('address', address)
		body.append('profilepicture', profilephoto)
		body.append('contact_no', mobile)

		axios.post(URL + '/addinstitute', body).then((response) => {
			const result = response.data;
			console.log(result)
			if (result.status === "success")
				alert("Successfully saved institute")
			else
				alert("something went wrong ")
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
										<h2 className="fw-bold mb-2 text-uppercase">Institute Details</h2>
										<p className="text-white-50 mb-5">fill details </p>
										<form >
											<div className="row  sizeDiv">
												<table >
													<tr >
														<td> <label className="form-label" for="typeEmailX">Email:</label> </td>
														<td>  <input className="borderRadius" type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">Name:</label> </td>
														<td>   <input className="borderRadius" type="text" value={name} onChange={e => setName(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">Address:</label> </td>
														<td>   <input className="borderRadius" type="text" value={address} onChange={e => setAddress(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">Contact No.:</label> </td>
														<td>   <input className="borderRadius" type="text" value={mobile} onChange={e => setMobile(e.target.value)} />  </td>
													</tr>
													<tr >
														<td>  <label className="form-label" for="typePasswordX">Display Picture:</label> </td>
														<td>  <input accept="image/*" onChange={onFileSelect} type="file" className="form-control " />  </td>
													</tr>
												</table>
											</div>
											<div className="margind">
											</div>
											<button onClick={addInstitute} className="btn btn-outline-light btn-lg px-5 " type="submit" > Submit</button>
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

export default AddInstituteDetails;


