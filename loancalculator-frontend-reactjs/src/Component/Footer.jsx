import React from 'react';
import Logo from '../image/loan.png'
import '../Css/loancalculator.css';
const FooterComponent = () => {
  return (
    <div className='footer'>
        <div className='info'>
            <div>
                <h2>Company</h2>
                <ul>
                    <li>About Us</li>
                    <li>Team</li>
                    <li>Careers</li>
                </ul>
            </div>
            <div>
                <h2>Contact</h2>
                <ul>
                    <li>Help & Support</li>
                    <li>Partner with us</li>
                </ul>
            </div>
            <div>
                <h2>Legal</h2>
                <ul>
                    <li>Terms & Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className='social'>
            <div className='flex items-center'>
                <img src={Logo} alt="" style={{width:"40px",height:"40px",marginRight:"20px"}}/>
                <p>Loan Wise Express</p>
            </div>
            <div>
            © 2024
            </div>
            <ul className='flex gap-[40px]'>
                <li><a href="#" class="fa fa-facebook"></a></li>        
                <li><a href="#" class="fa fa-twitter"></a></li>
                <li><a href="#" class="fa fa-instagram"></a></li>
            </ul>
        </div>
    </div>
  )
}

export default FooterComponent;