package com.adrian.tfg.users.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adrian.tfg.users.model.User;
import com.adrian.tfg.users.service.UsersService;

@RestController
@CrossOrigin
public class UsersController {
	
	@Autowired
	private UsersService usersService;
	
	@PostMapping("/register")
	public ResponseEntity<User> register(@RequestBody User user) {
		if (user.getUsername()==null || user.getUsername().isEmpty() ||
				user.getPassword()==null || user.getPassword().isEmpty() ) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		user = usersService.registerUser(user);
		user.setPassword(null);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User user) {
		User loggedUser = usersService.login(user.getUsername(), user.getPassword());
		if(Objects.nonNull(loggedUser)) {
			loggedUser.setPassword(null);
			return new ResponseEntity<>(loggedUser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}	
	}
	
	@GetMapping("/friends")
	public ResponseEntity<List<String>> getFriends(@RequestParam String id) {
		List<String> friends = usersService.findFriends(id);
		if(Objects.nonNull(friends)) {
			return new ResponseEntity<>(friends, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PatchMapping("/friends")
	public ResponseEntity<User> patchFriends(@RequestParam String id, @RequestBody List<String> friends) {
		try {
			return new ResponseEntity<>(usersService.updateFriends(id, friends), HttpStatus.OK);
		}catch(RuntimeException e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/health")
	public ResponseEntity<Void> health(){
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	
	
}
