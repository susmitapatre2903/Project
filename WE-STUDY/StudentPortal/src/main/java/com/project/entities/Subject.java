package com.project.entities;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "subject")
public class Subject {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	private String sub_name;

	@JsonIgnore
	@ManyToMany(mappedBy = "subjectList", cascade = CascadeType.ALL)
	private List<Standard> stdList;

	@JsonIgnore
	@OneToMany(mappedBy = "subject")
	private List<SubjectTeacherStd> subjectTeacherStdList;

	@JsonIgnore
	@OneToMany(mappedBy = "subject")
	private List<Assignment> assignmentList;

	public Subject() {

		this.stdList = new ArrayList<Standard>();
		this.subjectTeacherStdList = new ArrayList<SubjectTeacherStd>();
		this.assignmentList = new ArrayList<Assignment>();
	}

	public Subject(int id, String sub_name) {

		this.id = id;
		this.sub_name = sub_name;
		this.stdList = new ArrayList<Standard>();
		this.subjectTeacherStdList = new ArrayList<SubjectTeacherStd>();
		this.assignmentList = new ArrayList<Assignment>();
	}

	public List<Assignment> getAssignmentList() {
		return assignmentList;
	}

	public void setAssignmentList(List<Assignment> assignmentList) {
		this.assignmentList = assignmentList;
	}

	public List<SubjectTeacherStd> getSubjectTeacherStdList() { // OneToMany getter setter
		return subjectTeacherStdList;
	}

	public void setSubjectTeacherStdList(List<SubjectTeacherStd> subjectTeacherStdList) {
		this.subjectTeacherStdList = subjectTeacherStdList;
	}

	public List<Standard> getStdList() {
		return stdList;
	}

	public void setStdList(List<Standard> stdList) {
		this.stdList = stdList;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSub_name() {
		return sub_name;
	}

	public void setSub_name(String sub_name) {
		this.sub_name = sub_name;
	}

	@Override
	public String toString() {
		return "Subject [id=" + id + ", sub_name=" + sub_name + ", stdList=" + stdList + ", subjectTeacherStdList="
				+ subjectTeacherStdList + ", assignmentList=" + assignmentList + "]";
	}

}
