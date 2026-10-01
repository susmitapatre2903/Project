import '../user/login.css'
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom"
import { URL } from '../../constants/constant';
import TeacherStdDivSubRow from './TeacherStdDivSubRow';
import TeacherDivisionRow from './TeacherDivisionRow';
import TeacherSubjectRow from './TeacherSubjectRow';

const AddTeacherStdDivSub = () => {

	useEffect(() => { loadStandard() }, [])
	useEffect(() => { loadTeacherStandardDivSub() }, [])
	const history = useHistory()
	const body = new FormData()
	const { instituteId } = useParams()
	const { teacherId } = useParams()
	const id = { instituteId }.instituteId   // institute id
	const teacherid = { teacherId }.teacherId   // institute id

	console.log(teacherid)

	const [teacherName, setTeacherName] = useState("")
	const [teacherStdDivList, setTeacherStdDivList] = useState([])
	const [teacherSubList, setTeacherSubList] = useState([]);
	const [allstandard, setAllStandard] = useState([])
	const [standard, setStandard] = useState(-1)
	const [AllDivisionWrtStandard, setAllDivisionWrtStandard] = useState([])
	const [division, setDivision] = useState(-1)
	const [allsubjectWrtStandard, setAllSubjectWrtStandard] = useState([])
	const [subject, setSubject] = useState(-1)
	const [disabled, setDisable] = useState(true);   //  disable

	const addTeacher = (e) => {
		e.preventDefault();
		// add the data
		var divisionInt = parseInt(division)
		var subjectInt = parseInt(subject)
		body.append('teacher_id', teacherid)
		body.append('instituteId', id)
		body.append('standardId', standard)
		body.append('divisionId', divisionInt)
		body.append('subjectId', subjectInt)

		console.log(standard, divisionInt, divisionInt)

		axios.post(URL + '/addteacherstddivsub', body).then((response) => {
			const result = response.data;
			console.log("result" + result)
			if (result.status === "success") {
				alert("Successfully saved user")
				window.location.reload(false);
			}
			else
				alert("Unsuccessful ")
		})
	}

	const loadTeacherStandardDivSub = () => {

		axios.get(URL + '/finduser/' + teacherid).then((response) => {

			const result = response.data;
			console.log(result)
			console.log(result.teacherStdDivList)

			setTeacherStdDivList(result.teacherStdDivList)
			setTeacherSubList(result.subjectTeacherStdList)
			setTeacherName(result.firstname + " " + result.lastname)

		})
	}

	const loadStandard = () => {

		axios.get(URL + '/findallstdbyinstitute/' + id).then((response) => {
			const result = response.data;
			console.log(result.data)
			setAllStandard(result.data)
			setStandard(result.data[0].id)   // By Default Loading 1st available Standard in List

			setAllDivisionWrtStandard(result.data[0].divisionList)
			setDivision(result.data[0].divisionList[0].id) // By Default Loading 1st available Division in List

			setAllSubjectWrtStandard(result.data[0].subjectList)
			setSubject(result.data[0].subjectList[0].id)
		})
	}

	const loadDivision = (std) => {

		axios.get(URL + '/finddiv/' + std).then((response) => {
			const result = response.data;
			console.log(result)
			console.log(result.data[0].divisionList)
			setAllDivisionWrtStandard(result.data[0].divisionList)
		})
	}

	const handleChange = (e) => {
		setStandard(e.target.value)
		loadDivision(e.target.value)
	}

	const handleChangeForDvision = (e) => {
		setDivision(e.target.value)
	}

	console.log("division: " + division)

	const handleChangeForSubject = (e) => {
		setSubject(e.target.value)
	}
	console.log(subject)

	console.log()

	return (
		<div>
			<section className="vh-100 gradient-custom ">
				<div className="container py-5 ">
					<div className="row d-flex justify-content-center align-items-center  ">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5  ">
							<div className="card colour text-white " >
								<div className="card-body p-5 text-center ">
									<div className="mb-md-5 mt-md-4 pb-5 ">
										<div >
										</div>
										<h2 className="fw-bold mb-2 text-uppercase">Teacher Details</h2>
										<p className="text-white-50 mb-5">Name: {teacherName}</p>
										<form >
											<div className="row  sizeDiv">
												<div className="">
													<table className="table " >
														<thead class="thead-dark" >
															<tr>
																<th scope="col">standard</th>
																<th scope="col">division</th>
																<th scope="col">subject</th>
															</tr>
														</thead>
														<tbody >
															<tr>
																<td>
																	{
																		teacherStdDivList.map((list, index) => {
																			return <TeacherStdDivSubRow list={list} />
																		})
																	}
																</td>
																<td>
																	{
																		teacherStdDivList.map((list, index) => {
																			return <TeacherDivisionRow list={list} />
																		})
																	}
																</td>
																<td>
																	{
																		teacherSubList.map((list) => {
																			return <TeacherSubjectRow list={list} />
																		})
																	}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
												<div className="w-100 ">
													<div className="margind">
													</div>
													<div className="w-20 btn btn-outline-light me-2" ><label htmlFor="">Standard</label>
														<select onChange={handleChange} className="form-control">
															{
																allstandard.map((standard) => {
																	return (
																		<option value={standard.id}>
																			{standard.standardName}
																		</option>
																	)
																})
															}
														</select>
													</div>
													<div className="w-20 btn btn-outline-light me-2" ><label htmlFor="">Division</label>
														<select onChange={handleChangeForDvision} className=" form-control">
															{
																AllDivisionWrtStandard.map((division) => {
																	return (
																		<option value={division.id}>
																			{division.divName}
																		</option>
																	)
																})
															}
														</select>
													</div>
													<div className="w-10 btn btn-outline-light  me-2 position-fixed " ><label htmlFor="">subject</label>
														<select onChange={handleChangeForSubject} className=" form-control ">
															{
																allsubjectWrtStandard.map((subject) => {
																	return (
																		<option value={subject.id}>
																			{subject.sub_name}
																		</option>
																	)
																})
															}
														</select>
													</div>
												</div>
											</div>
											<div className="margind">
											</div>
											<button onClick={addTeacher} className="btn btn-outline-light btn-lg px-5 " type="submit" > Submit</button>
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

export default AddTeacherStdDivSub;
