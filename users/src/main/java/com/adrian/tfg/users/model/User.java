package com.adrian.tfg.users.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

@Document(collection = "user")
public @Data class User implements Serializable{

	
	private static final long serialVersionUID = 5836858544646579720L;
	
	@Id
	private String id;
	
	private String username;
	
	private String password;
	
	private String name;
	
	private String lastname;
	
	private String email;

}
