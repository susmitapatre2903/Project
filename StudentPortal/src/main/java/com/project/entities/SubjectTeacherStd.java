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
@Table(name = "subjectteacherstd")
public class SubjectTeacherStd {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;

	@ManyToOne
	@JoinColumn(name = "sub_id")
	private Subject subject;

	@ManyToOne
	@JoinColumn(name = "std_id")
	private Standard standard;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@JsonIgnore
	@OneToOne(mappedBy = "subject", cascade = CascadeType.ALL)
	private TeacherStdDiv teacher;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Standard getStandard() {
		return standard;
	}

	public void setStandard(Standard standard) {
		this.standard = standard;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public TeacherStdDiv getTeacher() {
		return teacher;
	}

	public void setTeacher(TeacherStdDiv teacher) {
		this.teacher = teacher;
	}

	@Override
	public String toString() {
		return "SubjectTeacherStd [id=" + id + ", subject=" + subject + ", standard=" + standard + ", user=" + user
				+ ", teacher=" + teacher + "]";
	}

}
