package com.project.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.dao.AssignmentDao;
import com.project.dao.NoticeDao;
import com.project.dao.StudentDao;
import com.project.dao.TeacherStdDivDao;
import com.project.entities.Assignment;
import com.project.entities.Notice;
import com.project.entities.Student;
import com.project.entities.SubjectTeacherStd;
import com.project.entities.TeacherStdDiv;
import com.project.entities.TimeTable;
import com.project.entities.User;
import com.project.models.AssignmentDTO;
import com.project.models.NoticeDTO;
import com.project.models.Response;
import com.project.models.TeacherStdDivDTO;
import com.project.models.TimeTableDTO;
import com.project.models.UserDTO;
import com.project.services.AssignmentService;
import com.project.services.TimeTableService;
import com.project.services.UserService;

@CrossOrigin
@RestController
public class TeacherController {

	@Autowired
	private AssignmentService assignmentservice;

	@Autowired
	private AssignmentDao assignDao;

	@Autowired
	private StudentDao studentdao;

	@Autowired
	private TeacherStdDivDao teacherdao;

	@Autowired
	private UserService userservice;

	@Autowired
	private TimeTableService timetableservice;

	@Autowired
	private NoticeDao noticedao;

	@RequestMapping("/findstudentassignment/{id}")
	public ResponseEntity<?> findStudentAssignmentById(@PathVariable("id") int id) {

		Optional<Student> student = studentdao.findById(id);

		if (student != null) {
			return Response.success(student);
		}
		return Response.error(null);
	}

	@RequestMapping("/addAssignment")
	public ResponseEntity<?> save(AssignmentDTO assignmentDto) {

		Assignment assignment = AssignmentDTO.toEntity(assignmentDto);

		assignment = assignmentservice.saveAssignment(assignment, assignmentDto.getAssignment());

		if (assignment != null) {
			return Response.success(assignment);
		}
		return Response.error("Something went wrong");

	}

	@RequestMapping("/findassignment")
	public ResponseEntity<?> findAssignment(AssignmentDTO dto) {

		Assignment assignment = assignmentservice.findAssignment(dto.getStd_id(), dto.getDiv_id(), dto.getSub_id());

		if (assignment != null) {
			return Response.success(assignment);
		}
		return Response.error(null);
	}

	@RequestMapping("/findassignmentbyid/{id}")
	public ResponseEntity<?> findAssignmentById(@PathVariable("id") int id) {

		Assignment assignment = assignDao.findById(id).get();

		if (assignment != null) {
			return Response.success(assignment);
		}
		return Response.error(null);
	}

	@RequestMapping("/findassignmentwrtUser")
	public ResponseEntity<?> findAssignmentwrtUser(AssignmentDTO dto) {

		List<Assignment> assignment = assignmentservice.findAssignmentwrtUser(dto.getUser_id(), dto.getSub_id(),
				dto.getDiv_id(), dto.getStd_id());

		if (assignment != null) {
			return Response.success(assignment);
		}
		return Response.error(null);
	}

	@RequestMapping("/deleteassignment/{id}")
	public ResponseEntity<?> deleteAssignmentById(@PathVariable("id") int id) {

		assignmentservice.deleteAssignmentById(id);

		return Response.success("Successfully deleted");
	}

	@RequestMapping("/findAssigmentById/{id}")
	public ResponseEntity<?> findAssigmentById(@PathVariable("id") int id) {

		List<Student> studentList = studentdao.findAssignmentById(id);

		if (studentList != null) {
			return Response.success(studentList);
		}
		return Response.error(null);
	}

	@RequestMapping("/findsubjectwrtStdDiv")
	public ResponseEntity<?> findSubjectWrtStdDiv(TeacherStdDivDTO dto) {

		TeacherStdDiv subject = teacherdao.findSubjectWrtStdDiv(dto.getUser_id(), dto.getStd_id(), dto.getDiv_id());

		SubjectTeacherStd subTeacherStd = subject.getSubject();

		if (subTeacherStd != null) {
			return Response.success(subTeacherStd.getSubject());
		}
		return Response.error(null);
	}

	@RequestMapping("/gettimetable")
	public ResponseEntity<?> findTimetableById(TeacherStdDivDTO dto) {

		TimeTable timetable = timetableservice.findTimetableByStdUserId(dto.getStd_id(), dto.getUser_id());

		System.out.println(timetable);

		if (timetable != null) {
			return Response.success(timetable);
		}
		return Response.error(null);
	}

	@RequestMapping("/addtimetable")
	public ResponseEntity<?> addTimeTable(TimeTableDTO timetableDto) {

		TimeTable timetable = TimeTableDTO.toEntity(timetableDto);

		timetable = timetableservice.savaTimeTable(timetable, timetableDto.getImage());

		return Response.success(timetable);
	}

	@RequestMapping("/deletetimetable/{id}")
	public ResponseEntity<?> deleteTimeTableById(@PathVariable("id") int id) {

		timetableservice.deleteTimeTableByid(id);

		return Response.success("Successfully deleted");
	}

	@RequestMapping("/getnotice")
	public ResponseEntity<?> findNoticeByStdUserId(TeacherStdDivDTO dto) {

		System.out.println(dto.getStd_id() + "" + dto.getUser_id());

		Notice notice = noticedao.findNoticeByStdUserId(dto.getStd_id(), dto.getUser_id());

		if (notice != null) {
			return Response.success(notice);
		}
		return Response.error(null);
	}

	@RequestMapping("/findNoticeByid/{id}")
	public ResponseEntity<?> findNoticeById(@PathVariable("id") int id) {

		Optional<Notice> notice = noticedao.findById(id);

		if (notice != null) {
			return Response.success(notice);
		}
		return Response.error(null);
	}

	@RequestMapping("/deletenotice/{id}")
	public ResponseEntity<?> deleteNoticeById(@PathVariable("id") int id) {

		noticedao.deleteById(id);

		return Response.success("Successfully deleted");
	}

	@RequestMapping("/addnotice")
	public ResponseEntity<?> addNotice(NoticeDTO dto) {

		Notice notice = NoticeDTO.toEntity(dto);

		notice = noticedao.save(notice);

		return Response.success(notice);
	}

	@RequestMapping("/editprofile")
	public ResponseEntity<?> save(UserDTO userDto) {

		User user = UserDTO.toEntity(userDto);

		user = userservice.saveUser(user, userDto.getProfilepicture());

		return Response.success(user);
	}

	@RequestMapping("/updateprofile")
	public ResponseEntity<?> updateProfileById(UserDTO dto) {

		int result = userservice.updateProfile(dto.getFirstname(), dto.getLastname(), dto.getUsername(),
				dto.getPassword(), dto.getMobile(), dto.getProfilepicture(), dto.getId());

		if (result == 1) {
			return Response.success(result);
		}
		return Response.error(null);
	}

}
