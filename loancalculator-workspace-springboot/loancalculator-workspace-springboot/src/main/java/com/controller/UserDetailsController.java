package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.UserDetails;
import com.request.UserDetailsRequest;
import com.service.UserDetailsService;

@RestController
@RequestMapping("/userdetails/")
public class UserDetailsController {
	@Autowired
	UserDetailsService userDetailsService;
	
	@CrossOrigin
	@PostMapping("signup")
	public String addUserDetails(@ModelAttribute UserDetailsRequest userDetails) {
		return userDetailsService.addUserDetails(userDetails);
	}
	
	@CrossOrigin
	@PostMapping("login")
	public UserDetails userLogin(@RequestBody UserDetailsRequest userDetails) {
		return userDetailsService.userLogin(userDetails);
	}
}
