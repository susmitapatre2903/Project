package com.project.models;

import com.project.entities.Division;
import com.project.entities.Standard;
import com.project.entities.SubjectTeacherStd;
import com.project.entities.TeacherStdDiv;
import com.project.entities.User;

public class TeacherStdDivDTO {

	private int user_id;
	private int div_id;
	private int std_id;
	private int sub_id;

	public TeacherStdDivDTO() {

	}

	public TeacherStdDivDTO(int user_id, int div_id, int std_id) {

		this.user_id = user_id;
		this.div_id = div_id;
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

	public int getDiv_id() {
		return div_id;
	}

	public void setDiv_id(int div_id) {
		this.div_id = div_id;
	}

	public int getStd_id() {
		return std_id;
	}

	public void setStd_id(int std_id) {
		this.std_id = std_id;
	}

	@Override
	public String toString() {
		return "TeacherStdDivDTO [user_id=" + user_id + ", div_id=" + div_id + ", std_id=" + std_id + "]";
	}

	public static TeacherStdDiv toEntity(TeacherStdDivDTO dto) {

		TeacherStdDiv entity = new TeacherStdDiv();

		Division div = new Division();
		div.setId(dto.getDiv_id());
		entity.setDivision(div);

		Standard std = new Standard();
		std.setId(dto.getStd_id());
		entity.setStandard(std);

		User user = new User();
		user.setId(dto.getUser_id());
		entity.setUser(user);

		SubjectTeacherStd subteachstd = new SubjectTeacherStd();
		subteachstd.setId(dto.getSub_id());
		entity.setSubject(subteachstd);

		return entity;
	}

}
