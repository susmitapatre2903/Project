package com.project.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.Student;

public interface StudentDao extends JpaRepository<Student, Integer> {

	@Query("select s from Student s where s.assignment.id = ?1")
	List<Student> findAssignmentById(int id);

}
