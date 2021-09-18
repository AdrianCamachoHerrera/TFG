package com.adrian.tfg.users.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.adrian.tfg.users.model.User;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
@CrossOrigin
public interface UsersRepository extends MongoRepository<User, String> {
	
	boolean existsByUsername(String username);
	
	Optional<User> findByUsername(String username);
		
	List<User> findByUsernameLike(String name);
		
}
