package com.project.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;
import com.project.entities.Assignment;
import com.project.entities.Division;
import com.project.entities.Standard;
import com.project.entities.Subject;
import com.project.entities.User;

public class AssignmentDTO {

	private int id;
	private int user_id;
	private int sub_id;
	private int div_id;
	private String deadline;
	private MultipartFile assignment;
	private int std_id;
	private String assignment_title;

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getSub_id() {
		return sub_id;
	}

	public void setSub_id(int sub_id) {
		this.sub_id = sub_id;
	}

	public int getDiv_id() {
		return div_id;
	}

	public void setDiv_id(int div_id) {
		this.div_id = div_id;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public MultipartFile getAssignment() {
		return assignment;
	}

	public void setAssignment(MultipartFile assignment) {
		this.assignment = assignment;
	}

	public int getStd_id() {
		return std_id;
	}

	public void setStd_id(int std_id) {
		this.std_id = std_id;
	}

	public String getAssignment_title() {
		return assignment_title;
	}

	public void setAssignment_title(String assignment_title) {
		this.assignment_title = assignment_title;
	}

	@Override
	public String toString() {
		return "AssignmentDTO [id=" + id + ", user_id=" + user_id + ", sub_id=" + sub_id + ", div_id=" + div_id
				+ ", deadline=" + deadline + ", assignment=" + assignment + ", std_id=" + std_id + ", assignment_title="
				+ assignment_title + "]";
	}

	public static Assignment toEntity(AssignmentDTO dto) {

		Assignment entity = new Assignment();
		BeanUtils.copyProperties(dto, entity, "assignment");

		User user = new User();
		user.setId(dto.getUser_id());
		entity.setUser(user);

		Subject sub = new Subject();
		sub.setId(dto.getSub_id());
		entity.setSubject(sub);

		Division div = new Division();
		div.setId(dto.getDiv_id());
		entity.setDivision(div);

		Standard std = new Standard();
		std.setId(dto.getStd_id());
		entity.setStandard(std);

		return entity;
	}
}
