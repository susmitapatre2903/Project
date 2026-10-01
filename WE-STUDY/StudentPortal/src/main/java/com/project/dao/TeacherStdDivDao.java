package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.TeacherStdDiv;

public interface TeacherStdDivDao extends JpaRepository<TeacherStdDiv, Integer> {

	@Query("select t from TeacherStdDiv t where t.user.id=?1 and t.standard.id=?2 and t.division.id=?3")
	TeacherStdDiv findSubjectWrtStdDiv(int user_id, int std_id, int div_id);

}
