package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.entities.User;
import com.project.models.Credentials;
import com.project.models.Response;
import com.project.services.UserService;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/authenticate")
	public ResponseEntity<?> authenticate(Credentials credentials) {

		User user = userService.authenticate(credentials.getEmail(), credentials.getPassword());

		System.out.println(user);

		if (user != null) {
			return Response.success(user);
		}
		return Response.error(null);
	}

	@RequestMapping("/finduser/{id}")
	public User findUser(@PathVariable("id") int id) {

		User user = userService.findById(id);

		System.out.println(user);

		return user;
	}

}
