package com.adrian.tfg.users.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.adrian.tfg.users.model.User;
import com.adrian.tfg.users.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public User registerUser(User user) {
		if(userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
			throw new RuntimeException("user already exist");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setId(null);
		return userRepository.save(user);
	}

	public User login(String username, String password) {
		Optional<User> userOpt = userRepository.findByUsername(username);
		if(userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
			return userOpt.get();
		}else {
			return null;
		}
	}

}
