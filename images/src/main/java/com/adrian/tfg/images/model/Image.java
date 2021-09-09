package com.adrian.tfg.images.model;

import java.io.Serializable;
import java.util.Date;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "image")
public @Data class Image implements Serializable {

	private static final long serialVersionUID = 4485210440454233803L;

	@Id
	private String id;
	
	private Binary image;
	
	private String author;
	
	private String description;
	
	private long rateSum;
	
	private long rateCount;
	
	private boolean isAvatar;
	
	private Date date;

}
