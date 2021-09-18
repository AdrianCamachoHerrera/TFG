package com.adrian.tfg.users.dto;

import lombok.Data;

public @Data class PasswordChangeDTO {
	
	private String userid;
	
	private String oldpassword;
	
	private String password;
}
