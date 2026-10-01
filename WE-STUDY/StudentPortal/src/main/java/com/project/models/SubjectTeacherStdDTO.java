package com.project.models;

import com.project.entities.Standard;
import com.project.entities.Subject;
import com.project.entities.SubjectTeacherStd;
import com.project.entities.User;

public class SubjectTeacherStdDTO {

	private int sub_id;
	private int user_id;
	private int std_id;

	public SubjectTeacherStdDTO() {

	}

	public SubjectTeacherStdDTO(int sub_id, int user_id, int std_id) {

		this.sub_id = sub_id;
		this.user_id = user_id;
		this.std_id = std_id;
	}

	public int getSub_id() {
		return sub_id;
	}

	public void setSub_id(int sub_id) {
		this.sub_id = sub_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getStd_id() {
		return std_id;
	}

	public void setStd_id(int std_id) {
		this.std_id = std_id;
	}

	@Override
	public String toString() {
		return "SubjectTeacherStdDTO [sub_id=" + sub_id + ", user_id=" + user_id + ", std_id=" + std_id + "]";
	}

	public static SubjectTeacherStd toEntity(SubjectTeacherStdDTO dto) {

		SubjectTeacherStd entity = new SubjectTeacherStd();

		User user = new User();
		user.setId(dto.getUser_id());
		entity.setUser(user);

		Standard std = new Standard();
		std.setId(dto.getStd_id());
		entity.setStandard(std);

		Subject subject = new Subject();
		subject.setId(dto.getSub_id());
		entity.setSubject(subject);

		return entity;
	}

}
