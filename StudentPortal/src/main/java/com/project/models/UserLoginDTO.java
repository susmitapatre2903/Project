package com.project.models;

import org.springframework.beans.BeanUtils;

import com.project.entities.Institute;
import com.project.entities.User;

public class UserLoginDTO {

	private String firstname;
	private String lastname;
	private String username;
	private String email;
	private String password;
	private String role;
	private String mobile;
	private String institutename;
	private int institue_id;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getInstitutename() {
		return institutename;
	}

	public void setInstitutename(String institutename) {
		this.institutename = institutename;
	}

	public int getInstitue_id() {
		return institue_id;
	}

	public void setInstitue_id(int institue_id) {
		this.institue_id = institue_id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Override
	public String toString() {
		return "UserLoginDTO [email=" + email + ", password=" + password + ", role=" + role + ", institutename="
				+ institutename + ", institue_id=" + institue_id + "]";
	}

	public static UserLoginDTO fromEntity(User entity) {

		UserLoginDTO dto = new UserLoginDTO();
		BeanUtils.copyProperties(entity, dto);

		dto.setRole(entity.getRole());
		dto.setInstitue_id(entity.getInstituteid().getId());
		dto.setInstitutename(entity.getInstituteid().getName());

		return dto;
	}

	public static User toEntity(UserLoginDTO dto) {

		User user = new User();
		BeanUtils.copyProperties(dto, user);

		Institute inst = new Institute();
		inst.setId(dto.getInstitue_id());
		user.setInstituteid(inst);

		return user;
	}

	public static User toEntity(AddTeacherDTO dto) {

		User user = new User();
		BeanUtils.copyProperties(dto, user);

		Institute inst = new Institute();
		inst.setId(dto.getInstituteId());
		user.setInstituteid(inst);

		return user;
	}

}
