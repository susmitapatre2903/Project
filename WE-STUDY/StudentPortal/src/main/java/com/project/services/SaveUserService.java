package com.project.services;

import com.project.entities.User;
import com.project.models.AddTeacherDTO;

public interface SaveUserService {

	User saveTeacher(AddTeacherDTO user);

	User saveStudent(User user);

}
