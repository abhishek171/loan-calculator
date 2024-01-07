package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.LoanDetails;

public interface LoanDetailsRepository extends JpaRepository<LoanDetails, Long> {

	@Query(value = "Select * from loanformdetails where user_id=:userId",nativeQuery = true)
	LoanDetails getLoanDetailsById(@Param("userId")long userId);
}
