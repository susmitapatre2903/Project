package com.project.services;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.project.entities.User;

public interface UserService {

	User findById(int id);

	User findByEmail(String email);

	User authenticate(String email, String password);

	List<User> findAll();

	public List<User> findAllTeacherByInstituteId(int id, String role);

	User addNewUser(User user);

	User saveUser(User user, MultipartFile profilepicture);

	int updateProfile(String firstname, String lastname, String username, String password, String mobile,
			MultipartFile profilepicture, int id);

}
