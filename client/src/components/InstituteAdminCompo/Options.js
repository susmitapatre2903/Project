import '../user/login.css'
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { URL } from './../../constants/constant';
import '../addInstitute.css'
import StandardListRow from './StandardRow';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Options = () => {

	const { id } = useParams()
	const instituteId = { id }.id
	console.log(instituteId)

	return (
		<div >
			<section className="vh-100 gradient-custom ">
				<div className="container py-5 h-100 ">
					<div className="row d-flex justify-content-center align-items-center h-100 ">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
							<div className="card colour text-white " >
								<div className="backofList p-5 text-center border1 ">
									<h2 className="fw-bold mb-2 text-uppercase">OPTIONS</h2>
									<p className="text-white text mb-5">(add,edit or delete)</p>
									<div className="topMargin"> <table>
										<tr>
											<td><Link to={"/allteacher/" + instituteId} className="btn btn-outline-light">Teacher</Link> </td>
											<td><Link to={"/addsds/" + instituteId} className="btn btn-outline-light">Standard Division Subject</Link> </td>
											<td><Link to={"/allstudents/" + instituteId} className="btn btn-outline-light">Student</Link> </td>
										</tr>
									</table>
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

export default Options