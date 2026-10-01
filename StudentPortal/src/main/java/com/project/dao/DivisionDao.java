package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.Division;

public interface DivisionDao extends JpaRepository<Division, Integer> {

	@Query("select d from Division d where d.id=?1")
	Division findDivision(int divid);

}
