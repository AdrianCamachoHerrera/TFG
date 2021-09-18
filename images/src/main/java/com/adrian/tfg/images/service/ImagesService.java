package com.adrian.tfg.images.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.adrian.tfg.images.model.Image;
import com.adrian.tfg.images.repository.ImagesRepository;


@Service
public class ImagesService {
	
	@Autowired
	private ImagesRepository imagesRepository;

	public Image uploadImage(String author, String description, boolean isAvatar, MultipartFile imageFile) throws IOException {
        Image image = new Image(); 
        
        image.setAuthor(author);
        image.setDescription(description);
        image.setAvatar(isAvatar);
        image.setDate(new Date());
        image.setImage(
          new Binary(BsonBinarySubType.BINARY, imageFile.getBytes())); 
        
        return imagesRepository.insert(image);
	}

	public List<String> findImagesList(String author) {
		
		return imagesRepository.findByAuthorAndIsAvatarOrderByDateDesc(author, false).stream().map(Image::getId).collect(Collectors.toList());
	}

}
