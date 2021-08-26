package com.adrian.tfg.users.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.adrian.tfg.users.model.User;
import com.adrian.tfg.users.repository.UsersRepository;

@Service
public class UsersService {
	
	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User registerUser(User user) {
		if(usersRepository.existsByUsername(user.getUsername()) ) {
			throw new RuntimeException("user already exist");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setId(null);
		user.setAvatar(null);
		user.setFriends(new ArrayList<String>());
		return usersRepository.save(user);
	}

	public User login(String username, String password) {
		Optional<User> userOpt = usersRepository.findByUsername(username);
		if(userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
			return userOpt.get();
		}else {
			return null;
		}
	}

	public List<String> findFriends(String id) {
		Optional<User> userOpt = usersRepository.findById(id);
		if(userOpt.isPresent()) {
			return userOpt.get().getFriends();
		}else {
			return null;
		}
	}

	public User updateFriends(String id, List<String> friends) {
		Optional<User> userOpt = usersRepository.findById(id);
		if(!userOpt.isPresent()) {
			throw new RuntimeException("user does not exists");
		}
		for(String friend : friends) {
			Optional<User> friendOpt = usersRepository.findById(friend);
			if(!friendOpt.isPresent()) {
				throw new RuntimeException("friend does not exists");
			}
		}
		User user = userOpt.get();
		user.setFriends(friends);
		return usersRepository.save(user);
		
	}

}
