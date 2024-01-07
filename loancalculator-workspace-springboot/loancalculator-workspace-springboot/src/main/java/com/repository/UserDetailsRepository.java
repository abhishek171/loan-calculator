package com.repository;

import java.math.BigInteger;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.entity.UserDetails;

public interface UserDetailsRepository extends JpaRepository<UserDetails, Long> {
	@Query(value = "Select * from userdetails where phone_no=:custPhone",nativeQuery = true)
	UserDetails findByPhoneNo(@Param("custPhone") BigInteger custPhone);
}
