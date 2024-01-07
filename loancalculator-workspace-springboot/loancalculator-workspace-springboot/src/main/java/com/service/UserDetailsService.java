package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.entity.UserDetails;
import com.repository.UserDetailsRepository;
import com.request.UserDetailsRequest;

@Service

public class UserDetailsService {
	@Autowired
	UserDetailsRepository userDetailsRepository;
	
	public String addUserDetails(UserDetailsRequest userDetails) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(userDetails.getCustPassword());
		userDetails.setCustPassword(encodedPassword);
		UserDetails addUser = new UserDetails(userDetails);
		return userDetailsRepository.save(addUser) != null ? "Data Added Successfully" : null; 
	}

	public UserDetails userLogin(UserDetailsRequest userDetails) {
		UserDetails userInfo = userDetailsRepository.findByPhoneNo(userDetails.getCustPhone());
		if(userInfo!=null) {
			BCryptPasswordEncoder passwordMatcher = new BCryptPasswordEncoder();
			return passwordMatcher.matches(userDetails.getCustPassword(), userInfo.getUserPassword()) ? userInfo : null;
		}
		return null;
	}
}
