package com.project.services;

import org.springframework.web.multipart.MultipartFile;
import com.project.entities.TimeTable;

public interface TimeTableService {

	TimeTable savaTimeTable(TimeTable timetable, MultipartFile image);

	void deleteTimeTableByid(Integer id);

	TimeTable findTimetableByStdUserId(int std_id, int user_id);

	TimeTable findTimetableByStdId(int std_id);
}
