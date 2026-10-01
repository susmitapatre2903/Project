package com.project.models;

import org.springframework.beans.BeanUtils;

import com.project.entities.Notice;
import com.project.entities.Standard;
import com.project.entities.User;

public class NoticeDTO {

	private String information;
	private int std_id;
	private int user_id;

	public String getInformation() {
		return information;
	}

	public void setInformation(String information) {
		this.information = information;
	}

	public int getStd_id() {
		return std_id;
	}

	public void setStd_id(int std_id) {
		this.std_id = std_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	@Override
	public String toString() {
		return "NoticeDTO [information=" + information + ", std_id=" + std_id + ", user_id=" + user_id + "]";
	}

	public static Notice toEntity(NoticeDTO dto) {

		Notice entity = new Notice();
		BeanUtils.copyProperties(dto, entity);

		Standard std = new Standard();
		std.setId(dto.getStd_id());
		entity.setStandard(std);

		User user = new User();
		user.setId(dto.getUser_id());
		entity.setUser(user);

		return entity;
	}

}
