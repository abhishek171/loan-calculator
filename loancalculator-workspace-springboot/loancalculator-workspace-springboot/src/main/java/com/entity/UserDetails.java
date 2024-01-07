package com.entity;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.request.UserDetailsRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "userdetails")
public class UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;
	
	@Column(name = "user_name")
	private String userName;
	
	@JsonIgnore
	@Column(name = "user_password")
	private String userPassword;
	
	@Column(name = "phone_no")
	private BigInteger userPhone;
	
	@Column(name = "street")
	private String street;
	
	@Column(name = "area")
	private String area;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "pincode")
	private int pincode;

	public UserDetails() {
		super();
	}

	public UserDetails(UserDetailsRequest userDetailsRequest) {
		this.userName = userDetailsRequest.getCustName();
		this.userPassword = userDetailsRequest.getCustPassword();
		this.userPhone = userDetailsRequest.getCustPhone();
		this.street = userDetailsRequest.getStreet();
		this.area = userDetailsRequest.getArea();
		this.city = userDetailsRequest.getCity();
		this.pincode = userDetailsRequest.getPincode();
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public BigInteger getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(BigInteger userPhone) {
		this.userPhone = userPhone;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	@Override
	public String toString() {
		return "UserDetails [id=" + id + ", userName=" + userName +  ", userPhone="
				+ userPhone + ", street=" + street + ", area=" + area + ", city=" + city + ", pincode=" + pincode + "]";
	}
	
}
