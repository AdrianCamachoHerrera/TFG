package com.adrian.tfg.users.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.adrian.tfg.users.model.User;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserRepository extends MongoRepository<User, String> {

	List<User> findByName(@Param("name") String name);
	
	List<User> findByNameLike(@Param("name") String name);
	
	List<User> findByLastnameLike(@Param("lastname") String lastname);
	
}
