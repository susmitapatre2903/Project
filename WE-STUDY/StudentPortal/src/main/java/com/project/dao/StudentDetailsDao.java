package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.StudentDetails;

public interface StudentDetailsDao extends JpaRepository<StudentDetails, Integer> {

	@Query("select s from StudentDetails s where s.user.id=?1")
	StudentDetails findstudentbyuserid(int user_id);

}
