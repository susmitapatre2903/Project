package com.project.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;
import com.project.entities.Assignment;
import com.project.entities.Division;
import com.project.entities.Standard;
import com.project.entities.Student;
import com.project.entities.StudentDetails;

public class StudentDTO {

	private int std_id;
	private int div_id;
	private int user_id;
	private int assignment_id;
	private MultipartFile assignment_data;
	private int stddetails_id;

	public int getStd_id() {
		return std_id;
	}

	public void setStd_id(int std_id) {
		this.std_id = std_id;
	}

	public int getDiv_id() {
		return div_id;
	}

	public void setDiv_id(int div_id) {
		this.div_id = div_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getAssignment_id() {
		return assignment_id;
	}

	public void setAssignment_id(int assignment_id) {
		this.assignment_id = assignment_id;
	}

	public MultipartFile getAssignment_data() {
		return assignment_data;
	}

	public void setAssignment_data(MultipartFile assignment_data) {
		this.assignment_data = assignment_data;
	}

	public int getStddetails_id() {
		return stddetails_id;
	}

	public void setStddetails_id(int stddetails_id) {
		this.stddetails_id = stddetails_id;
	}

	public static Student toEntity(StudentDTO dto) {

		Student entity = new Student();
		BeanUtils.copyProperties(dto, entity, "assignment_data");

		Standard std = new Standard();
		std.setId(dto.getStd_id());
		entity.setStandard(std);

		Division div = new Division();
		div.setId(dto.getDiv_id());
		entity.setDivision(div);

		Assignment assignment = new Assignment();
		assignment.setId(dto.getAssignment_id());
		entity.setAssignment(assignment);

		StudentDetails studdetails = new StudentDetails();
		studdetails.setId(dto.getStddetails_id());
		entity.setStudentdetails(studdetails);

		return entity;
	}

}
