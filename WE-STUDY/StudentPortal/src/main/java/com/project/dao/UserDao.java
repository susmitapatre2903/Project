package com.project.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import com.project.entities.User;

public interface UserDao extends JpaRepository<User, Integer> {

	@Query("select username from User u where u.username = ?1")
	public List<User> find(String username1);

	@Modifying
	@Query("update User u set u.password = ?2 where u.email = ?1")
	int updatePassword(String email, String password);

	@Query("select u from User u where u.instituteid.id = ?1 and u.role=?2")
	public List<User> findAllTeacherByInstituteId(int id, String role);

	@Query("select u from User u where u.instituteid.id = ?1 and u.role=?2")
	public List<User> findAllStudentByInstituteId(int id, String role);

	@Modifying
	@Query("update User u set u.firstname = ?1 , u.lastname = ?2 , u.username = ?3 , u.password = ?4 ,  u.mobile = ?5 , u.profilepicture = ?6  where u.id = ?7")
	int updateProfile(String firstname, String lastname, String username, String password, String mobile,
			String profilepicture, int id);

	@Query("select u from User u where u.email = ?1")
	User findByEmail(String email);

}
