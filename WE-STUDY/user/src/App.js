
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import login from './components/user/login';
import Student from './components/user/Student';
import ForgetPassword from './components/ForgetPassword';
import Mathematics from './components/Teacher/Subjects/Mathematics'
import "./components/Teacher/teacher.css"
import "./components/user/login.css"
import { SideBarData } from './components/Teacher/SideBarData';
import Timetable from './components/Teacher/Pages/Timetable';
import Dashboard from './components/Teacher/Pages/Dashboard';
import ViewAssignment from './components/Teacher/Pages/ViewAssignment';
import Login from './components/user/login';
import Notice from './components/Teacher/Pages/Notice';
import Help from './components/Teacher/Pages/Help';
import Profile from './components/Teacher/Pages/Profile';
import EditProfile from './components/Teacher/Pages/EditProfile';
import StudentAssignment from './components/Teacher/Pages/StudentAssignment';
import ViewStudentAssignment from './components/Teacher/Pages/ViewStudentAssignment';
import StudentDashboard from './components/Student/StudentDashboard';
import StudentTimetable from './components/Student/StudentTimetable';
import ViewAssignmentStudent from './components/Student/ViewAssignmentStudent';
import AllAssignments from './components/Student/AllAsignments';
import StudentNotice from './components/Student/StudentNotice';
import StudentProfile from './components/Student/StudentProfile';
import StudentHelp from './components/Student/StudentHelp';
import EditStudentProfile from './components/Student/EditStudentProfile';

function App() {

	const [disabled, setDisable] = useState(true);

	return (
		<BrowserRouter>
			<div className="HomeTeacher container-fluid p-0 overflow-hidden">
				<Switch>
					<Route exact path="/" component={login} />
					<Route path="/forgetpassword" component={ForgetPassword} />
					<Route path="/dashboard/:teacherid/:id" component={Dashboard} />
					<Route path="/viewassign/:aid" component={ViewAssignment} />
					<Route path="/studentassign/:teacherid/:id" component={StudentAssignment} />
					<Route path="/viewstudentassign/:id" component={ViewStudentAssignment} />
					<Route path="/notice/:teacherid/:id" component={Notice} />
					<Route path="/timetable/:teacherid/:id" component={Timetable} />
					<Route path="/profile/:teacherid/:id" component={Profile} />
					<Route path="/editprofile/:teacherid/:id" component={EditProfile} />
					<Route path="/help/:teacherid/:id" component={Help} />
					<Route path="/mathematics" component={Mathematics} />
					<Route path="/studentdash/:studentid/:id" component={StudentDashboard} />
					<Route path="/studenttimetable/:studentid/:id" component={StudentTimetable} />
					<Route path="/viewassignstudent/:studentid/:id" component={ViewAssignmentStudent} />
					<Route path="/allassigments/:studentid/:id" component={AllAssignments} />
					<Route path="/studentnotice/:studentid/:id" component={StudentNotice} />
					<Route path="/studentprofile/:studentid/:id" component={StudentProfile} />
					<Route path="/studenteditprofile/:studentid/:id" component={EditStudentProfile} />
					<Route path="/studenthelp/:studentid/:id" component={StudentHelp} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
