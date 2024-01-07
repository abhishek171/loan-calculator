import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import LoanImg from '../image/loan.png';
import 'react-toastify/dist/ReactToastify.css';
import { loginLogoutContext } from "../context/loginlogoutcontext";
import { Slide } from 'react-awesome-reveal';
import FooterComponent from './Footer';

const LoanDetailsDisplay = () => {
  const [loanFormData,setLoanFormData] = useState({});
  const [monthlyPayment,setMonthlyPayment] = useState(0);
  const [totalPayableAmount,setTotalPayableAmount] = useState(0);
  const [userLogin,setUserLogin] = useState(false);
  const { state,dispatch } = useContext(loginLogoutContext);
  const userId = Number(state.userDetails.id);
  console.log(loanFormData);
  
  useEffect(()=>{
    axios.get(`http://localhost:8009/loanformdetails/getloanDetails/${userId}`) 
    .then(function (response) {
        if(response.data!==""){
            setLoanFormData(response.data);
            const monthlyRate = loanFormData.interestRate / 100 / 12;
            const numberOfPayments = loanFormData.loanDuration * 12;
            const monthlyPaymentValue =
            (loanFormData.desiredLoanAmount * monthlyRate) /
            (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
            setMonthlyPayment(Math.ceil(monthlyPaymentValue));
            const totalInterestValue = monthlyPaymentValue * numberOfPayments - loanFormData.desiredLoanAmount;
            const totalPayableAmountValue = loanFormData.desiredLoanAmount + totalInterestValue;
            setTotalPayableAmount(Math.ceil(totalPayableAmountValue));
            }
        })
      .catch(function (error) {
        toast.error({error}, {
            position: "top-center",
            autoClose: 1600,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
            });
      }); 
        

  },[])
  return (
    <>
        <div style={{ fontWeight: "700", fontSize: "15px", paddingRight: "40px",width:"100%",height:"50px",backgroundColor:"white",boxShadow:"0 0 2px 1px rgba(0,0,0,0.5)",zIndex:"1"}}>
            <div style={{display:"flex",gap:"20px",alignItems:"center",marginLeft:"40px"}}>
                <img src={LoanImg} style={{ width: "45px", height: "45px",cursor:"pointer"}} alt="loan" />
                <p style={{fontSize:"25px"}}>Loan Calculator</p>
            </div>
            <div className='flex items-center menuPage' style={{ gap: "10px", position: "absolute", right: "30px", top: "10px" }}>
                <i className="fa fa-user-o" style={{ fontSize: "25px", position: "relative", color: "black" }} onClick={() => { setUserLogin(true) }}></i>
                {state.loggedIn  && (
                    <div className={`menu_Order_Cart ${userLogin === true ? "scaleAnimStart" : "scaleAnimEnd"}`} style={{ display: `${userLogin === true ? "block" : "none"}`, padding: "10px" }}>
                        <i className='fa fa-close' style={{ position: "absolute", right: "10px" }} onClick={() => { setUserLogin(false) }}></i>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ fontWeight: "600", padding: "15px 0" }}>Name : {state.userDetails.userName}</p>
                            <hr />
                            <button style={{ backgroundColor: "black", color: "white", fontSize: "18px", fontWeight: "700", padding: "10px 18px" }} onClick={() => { dispatch({ type: "logout" }) }}>Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Slide direction='down'>
        <div style={{display:"flex",flexDirection:"column",padding:"3% 8%",marginLeft:"32%",marginTop:"3%",marginBottom:"5%",gap:"20px",fontSize:"20px",fontWeight:"600",border:"1px solid lightgrey",width:"40%",borderRadius:"8px",boxShadow:"0 0 2px 2px rgba(0,0,0,0.5)",zIndex:"-1"}}>
            <div style={{display:"flex",alignItems:"center",marginLeft:"5px"}}>
                <img src={LoanImg} alt="loanimg" style={{width:"60px",height:"60px"}}/>
                <p style={{paddingLeft:"10px"}}>Loan Wise Express</p>
            </div>
            <div style={{padding:"5px 10%",textDecoration:"underline"}}>
                Loan Application Details
            </div>
            <div>
                <p>UserName : {loanFormData.firstName +" "+loanFormData.lastName}</p>
            </div>
            <hr/>
            <div>
                <p>Loan Amount : {loanFormData.desiredLoanAmount}</p>
            </div>
            <hr/>
            <div>
                <p>Interest Rate : {loanFormData.interestRate}</p>
            </div>
            <hr/>
            <div>
                <p>Loan Duration : {loanFormData.loanDuration}</p>
            </div>
            <hr/>
            <div>
                <p>Loan Purpose : {loanFormData.loanPurpose}</p>
            </div>
            <hr/>
            <div>
                <p>Monthly Payment Amount : Rs. {monthlyPayment}</p>
            </div>
            <hr/>
            <div>
                <p>Total Payable Amount : Rs. {totalPayableAmount}</p>
            </div>
            
        </div>
        </Slide>
        <FooterComponent/>
    </>
  )
}

export default LoanDetailsDisplay