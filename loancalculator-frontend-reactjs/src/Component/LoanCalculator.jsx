import React, { useState, useContext } from "react";
import MortgageCalculator from './MortgageCalculator';
import CarLoanCalculator from './CarLoanCalculator';
import GoldLoanCalculator from './GoldLoanCalculator';
import UserLoginSignup from "./UserLoginSignup";
import LoanImg from '../image/loan.png';
import HomeLoanImg from '../image/homeloan.png';
import CarLoanImg from '../image/carloan.png';
import GoldLoanImg from '../image/goldloan.png';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { loginLogoutContext } from "../context/loginlogoutcontext";
import { useNavigate } from "react-router-dom";
import FooterComponent from "./Footer";
import { ToastContainer, toast } from 'react-toastify';
import { replace } from "formik";
const LoanCalculator = () => {
  const [value, setValue] = useState('1');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const { state, dispatch } = useContext(loginLogoutContext);
  const history = useNavigate(null);
  const handleChange = (event,newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  const toggle = (value) => {
    if (value === "login") {
      setButtonClicked("login");
    } else if (value === "signup") {
      setButtonClicked("signup");
    } else {
      setButtonClicked(value);
    }
  };
  const toastError = ()=>{
    toast.error("Login First", {
      position: "top-center",
      autoClose: 1600,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      });
  }
  const setData = (e,value)=>{
    e.preventDefault();
    localStorage.setItem("interestRate",value);
  }
  const handleClick = (e,data)=>{
    if(state.loggedIn){
      setData(e,data);
      history('/applyLoan');
    }else{
      history('/');
      toastError();
    }
  }
  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1'}}>
          <TabContext value={value.toString()} sx={{ display: "flex", alignItems: "center" ,position:"relative"}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                  <TabList onChange={handleChange} sx={{ "& button": { fontWeight: "700", fontSize: "15px", paddingRight: "40px" }, "& button.Mui-selected": { backgroundColor: "lightblue", color: "white" } }} centered>
                      <img src={LoanImg} style={{ width: "45px", height: "45px", position: "absolute", left: "30px", top: "8px" }} alt="loan" />
                      <Tab value="1" label={<div style={{ display: "flex", alignItems: "center", gap: "8px" }}><img src={HomeLoanImg} style={{ width: "40px", height: "40px" }} alt="home" />Mortgage Calculator</div>} />
                      <Tab value="2" label={<div style={{ display: "flex", alignItems: "center", gap: "8px" }}><img src={CarLoanImg} style={{ width: "40px", height: "40px" }} alt="car" />Car Loan Calculator</div>} />
                      <Tab value="3" label={<div style={{ display: "flex", alignItems: "center", gap: "8px" }}><img src={GoldLoanImg} style={{ width: "60px", height: "40px" }} alt="gold" />Gold Loan Calculator</div>} />
                      <div className='flex items-center menuPage' style={{ gap: "10px", position: "absolute", right: "30px", top: "15px" }}>
                          <i className="fa fa-user-o" style={{ fontSize: "25px", position: "relative", color: buttonClicked ? 'black' : 'inherit' }} onClick={() => { setUserLogin(true) }}></i>
                          {state.loggedIn ? (
                          <div className={`menu_Order_Cart ${userLogin === true ? "scaleAnimStart" : "scaleAnimEnd"}`} style={{ display: `${userLogin === true ? "block" : "none"}`, padding: "10px"}}>
                              <i className='fa fa-close' style={{ position: "absolute", right: "10px" }} onClick={() => { setUserLogin(false) }}></i>
                              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                              <p style={{ fontWeight: "600", padding: "15px 0" }}>Name : {state.userDetails.userName}</p>
                              <hr />
                              <button style={{ backgroundColor: "black", color: "white", fontSize: "18px", fontWeight: "700", padding: "10px 18px" }} onClick={() => { dispatch({ type: "logout" }) }}>Logout</button>
                              </div>
                          </div>
                          ) : (
                          <button style={{ color: buttonClicked === "signup" ? 'rgb(218, 21, 21)' : 'inherit', width: '70px', height: '40px', fontWeight: "500", fontSize: "25px" }} onClick={() => { toggle("login") }}>
                             Login
                          </button>
                          )}
                      </div>
                  </TabList>
              </Box>
              <TabPanel value="1">{<MortgageCalculator />}</TabPanel>
              <TabPanel value="2">{<CarLoanCalculator />}</TabPanel>
              <TabPanel value="3">{<GoldLoanCalculator />}</TabPanel>
          </TabContext>
      </Box>
      <div style={{textAlign:"center",fontSize:"25px",fontWeight:"700",marginBottom:"4%"}}>Apply For Loan At Low Interest Rate</div>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px",marginBottom:"5%"}}>
          
          <Card sx={{ width: '15%' }}>
            <CardContent>
                <Typography color="text.secondary" gutterBottom>
                HDFC Bank
                </Typography>
                <Typography sx={{ mb: 1.5 , fontWeight: 700}} color="text.black">
                Interest Rate : 4.5%
                </Typography>
                <button style={{ padding: "10px 24px", backgroundColor: "black", color: "white", borderRadius: "5px", marginLeft: "20%" }} onClick={(e)=>{handleClick(e,4.5)}}>Apply</button>
            </CardContent>
          </Card>
          <Card sx={{ width: '15%' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Muthoot Finance
                </Typography>
                <Typography sx={{ mb: 1.5 , fontWeight: 700}} color="text.black">
                Interest Rate : 4.2%
                </Typography>
                <button style={{ padding: "10px 24px", backgroundColor: "black", color: "white", borderRadius: "5px", marginLeft: "20%" }} onClick={(e)=>{handleClick(e,4.2)}}>Apply</button>
            </CardContent>
          </Card>
          <Card sx={{ width: '15%' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                ICIC Bank
                </Typography>
                <Typography sx={{ mb: 1.5, fontWeight: 700}} color="text.black">
                Interest Rate : 3.8%
                </Typography>
                <button style={{ padding: "10px 24px", backgroundColor: "black", color: "white", borderRadius: "5px", marginLeft: "20%" }} onClick={(e)=>{handleClick(e,3.8)}}>Apply</button>
            </CardContent>
          </Card>
      </div>
      <FooterComponent/>
    <ToastContainer/>
    {buttonClicked && (
      <UserLoginSignup value={buttonClicked} toggle={toggle} setButtonClicked={setButtonClicked} />
    )}
  </>
  )
}

export default LoanCalculator