package com.project.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.entities.TimeTable;
import org.springframework.data.jpa.repository.Query;

public interface TimeTableDao extends JpaRepository<TimeTable, Integer> {

	@Query("select s from TimeTable s where s.std.id=?1 and s.user.id=?2")
	TimeTable findTimetableByStdUserId(int std_id, int user_id);

	@Query("select s from TimeTable s where s.std.id=?1")
	TimeTable findTimetableByStdId(int std_id);
}
