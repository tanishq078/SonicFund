import Dashboard from "./pages/dashboard";
import Transactions from "./pages/Transactions"; // ✅ Make sure this exists
import Pay from "./pages/Pay";
import Account from "./pages/Account";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import OtpVerification from "./pages/OtpVerification";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transfer from "./pages/transfer";
import Firstpage from "./pages/firstpage";
import Complete from "./pages/complete";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Firstpage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/signin" element={<Signin />} ></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/account" element={<Account />} />
          <Route path="/transfer" element={<Transfer />}></Route>
          <Route path="/success" element={<Complete />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
