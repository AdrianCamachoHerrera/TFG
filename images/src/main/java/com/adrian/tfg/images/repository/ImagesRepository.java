package com.adrian.tfg.images.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.adrian.tfg.images.model.Image;

@RepositoryRestResource(collectionResourceRel = "image", path = "image")
public interface ImagesRepository extends MongoRepository<Image, String> {
	
	@RestResource(path = "byAuthor")
	List<Image> findByAuthorAndIsAvatarOrderByDateDesc(String idauthor, boolean avatar);
}
