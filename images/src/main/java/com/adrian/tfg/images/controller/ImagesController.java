package com.adrian.tfg.images.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.adrian.tfg.images.model.Image;
import com.adrian.tfg.images.service.ImagesService;

@RestController
public class ImagesController {
	
	private static List<String> VALID_IMAGE_EXTENSIONS = Arrays.asList("image/jpg", "image/jpeg", "image/png");
	
	@Autowired
	private ImagesService imagesService;

	@GetMapping("/health")
	public ResponseEntity<Void> health(){
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/upload")
	public ResponseEntity<Image> postImage(@RequestParam String author, @RequestParam String description, @RequestParam boolean isAvatar, @RequestBody MultipartFile image ){
		try {
			if(author == null || description == null || image == null || image.isEmpty())
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			
			if(!VALID_IMAGE_EXTENSIONS.contains(image.getContentType()))
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		
		
			return new ResponseEntity<>(imagesService.uploadImage(author, description, isAvatar, image), HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
}
