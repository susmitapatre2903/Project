package com.project.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.project.entities.Institute;
import com.project.entities.User;

public class UserDTO {

	private int id;
	private String firstname;
	private String lastname;
	private String username;
	private String password;
	private String email;
	private String mobile;
	private String role;
	private MultipartFile profilepicture;
	private int institute_id;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public MultipartFile getProfilepicture() {
		return profilepicture;
	}

	public void setProfilepicture(MultipartFile profilepicture) {
		this.profilepicture = profilepicture;
	}

	public int getInstitute_id() {
		return institute_id;
	}

	public void setInstitute_id(int institute_id) {
		this.institute_id = institute_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", username=" + username
				+ ", password=" + password + ", email=" + email + ", mobile=" + mobile + ", role=" + role
				+ ", profilepicture=" + profilepicture + ", institute_id=" + institute_id + "]";
	}

	public static User toEntity(UserDTO dto) {

		User entity = new User();
		BeanUtils.copyProperties(dto, entity, "profilepicture");

		Institute ist = new Institute();
		ist.setId(dto.getInstitute_id());
		entity.setInstituteid(ist);

		return entity;
	}

}
