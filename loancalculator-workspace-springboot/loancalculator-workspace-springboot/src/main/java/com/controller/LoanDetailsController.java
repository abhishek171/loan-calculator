package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.LoanDetails;
import com.request.LoanDetailsRequest;
import com.service.LoanDetailsService;

@RestController
@RequestMapping("/loanformdetails/")
public class LoanDetailsController {

	@Autowired
	LoanDetailsService loanDetailsService;
	
	@CrossOrigin
	@PostMapping("addDetails")
	public String addLoanDetails(@ModelAttribute LoanDetailsRequest loanDetails) {
		return loanDetailsService.addLoanDetails(loanDetails);
	}
	
  	@CrossOrigin
  	@GetMapping("getloanDetails/{userId}")
  	public LoanDetails getLoanDetails(@PathVariable long userId) {
  		return loanDetailsService.getLoanDetails(userId);
  	}
  	
}
