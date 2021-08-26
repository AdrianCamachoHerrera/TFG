package com.adrian.tfg.images.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.adrian.tfg.images.model.Image;

@RepositoryRestResource(collectionResourceRel = "image", path = "image")
public interface ImagesRepository extends MongoRepository<Image, String> {

}
