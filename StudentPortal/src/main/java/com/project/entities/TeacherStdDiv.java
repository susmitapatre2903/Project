package com.project.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "teacherstddiv")
public class TeacherStdDiv {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "div_id")
	private Division division;

	@ManyToOne
	@JoinColumn(name = "std_id")
	private Standard standard;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sub_id")
	private SubjectTeacherStd subject;

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

	public Division getDivision() {
		return division;
	}

	public void setDivision(Division division) {
		this.division = division;
	}

	public Standard getStandard() {
		return standard;
	}

	public void setStandard(Standard standard) {
		this.standard = standard;
	}

	public SubjectTeacherStd getSubject() {
		return subject;
	}

	public void setSubject(SubjectTeacherStd subject) {
		this.subject = subject;
	}

	@Override
	public String toString() {
		return "TeacherStdDiv [id=" + id + ", user=" + user + ", division=" + division + ", standard=" + standard
				+ ", subject=" + subject + "]";
	}

}
