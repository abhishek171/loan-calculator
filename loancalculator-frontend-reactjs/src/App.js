import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoanCalculator from "./Component/LoanCalculator";
import LoanForm from "./Component/LoanForm";
import LoginLogoutContextProvider from "./context/loginlogoutcontext";
import LoanDetailsDisplay from "./Component/LoanDetailsDisplay";
import PageNotFound from "./Component/PageNotFound";
function App() {
  return (
    <LoginLogoutContextProvider>
      <BrowserRouter>
        <Routes>
        <Route path="*" element={<PageNotFound/>} />
          <Route path="/" element={<LoanCalculator/>} />
          <Route path='/applyLoan' element={<LoanForm />} />
          <Route path='/loanAppliedDetails' element={<LoanDetailsDisplay />} />
        </Routes>
      </BrowserRouter>
    </LoginLogoutContextProvider>
  );
}

export default App;
