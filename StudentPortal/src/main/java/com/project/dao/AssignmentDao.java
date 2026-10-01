package com.project.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.Assignment;

public interface AssignmentDao extends JpaRepository<Assignment, Integer> {

	@Query("select a from Assignment a where a.standard.id = ?1 and a.division.id = ?2 and a.subject.id=?3")
	Assignment findAssignment(int std_id, int div_id, int sub_id);

	@Query("select a from Assignment a where a.user.id=?1 and a.subject.id=?2 and a.division.id=?3 and a.standard.id=?4 ")
	List<Assignment> findAssignmentwrtUser(int user_id, int sub_id, int div_id, int std_id);

	@Query("select a from Assignment a where a.subject.id=?1 and a.division.id=?2 and a.standard.id=?3 ")
	List<Assignment> findAssignmentwrtStdDivSub(int sub_id, int div_id, int std_id);

}
