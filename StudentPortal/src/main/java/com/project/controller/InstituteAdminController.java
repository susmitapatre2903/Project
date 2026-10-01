package com.project.controller;

import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.dao.AssignmentDao;
import com.project.dao.DivisionDao;
import com.project.dao.StandardDao;
import com.project.dao.StudentDao;
import com.project.dao.SubjectDao;
import com.project.dao.SubjectTeacherStdDao;
import com.project.dao.TeacherStdDivDao;
import com.project.dao.UserDao;
import com.project.entities.Assignment;
import com.project.entities.Division;
import com.project.entities.Standard;
import com.project.entities.Student;
import com.project.entities.Subject;
import com.project.entities.SubjectTeacherStd;
import com.project.entities.TeacherStdDiv;
import com.project.entities.User;
import com.project.models.AddTeacherDTO;
import com.project.models.Credentials;
import com.project.models.Response;
import com.project.models.StandardDTO;
import com.project.models.StandardSubDTO;
import com.project.models.StdDivDTO;
import com.project.models.StudentDTO;
import com.project.models.SubjectTeacherStdDTO;
import com.project.models.TeacherStdDivDTO;
import com.project.models.UserLoginDTO;
import com.project.services.SaveUserService;
import com.project.services.StandardService;
import com.project.services.UserService;
import com.project.services.UtilsService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class InstituteAdminController {

	@Autowired
	private UserDao userDao;

	@Autowired
	private UserService userService;

	@Autowired
	private StandardService stdService;

	@Autowired
	private StandardDao stdDao;

	@Autowired
	private TeacherStdDivDao teacherstddivdao;

	@Autowired
	private SubjectTeacherStdDao subjectteacherstddao;

	@Autowired
	private DivisionDao divdao;

	@Autowired
	private AssignmentDao assignmentdao;

	@Autowired
	private StudentDao studentdao;

	@Autowired
	private SubjectDao subjectdao;

	@Autowired
	private UtilsService utilservice;

	@Autowired
	private SaveUserService saveUser;

	@RequestMapping("/addteacherstddivsub")
	public ResponseEntity<?> addTeacherDetails(AddTeacherDTO dto) {

		User teacher = saveUser.saveTeacher(dto);

		if (teacher != null) {
			return Response.success(teacher);
		}
		return Response.error(null);
	}

	@RequestMapping("/addstd")
	public ResponseEntity<?> addStandard(StandardDTO dto) {

		Standard standard = StandardDTO.toEntity(dto);

		if (standard != null) {
			Standard newStandard = stdService.saveStandard(standard);
			return Response.success(newStandard);
		}
		return Response.error(null);
	}

	@RequestMapping("/deletestd/{id}")
	public ResponseEntity<?> deleteStandard(@PathVariable("id") int id) {

		Standard standard = stdService.findStandard(id);

		System.out.println("Standard: " + standard);

		if (standard != null) {
			stdDao.deleteById(id);
			return Response.success("success");
		}
		return Response.error(null);
	}

	@RequestMapping("/findallstdbyinstitute/{id}")
	public ResponseEntity<?> findAllStandard(@PathVariable("id") int id) {

		List<Standard> instituteList = stdService.findByInstituteId(id);

		System.out.println(instituteList);

		if (instituteList != null) {
			return Response.success(instituteList);
		}
		return Response.error(null);
	}

	@RequestMapping("/findstd/{id}")
	public ResponseEntity<?> findStandard(@PathVariable("id") int id) {

		Standard standard = stdService.findStandard(id);

		System.out.println(standard);

		if (standard != null) {
			return Response.success(standard);
		}
		return Response.error(null);
	}

	@RequestMapping("/finddiv/{id}")
	public ResponseEntity<?> findAllStandardbyDiv(@PathVariable("id") int id) {

		List<Standard> listStandard = stdService.findById(id);

		System.out.println(listStandard);

		if (listStandard != null) {
			return Response.success(listStandard);
		}
		return Response.error(null);
	}

	@RequestMapping("/adddiv")
	public ResponseEntity<?> addDivisionByStdandInst(StdDivDTO dto) {

		Standard standard = stdService.findStandard(dto.getStd_id());

		Division division = new Division(dto.getDiv_id(), dto.getDiv_name());

		standard.getDivisionList().add(division);

		division.getStdList().add(standard);

		divdao.save(division);

		Standard newStandard = stdService.saveStandard(standard);

		System.out.println(newStandard);

		if (newStandard != null) {
			return Response.success(newStandard);
		}
		return Response.error(null);
	}

	@RequestMapping("/deleteDivByStd")
	public ResponseEntity<?> deleteDivByStd(StdDivDTO dto) {

		Standard standard = stdService.findStandard(dto.getStd_id());
		System.out.println("Standard: " + standard);

		Division division = divdao.findDivision(dto.getDiv_id());
		System.out.println("Division: " + division);

		utilservice.deleteDiv(standard, division);
		Standard newStandard = stdService.findStandard(dto.getStd_id());

		if (newStandard != null) {
			return Response.success("Successfully deleted");
		}
		return Response.error(null);
	}

	@RequestMapping("/findsub/{id}")
	public ResponseEntity<?> findSubjectById(@PathVariable("id") int id) {

		Standard standard = stdDao.findStandard(id);

		if (standard != null) {
			return Response.success(standard);
		}
		return Response.error(null);
	}

	@RequestMapping("/addsub")
	public ResponseEntity<?> addSubjectById(StandardSubDTO dto) {

		Standard standard = stdService.findStandard(dto.getStd_id());

		Subject subject = new Subject(dto.getSub_id(), dto.getSub_name());

		standard.getSubjectList().add(subject);

		subject.getStdList().add(standard);

		subjectdao.save(subject);

		Standard newStandard = stdService.saveStandard(standard);

		if (newStandard != null) {
			return Response.success(newStandard);
		}
		return Response.error(null);
	}

	@RequestMapping("/adduser")
	public ResponseEntity<?> addUser(UserLoginDTO dto) {

		User user = UserLoginDTO.toEntity(dto);

		User newUser = userService.addNewUser(user);

		if (newUser != null) {
			return Response.success(newUser);
		}
		return Response.error(null);
	}

	@RequestMapping("/findAllteacher")
	public ResponseEntity<?> findAllTeacherByInstituteId(Credentials credentials, HttpServletRequest request) {

		List<User> AllteacherByInstituteId = userDao.findAllTeacherByInstituteId(credentials.getInstitute_id(),
				credentials.getRole());

		if (AllteacherByInstituteId != null) {
			return Response.success(AllteacherByInstituteId);
		}
		return Response.error(null);
	}

	@RequestMapping("/findallstudents")
	public ResponseEntity<?> findAllStudentsByInstituteId(Credentials cred, HttpServletRequest req) {

		List<User> AllStudentByInstituteId = userDao.findAllStudentByInstituteId(cred.getInstitute_id(),
				cred.getRole());

		if (AllStudentByInstituteId != null) {
			return Response.success(AllStudentByInstituteId);
		}
		return Response.error(null);
	}

	@RequestMapping("/findteacher/{id}")
	public ResponseEntity<?> findTeacherById(@PathVariable("id") int id) {

		Optional<TeacherStdDiv> teacher = teacherstddivdao.findById(id);

		if (teacher != null) {
			return Response.success(teacher);
		}
		return Response.error(null);
	}

	@RequestMapping("/addteacherstdiv")
	public ResponseEntity<?> addTeacherStdDiv(TeacherStdDivDTO dto) {

		TeacherStdDiv teacherstddiv = TeacherStdDivDTO.toEntity(dto);

		System.out.println(teacherstddiv);

		if (teacherstddiv != null) {
			teacherstddivdao.save(teacherstddiv);
			return Response.success(teacherstddiv);
		}
		return Response.error(null);
	}

	@RequestMapping("/assignsubteacher")

	public ResponseEntity<?> addSubTeacher(SubjectTeacherStdDTO dto) {

		SubjectTeacherStd subjectstddiv = SubjectTeacherStdDTO.toEntity(dto);

		System.out.println(subjectstddiv);

		if (subjectstddiv != null) {
			subjectteacherstddao.save(subjectstddiv);
			return Response.success(subjectstddiv);
		}
		return Response.error(null);
	}

	@RequestMapping("/findsubteacherstd/{id}")
	public ResponseEntity<?> findSubTeacherById(@PathVariable("id") int id) {

		Optional<SubjectTeacherStd> subteacherstd = subjectteacherstddao.findById(id);

		if (subteacherstd != null) {
			return Response.success(subteacherstd);
		}
		return Response.error(null);
	}

	@RequestMapping("/getassignment/{id}")

	public ResponseEntity<?> findAssignmentById(@PathVariable("id") int id) {

		Optional<Assignment> assignment = assignmentdao.findById(id);

		if (assignment != null) {
			return Response.success(assignment);
		}
		return Response.error(null);
	}

	@RequestMapping("/findstudent/{id}")
	public ResponseEntity<?> findStudentById(@PathVariable("id") int id) {

		Optional<Student> student = studentdao.findById(id);

		if (student != null) {
			return Response.success(student);
		}
		return Response.error(null);
	}

	@RequestMapping("/addstudent")
	public ResponseEntity<?> addStudent(StudentDTO dto) {

		Student student = StudentDTO.toEntity(dto);

		System.out.println(student);

		if (student != null) {
			studentdao.save(student);
			return Response.success(student);
		}
		return Response.error(null);
	}

}
