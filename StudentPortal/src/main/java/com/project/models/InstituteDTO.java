package com.project.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.project.entities.Institute;

public class InstituteDTO {

	private Integer id;
	private String name;
	private String email_id;
	private String contact_no;
	private String address;
	private MultipartFile profilepicture;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public MultipartFile getProfilepicture() {
		return profilepicture;
	}

	public void setProfilepicture(MultipartFile profilepicture) {
		this.profilepicture = profilepicture;
	}

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	public String getContact_no() {
		return contact_no;
	}

	public void setContact_no(String contact_no) {
		this.contact_no = contact_no;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "InstituteDTO [id=" + id + ", name=" + name + ", profilepicture=" + profilepicture + "]";
	}

	public static Institute toEntity(InstituteDTO dto) {
		Institute institute = new Institute();
		BeanUtils.copyProperties(dto, institute, "profilepicture");

		return institute;
	}

}