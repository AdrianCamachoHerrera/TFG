package com.adrian.tfg.users.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adrian.tfg.users.model.User;
import com.adrian.tfg.users.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		if(user.getEmail() == null || user.getEmail().isEmpty() || user.getUsername()==null ||
				user.getUsername().isEmpty() || user.getPassword()==null || user.getPassword().isEmpty() ) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		user = userService.registerUser(user);
		user.setPassword(null);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
		User loggedUser = userService.login(username, password);
		if(Objects.nonNull(loggedUser)) {
			loggedUser.setPassword(null);
			return new ResponseEntity<>(loggedUser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}	
	}
	

}
