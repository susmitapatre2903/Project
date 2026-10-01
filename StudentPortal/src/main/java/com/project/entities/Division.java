package com.project.entities;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "division")
public class Division {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;

	@Column(name = "div_name")
	private String divName;

	@JsonIgnore
	@ManyToMany(mappedBy = "divisionList")
	private List<Standard> stdList;

	@JsonIgnore
	@OneToMany(mappedBy = "division")
	private List<TeacherStdDiv> teacherStdDivList;

	@JsonIgnore
	@OneToMany(mappedBy = "division")
	private List<Assignment> assignmentList;

	@JsonIgnore
	@OneToMany(mappedBy = "division")
	private List<Student> studentList;

	public Division() {

		this.stdList = new ArrayList<Standard>();
		this.teacherStdDivList = new ArrayList<TeacherStdDiv>();
		this.assignmentList = new ArrayList<Assignment>();
		this.studentList = new ArrayList<Student>();
	}

	public Division(int id, String divName) {

		this.id = id;
		this.divName = divName;
		this.stdList = new ArrayList<Standard>();
		this.teacherStdDivList = new ArrayList<TeacherStdDiv>();
		this.assignmentList = new ArrayList<Assignment>();
		this.studentList = new ArrayList<Student>();
	}

	public List<Assignment> getAssignmentList() {
		return assignmentList;
	}

	public List<Student> getStudentList() {
		return studentList;
	}

	public void setStudentList(List<Student> studentList) {
		this.studentList = studentList;
	}

	public void setAssignmentList(List<Assignment> assignmentList) {
		this.assignmentList = assignmentList;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDivName() {
		return divName;
	}

	public void setDivName(String divName) {
		this.divName = divName;
	}

	public List<Standard> getStdList() {
		return stdList;
	}

	public void setStdList(List<Standard> stdList) {
		this.stdList = stdList;
	}

	public List<TeacherStdDiv> getTeacherStdDivList() {
		return teacherStdDivList;
	}

	public void setTeacherStdDivList(List<TeacherStdDiv> teacherStdDivList) {
		this.teacherStdDivList = teacherStdDivList;
	}

	@Override
	public String toString() {
		return "Division [id=" + id + ", divName=" + divName + "]";
	}

	public void addStandard(Standard standard) {

		this.stdList.add(standard);
		standard.getDivisionList().add(this);
	}

	public void removeStandard(Standard standard) {

		this.stdList.remove(standard);
		standard.getDivisionList().remove(this);
	}

}
