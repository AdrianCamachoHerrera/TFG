package com.adrian.tfg.users.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.adrian.tfg.users.model.User;

@Repository("userRepository")
public interface UserRepository extends MongoRepository<User, String> {
	
	boolean existsByUsername(String username);
	
	boolean existsByEmail(String email);

	Optional<User> findByUsername(String username);
}
