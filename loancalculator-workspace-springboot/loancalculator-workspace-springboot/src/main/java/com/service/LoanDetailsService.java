package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.LoanDetails;
import com.repository.LoanDetailsRepository;
import com.request.LoanDetailsRequest;

@Service
public class LoanDetailsService {
	@Autowired
	LoanDetailsRepository loanDetailsRepository;
	
	public String addLoanDetails(LoanDetailsRequest loanDetails) {
		LoanDetails addLoanDetails = new LoanDetails(loanDetails);
		return loanDetailsRepository.save(addLoanDetails) != null ? "Data Inserted Successfully" : null;
	}

	public LoanDetails getLoanDetails(long userId) {
		return loanDetailsRepository.getLoanDetailsById(userId);
	}
}
