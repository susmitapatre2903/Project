package com.project.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "time_table")
public class TimeTable {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	private String image;

	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "std_id")
	private Standard std;

	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Standard getStd() {
		return std;
	}

	public void setStd(Standard std) {
		this.std = std;
	}

	@Override
	public String toString() {
		return "TimeTable [id=" + id + ", image=" + image + "]";
	}

}
