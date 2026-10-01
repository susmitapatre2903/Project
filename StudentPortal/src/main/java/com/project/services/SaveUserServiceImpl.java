package com.project.services;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.dao.TeacherStdDivDao;
import com.project.dao.UserDao;
import com.project.entities.SubjectTeacherStd;
import com.project.entities.TeacherStdDiv;
import com.project.entities.User;
import com.project.models.AddTeacherDTO;
import com.project.models.SubjectTeacherStdDTO;
import com.project.models.TeacherStdDivDTO;

@Transactional
@Service
public class SaveUserServiceImpl implements SaveUserService {

	@Autowired
	UserDao userDao;

	@Autowired
	private TeacherStdDivDao teacherstddivdao;

	@Override
	public User saveTeacher(AddTeacherDTO user) {

		User teacher = userDao.findById(user.getTeacher_id()).get();

		if (teacher != null) {

			SubjectTeacherStdDTO stsdto = new SubjectTeacherStdDTO(user.getSubjectId(), teacher.getId(),
					user.getStandardId());
			SubjectTeacherStd newSTS = SubjectTeacherStdDTO.toEntity(stsdto);

			TeacherStdDivDTO tsddto = new TeacherStdDivDTO(teacher.getId(), user.getDivisionId(), user.getStandardId());
			TeacherStdDiv teacherstddiv = TeacherStdDivDTO.toEntity(tsddto);
			teacherstddiv.setSubject(newSTS);

			newSTS.setTeacher(teacherstddiv);

			teacherstddivdao.save(teacherstddiv);

			if (teacherstddiv != null) {
				User newUser = userDao.findById(user.getTeacher_id()).get();
				return newUser;
			}

		}

		return null;
	}

	@Override
	public User saveStudent(User user) {

		return null;
	}

}
