import React, { useState,useContext} from 'react';
import '../Css/loancalculator.css'
import GetLoanImg from '../image/getloan.webp';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoanImg from '../image/loan.png';
import { loginLogoutContext } from "../context/loginlogoutcontext";
import FooterComponent from './Footer';
import { useNavigate } from 'react-router-dom';

const LoanForm = () => {
    const [tabId,setTabId] = useState(1);
    const [userLogin, setUserLogin] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [loanFormDetails,setLoanFormDetails] = useState({});
    const { state } = useContext(loginLogoutContext);
    const history = useNavigate(null);
    const formik = useFormik({
        initialValues: {
            desiredLoanAmount: '',
            annualIncome: '',
            loanPurpose: '',
            loanDuration:'',
            firstName: '',
            lastName: '',
            birthDate: '',
            maritalStatus: '',
            email: '',
            phoneNo: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            companyName: '',
            occupation: '',
            experience: '',
            grossMonthlyIncome: '',
            consent: false,
            agreement: false,
        },
        validationSchema: Yup.object({
            desiredLoanAmount: Yup.number()
                            .min(1, 'Must be greater than 0') 
                            .required('*Desired Loan Amount Required'),
            annualIncome: Yup.number()
                        .min(1, 'Must be greater than 0') 
                        .required('*Annual Income Required'),
            loanPurpose: Yup.string().required('*Loan purposeRequired'),
            loanDuration: Yup.number()
                        .min(1, 'Must be greater than 0') 
                        .required('*Loan Duration Required'),
            firstName: Yup.string()
                    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
                    .required('*First Name Required'),
            lastName: Yup.string()
                    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
                    .required('*Last Name Required'),
            birthDate: Yup.string().required("*Birth Date Required"),
            maritalStatus: Yup.string().required('*Martial Status Required'),
            email: Yup.string()
                .matches(
                    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                    'Invalid email'
                )
                .required('*Email Required'),
            phoneNo: Yup.string()
                    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
                    .required('*Phone Number Required'),
            streetAddress: Yup.string().required('*Street Address Required'),
            city: Yup.string()
                .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
                .required('*City Required'),
            state: Yup.string()
                .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
                .required('*State Required'),
            zipCode: Yup.string()
                    .matches(/^\d{6}$/, 'Zip code must be exactly 6 digits')
                    .required('*ZipCode Required'),
            companyName: Yup.string()
                        .required('*Company Name Required'),
            occupation: Yup.string()
                        .matches(/^[A-Za-z ]+$/, 'Only letters are allowed')
                        .required('*Occupation Required'),
            experience: Yup.string().required('*Experience Required'),
            grossMonthlyIncome: Yup.number()
                                .min(1, 'Must be greater than 0') 
                                .required('*Gross Monthly Income Required'),
            consent: Yup.boolean().oneOf([true], 'You must consent to proceed')
                    .required('*You must consent to proceed'),
            agreement: Yup.boolean().oneOf([true], 'You must agree to the terms')
                    .required('*You must agree to the terms'),
        })
        });
    const handlePrevTabChange = (e)=>{
        e.preventDefault();
        if(tabId > 0){
            setTabId((prevTabId)=>prevTabId - 1);
        }
    }
    const handleNextTabChange = (e)=>{
        e.preventDefault();
        if(tabId < 6){
            setTabId((prevTabId)=>prevTabId + 1);
        }
    }
    const handleChangeValues = (e)=>{
        const{name,value} = e.target;
        if(name === "desiredLoanAmount" || name === "annualIncome" || name === "loanDuration" || name === "phoneNo" || name === "zipCode" || name === "grossMonthlyIncome"){
            setLoanFormDetails({...loanFormDetails,[name]:Number(value)});
        }else{
            setLoanFormDetails({...loanFormDetails,[name]:value});
        }
        formik.handleChange(e);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const userId = state.userDetails.id;
        const data = new FormData();
        for (let key in loanFormDetails){
            data.append(key,loanFormDetails[key]);
        }
        data.append("interestRate",localStorage.getItem('interestRate'));
        data.append("userId",userId);
        axios.post('http://localhost:8009/loanformdetails/addDetails',data,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }) 
        .then(function (response) {
            if(response.data!==""){
                toast.success('Loan Applied!', {
                    position: "top-center",
                    autoClose: 1600,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                    });
                e.target.reset();
                formik.resetForm();
                history("/loanAppliedDetails");
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
            
    }
    return (
        <>
        <div style={{ fontWeight: "700", fontSize: "15px", paddingRight: "40px",width:"100%",height:"50px",backgroundColor:"white",boxShadow:"0 0 2px 2px rgba(0,0,0,0.5)"}}>
            <div style={{display:"flex",gap:"20px",alignItems:"center",marginLeft:"40px"}}>
                <img src={LoanImg} style={{ width: "45px", height: "45px"}} alt="loan" />
                <p style={{fontSize:"25px"}}>Loan Calculator</p>
            </div>
            <div className='flex items-center menuPage' style={{ gap: "10px", position: "absolute", right: "30px", top: "10px" }}>
                <i className="fa fa-user-o" style={{ fontSize: "25px", position: "relative", color: buttonClicked ? 'black' : 'inherit' }} onClick={() => { setUserLogin(true) }}></i>
                {state.loggedIn  && (
                    <div className={`menu_Order_Cart ${userLogin === true ? "scaleAnimStart" : "scaleAnimEnd"}`} style={{ display: `${userLogin === true ? "block" : "none"}`, padding: "10px" }}>
                        <i className='fa fa-close' style={{ position: "absolute", right: "10px" }} onClick={() => { setUserLogin(false) }}></i>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <p style={{ fontWeight: "600", padding: "15px 0" }}>Name : {state.userDetails.userName}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignContent:"center",height:"100vh",width:"100%",backgroundColor:"lightpink"}}>
        <div style={{display:"flex",width:"95%",height:"500px",marginTop:"5%",boxShadow:"0px 0px 5px 2px rgba(0,0,0,0.5)"}}>
            <div style={{backgroundImage:`url(${GetLoanImg})`,backgroundRepeat:"no-repeat",backgroundSize:'100% 95%',backgroundPositionY:"40%",width:"50%",height:"500px",backgroundColor:"white"}}></div>
            <form className="loanAppForm" onSubmit={handleSubmit}>
            <h3 style={{fontSize:"25px",fontWeight:"700",textAlign:"center",margin:"3% 0"}}>LOAN APPLICATION FORM</h3>
            <p style={{textAlign:'center',fontSize:"18px",fontWeight:"600",color:"rgb(214, 52, 152)"}}>Page {tabId}/5</p>
            {tabId === 1 && (
            <div id="1" style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor='desiredLoanAmount'>Desired Loan Amount $</label>
                <input
                    type="text"
                    name="desiredLoanAmount"
                    id='desiredLoanAmount'
                    value={formik.values.desiredLoanAmount}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.desiredLoanAmount && (
                <div className="error">{formik.errors.desiredLoanAmount}</div>
                )}
                <label htmlFor='annualIncome'>Annual Income $</label>
                <input
                    type="text"
                    name="annualIncome"
                    id='annualIncome'
                    value={formik.values.annualIncome}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.annualIncome && (
                <div className="error">{formik.errors.annualIncome}</div>
                )}
            </div>
            )}
            
            {tabId === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor='loanPurpose'>Loan will be used for :</label>
            <select
                name="loanPurpose"
                id='loanPurpose'
                value={formik.values.loanPurpose}
                onChange={handleChangeValues}
                required
                style={{ border: '1px solid lightgrey',borderRadius:"8px",padding:"10px"}}
            >
                <option value="" disabled>Select</option>
                <option value="Mortgage">Mortgage Loan</option>
                <option value="Car">Car Loan</option>
                <option value="Gold">Gold Loan</option>
            </select>
            {formik.errors.loanPurpose && (
                <div className="error">{formik.errors.loanPurpose}</div>
                )}
            <label htmlFor='interestRate'>Interest Rate</label>
            <input
                type="text"
                name="interestRate"
                id='interestRate'
                value={localStorage.getItem('interestRate') || ''}
                onChange={handleChangeValues}
                disabled
                required
            />
            <label htmlFor='loanDuration'>Loan Duration</label>
            <input
                type="text"
                name="loanDuration"
                id='loanDuration'
                value={formik.values.loanDuration}
                onChange={handleChangeValues}
                required
            />
            {formik.errors.loanDuration && (
                <div className="error">{formik.errors.loanDuration}</div>
            )}
            </div>
            )}
            
            {tabId === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h4 style={{marginTop:"5%",fontSize:"20px",fontWeight:"700"}}>Personal INFORMATION</h4>
                <hr style={{border:"1px solid rgb(214, 52, 152)"}}/>
                <label htmlFor='firstName'>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formik.values.firstName}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.firstName && (
                    <div className="error">{formik.errors.firstName}</div>
                )}
                <label htmlFor='lastName'>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formik.values.lastName}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.lastName && (
                <div className="error">{formik.errors.lastName}</div>
                )}
                <label htmlFor='birthDate'>Birth Date</label>
                <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={formik.values.birthDate}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.birthDate && (
                    <div className="error">{formik.errors.birthDate}</div>
                )}
                <label htmlFor='phoneNo'>Phone No</label>
                <input
                    type="tel"
                    name="phoneNo"
                    id="phoneNo"
                    value={formik.values.phoneNo}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.phoneNo && (
                    <div className="error">{formik.errors.phoneNo}</div>
                )}
                <label htmlFor='email'>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                )}
                <label htmlFor='maritalStatus'>Marital Status</label>
                <select
                    name="maritalStatus"
                    value={formik.values.maritalStatus}
                    onChange={handleChangeValues}
                    style={{ border: '1px solid lightgrey',borderRadius:"8px",padding:"10px"}}
                >
                    <option value="" disabled>Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Other">Other</option>
                </select>
                {formik.errors.maritalStatus && (
                <div className="error">{formik.errors.maritalStatus}</div>
                )}
                <label htmlFor='streetAddress'>Street Address</label>
                <input
                    type="text"
                    name="streetAddress"
                    id="streetAddress"
                    value={formik.values.streetAddress}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.streetAddress && (
                    <div className="error">{formik.errors.streetAddress}</div>
                )}
                <label htmlFor='city'>City</label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={formik.values.city}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.city && (
                    <div className="error">{formik.errors.city}</div>
                )}
                <label htmlFor='state'>State</label>
                <input
                    type="text"
                    name="state"
                    id="state"
                    value={formik.values.state}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.state && (
                    <div className="error">{formik.errors.state}</div>
                )}
                <label htmlFor='zipCode'>Zip Code</label>
                <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formik.values.zipCode}
                    onChange={handleChangeValues}
                    required
                />
                {formik.errors.zipCode && (
                <div className="error">{formik.errors.zipCode}</div>
                )}
            </div>
            )}
            
            {tabId === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{marginTop:"5%",fontSize:"20px",fontWeight:"700"}}>EMPLOYMENT INFORMATION</h4>
                    <hr style={{border:"1px solid rgb(214, 52, 152)"}}/>
                    <label htmlFor='companyName'>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formik.values.companyName}
                        onChange={handleChangeValues}
                        required
                    />
                    {formik.errors.companyName && (
                    <div className="error">{formik.errors.companyName}</div>
                    )}
                    <label htmlFor='occupation'>Occupation</label>
                    <input
                        type="text"
                        name="occupation"
                        value={formik.values.occupation}
                        onChange={handleChangeValues}
                    />
                    {formik.errors.occupation && (
                    <div className="error">{formik.errors.occupation}</div>
                    )}
                    <label htmlFor='experience'>Years of experience</label>
                    <select
                        name="experience"
                        value={formik.values.experience}
                        onChange={handleChangeValues}
                        style={{ border: '1px solid lightgrey',borderRadius:"8px",padding:"10px"}}
                    >
                        <option value="" disabled>Select</option>
                        <option value="0-1 Year">0-1 Year</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-4 Years">3-4 Years</option>
                        <option value="5+ Years">5+ Years</option>
                    </select>
                    {formik.errors.experience && (
                    <div className="error">{formik.errors.experience}</div>
                    )}
                    <label htmlFor='grossMonthlyIncome'>Gross monthly income</label>
                    <input
                        type="text"
                        name="grossMonthlyIncome"
                        value={formik.values.grossMonthlyIncome}
                        onChange={handleChangeValues}
                        required
                    />
                    {formik.errors.grossMonthlyIncome && (
                    <div className="error">{formik.errors.grossMonthlyIncome}</div>
                    )}
                </div>
            )} 
            
            {tabId === 5 && (
                <>
                <div>
                <h4 style={{fontSize:"15px",fontWeight:"600",textAlign:"center",marginTop:"2%",textDecoration:"underline"}}>CONSENT</h4>
                    <label style={{fontSize:"15px",fontWeight:"700",textAlign:"center"}}>
                    <span style={{fontSize:"20px"}}> {`>`} </span>I authorize prospective Credit Grantors/Lending/Leasing Companies to
                    obtain personal and credit information about me from my employer and
                    credit bureau, or credit reporting agency, any person who has or may
                    have any financial dealing with me, or from any references I have
                    provided. This information, as well as that provided by me in the
                    application, will be referred to in connection with this lease and any
                    other relationships we may establish from time to time. Any personal
                    and credit information obtained may be disclosed from time to time to
                    other lenders, credit bureaus, or other credit reporting agencies.
                    </label>
                    <label style={{display:"flex",marginRight:"85%",gap:"10px",marginBottom:"20px",fontSize:"20px"}}> 
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formik.values.consent}
                        onChange={handleChangeValues}
                        style={{width:"25px",height:'25px',marginTop:"4px"}}
                        required
                    />
                    YES
                </label>
                {formik.errors.consent && (
                <div className="error">{formik.errors.consent}</div>
                )}
                </div>
                <div>
                    <label style={{fontSize:"15px",fontWeight:"700"}}>
                    <span style={{fontSize:"20px"}}> {`>`} </span>I hereby agree that the information given is true, accurate, and
                        complete as of the date of this application submission.
                    </label>
                    <label style={{display:"flex",marginRight:"85%",gap:"10px",marginBottom:"20px",fontSize:"20px"}}>
                        <input
                        type="checkbox"
                        name="agreement"
                        checked={formik.values.agreement}
                        onChange={handleChangeValues}
                        style={{width:"25px",height:'25px',marginTop:"4px"}}
                        required
                        />
                        YES
                    </label>
                    {formik.errors.agreement && (
                    <div className="error">{formik.errors.agreement}</div>
                    )}
                </div>
                <div>
                <button type="submit" style={{backgroundColor:"black",marginLeft:"35%"}}>Apply Now</button>
                </div>
            </>
            )}
            
            <div style={{display:"flex",justifyContent:"space-between",alignContent:"center",marginTop:"25px"}}>
                {tabId > 1 && (
                    <button onClick={handlePrevTabChange}>Previous</button>
                )}
                {tabId < 5 && (
                    <button onClick={handleNextTabChange}>Next</button>
                )}
            </div>
                
            </form>
        </div>
        </div>
        <FooterComponent/>
        <ToastContainer/>
        </>
      );
};

export default LoanForm;
