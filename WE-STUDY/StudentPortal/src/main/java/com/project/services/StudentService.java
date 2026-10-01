package com.project.services;

import org.springframework.web.multipart.MultipartFile;
import com.project.entities.Student;
import com.project.entities.User;

public interface StudentService {

	User findByEmail(String email);

	User authenticate(String email);

	int updatePassword(String email, String password);

	Student saveStudent(Student student, MultipartFile assignment_data);

	void deleteAssignmentById(Integer id);

}
