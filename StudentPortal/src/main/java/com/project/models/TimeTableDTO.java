package com.project.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.project.entities.Standard;
import com.project.entities.TimeTable;
import com.project.entities.User;

public class TimeTableDTO {

	private MultipartFile image;
	private int std_id;
	private int user_id;

	public MultipartFile getImage() {
		return image;
	}

	public void setImage(MultipartFile image) {
		this.image = image;
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
		return "TimeTableDTO [image=" + image + ", std_id=" + std_id + ", user_id=" + user_id + "]";
	}

	public static TimeTable toEntity(TimeTableDTO dto) {

		TimeTable entity = new TimeTable();
		BeanUtils.copyProperties(dto, entity, "image");

		Standard std = new Standard();
		std.setId(dto.getStd_id());
		entity.setStd(std);

		User user = new User();
		user.setId(dto.getUser_id());
		entity.setUser(user);

		return entity;
	}

}
