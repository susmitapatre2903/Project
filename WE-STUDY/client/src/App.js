import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import login from './components/user/login';
import Student from './components/user/Student';
import ForgetPassword from './components/ForgetPassword';
import AddInstitute from './components/AdminCompo/AddInstitute';
import AddSDS from './components/InstituteAdminCompo/addSDS';
import AddDivision from './components/InstituteAdminCompo/addDivision';
import AddSubject from './components/InstituteAdminCompo/AddSubject';
import AllTeacher from './components/InstituteAdminCompo/AllTeacher';
import TeacherDetails from './components/InstituteAdminCompo/TeacherDetails';
import AddTeacherStdDivSub from './components/InstituteAdminCompo/AddTeacherStdDivSub';
import Options from './components/InstituteAdminCompo/Options';
import HomeTeacher from './components/Teacher/HomeTeacher';
import Mathematics from './components/Teacher/Subjects/Mathematics'
import AddInstituteDetails from './components/AdminCompo/AddInstituteDetails';
import AllStudents from './components/InstituteAdminCompo/AllStudents';
import StudentDetails from './components/InstituteAdminCompo/StudentDetails';
import AddInstituteAdmin from './components/AdminCompo/AddInstituteAdmin';

function App() {

	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={login} />
					<Route path="/addinstitute" component={AddInstitute} />
					<Route path="/addinstitutedetail" component={AddInstituteDetails} />
					<Route path="/addinstituteadmin/:instituteId" component={AddInstituteAdmin} />
					<Route path="/options/:id" component={Options} />
					<Route path="/addsds/:instituteId" component={AddSDS} />
					<Route path="/addDivision/:stdId" component={AddDivision} />
					<Route path="/addSubject/:stdId" component={AddSubject} />
					<Route path="/allteacher/:instituteId" component={AllTeacher} />
					<Route path="/addteacher/:instituteId" component={TeacherDetails} />
					<Route path="/allstudents/:instituteId" component={AllStudents} />
					<Route path="/addstudent/:instituteId" component={StudentDetails} />
					<Route path="/addteacherstddivsub/:teacherId/:instituteId" component={AddTeacherStdDivSub} />
					<Route path="/teacher" component={HomeTeacher} />
					<Route path="/mathematics" component={Mathematics} />
					<Route path="/student" component={Student} />
					<Route path="/forgetpassword" component={ForgetPassword} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;


