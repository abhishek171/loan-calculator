import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [data, setData] = useState({
    labels: ['Loan Amount', 'Total Interest', 'Total Payable Amount'],
    datasets: [
      {
        data: [loanAmount, totalInterest,totalPayableAmount],
        backgroundColor: ['#36A2EB', '#FFCE56','#FF6384'],
        borderColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)','rgba(255, 99, 132, 0.8)'],
        borderWidth: 1,
      },
    ],
  });
  const handleChange = (event, newValue) => {
    event.preventDefault();

    if (typeof newValue === 'number') {
      setLoanAmount(newValue);
    }
  };

  const calculateMortgage = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPaymentValue =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    const totalInterestValue = monthlyPaymentValue * numberOfPayments - loanAmount;
    const totalPayableAmountValue = loanAmount + totalInterestValue;

    setMonthlyPayment(Math.ceil(monthlyPaymentValue));
    setTotalInterest(Math.ceil(totalInterestValue));
    setTotalPayableAmount(Math.ceil(totalPayableAmountValue));

    setData({
      labels: ['Loan Amount', 'Total Interest', 'Total Payable Amount'],
      datasets: [
        {
          data: [loanAmount, totalInterestValue,totalPayableAmountValue],
          backgroundColor: ['#36A2EB', '#FFCE56','#FF6384'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)','rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    });
  };

  const valueLabelFormat = (value) => {
    return `Rs.${value}`;
  };

  return (
    <div style={{display:"flex",justifyContent:"space-between",alignContent:"center",padding:"4% 10%"}}>
      <Box sx={{ width: "250" }}>
        <Typography variant="h6" gutterBottom>
          Mortgage Calculator
        </Typography>
        <br/>
        <Typography sx={{ display: 'flex', alignItems: 'center', gap: '81px', width: '120%'}} id="loan-amount" gutterBottom>
          Loan Amount <div style={{ border: '1px solid lightgrey', padding: '5px',marginLeft:"15%"}}>Rs. {loanAmount}</div>
        </Typography>
        <Slider
          sx={{ width: '120%' }}
          value={loanAmount}
          min={100000}
          step={100000}
          max={100000000}
          defaultValue={100000}
          valueLabelFormat={valueLabelFormat}
          onChange={(event, newValue) => {
            handleChange(event, newValue);
           calculateMortgage();
          }}
          valueLabelDisplay="auto"
        />
        <Typography id="interest-rate" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: '150px',width: '120%' }}>
          Interest Rate <div style={{ border: '1px solid lightgrey', padding: '3px',marginLeft:"17%"}}>{interestRate} %</div>
        </Typography>
        <Slider
          sx={{ width: '120%' }}
          value={interestRate}
          min={1}
          step={0.1}
          max={10}
          defaultValue={1}
          onChange={(e, newValue) => {
            setInterestRate(newValue);
            calculateMortgage();
          }}
          valueLabelDisplay="auto"
        />
        <Typography id="loan-term" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: '150px',width: '120%' }}>
          Loan Term <div style={{ border: '1px solid lightgrey', padding: '3px',marginLeft:"15%"}}>{loanTerm} years</div>
        </Typography>
        <Slider
          sx={{ width: '120%' }}
          value={loanTerm}
          min={5}
          step={1}
          max={30}
          defaultValue={1}
          onChange={(event, newValue) => {
            setLoanTerm(newValue);
           calculateMortgage();
          }}
          valueLabelDisplay="auto"
        />
        <Typography id="monthly-payment" gutterBottom sx={{ width: '120%',fontWeight:"700"}}>
          Monthly Payment: Rs.{monthlyPayment}
        </Typography>
        <Typography id="total-payable-amount" gutterBottom sx={{ width: '120%' ,fontWeight:"700"}}>
          Total Payable Amount: Rs.{totalPayableAmount}
        </Typography>
      </Box>
      <div style={{width:"40%",height:"350px"}}>
      <Doughnut data={data}/>
    </div>
    </div>
  );
};

export default MortgageCalculator;
