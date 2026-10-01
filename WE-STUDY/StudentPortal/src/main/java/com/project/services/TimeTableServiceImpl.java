package com.project.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.dao.TimeTableDao;
import com.project.entities.TimeTable;
import com.project.utils.StorageService;

@Transactional
@Service
public class TimeTableServiceImpl implements TimeTableService {

	@Autowired
	private TimeTableDao timetabledao;

	@Autowired
	private StorageService storageService;

	@Override
	public TimeTable savaTimeTable(TimeTable timetable, MultipartFile image) {

		String filename = storageService.store(image);

		timetable.setImage(filename);

		return timetabledao.save(timetable);
	}

	@Override
	public void deleteTimeTableByid(Integer id) {

		timetabledao.deleteById(id);
	}

	@Override
	public TimeTable findTimetableByStdUserId(int std_id, int user_id) {

		return timetabledao.findTimetableByStdUserId(std_id, user_id);
	}

	@Override
	public TimeTable findTimetableByStdId(int std_id) {

		return timetabledao.findTimetableByStdId(std_id);
	}

}
