package com.project.entities;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "standard")
public class Standard {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int id;
	@Column(name = "std_name")
	private String standardName;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "institute_id")
	private Institute instituteid;

	@ManyToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinTable(name = "stddivinst", joinColumns = { @JoinColumn(name = "std_id") }, inverseJoinColumns = {
			@JoinColumn(name = "div_id") })
	private List<Division> divisionList;

	@ManyToMany
	@JoinTable(name = "stdsubinst", joinColumns = { @JoinColumn(name = "std_id") }, inverseJoinColumns = {
			@JoinColumn(name = "sub_id") })
	private List<Subject> subjectList;

	@JsonIgnore
	@OneToMany(mappedBy = "standard")
	private List<TeacherStdDiv> teacherStdDivList;

	@JsonIgnore
	@OneToMany(mappedBy = "standard")
	private List<SubjectTeacherStd> subjectTeacherStdList;

	@OneToMany(mappedBy = "standard")
	private List<Assignment> assignmentList;

	@JsonIgnore
	@OneToMany(mappedBy = "standard")
	private List<Student> studentList;

	@OneToOne(mappedBy = "std")
	private TimeTable timetable;

	@OneToOne(mappedBy = "standard")
	private Notice notice;

	public void removeDivision(Division division) {

		this.divisionList.remove(division);
		division.getStdList().remove(this);
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

	public List<SubjectTeacherStd> getSubjectTeacherStdList() {
		return subjectTeacherStdList;
	}

	public void setSubjectTeacherStdList(List<SubjectTeacherStd> subjectTeacherStdList) {
		this.subjectTeacherStdList = subjectTeacherStdList;
	}

	public List<Subject> getSubjectList() {
		return subjectList;
	}

	public void setSubjectList(List<Subject> subjectList) {
		this.subjectList = subjectList;
	}

	public TimeTable getTimetable() {
		return timetable;
	}

	public void setTimetable(TimeTable timetable) {
		this.timetable = timetable;
	}

	public String getStandardName() {
		return standardName;
	}

	public void setStandardName(String standardName) {
		this.standardName = standardName;
	}

	public Institute getInstituteid() {
		return instituteid;
	}

	public void setInstituteid(Institute instituteid) {
		this.instituteid = instituteid;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<Division> getDivisionList() {
		return divisionList;
	}

	public void setDivisionList(List<Division> divisionList) {
		this.divisionList = divisionList;
	}

	public List<TeacherStdDiv> getTeacherStdDivList() {
		return teacherStdDivList;
	}

	public void setTeacherStdDivList(List<TeacherStdDiv> teacherStdDivList) {
		this.teacherStdDivList = teacherStdDivList;
	}

	public Notice getNotice() {
		return notice;
	}

	public void setNotice(Notice notice) {
		this.notice = notice;
	}

	@Override
	public String toString() {
		return "Standard [id=" + id + ", standardName=" + standardName + ", instituteid=" + instituteid + ", timetable="
				+ timetable + ", notice=" + notice + "]";
	}

}
