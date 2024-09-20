import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/Login";
import { Customers, CustomerPage } from "./pages/Customer";
import Deposit from "./pages/Deposit";
import Navbar from "./components/Navbar";
import { Accounts, AccountPage } from "./pages/Accounts";
import { SeePortfolio, Portfolio } from "./pages/Portfolio";
import { SeeBalance } from "./pages/Balance";

function App() {
  return (
    <div className="App">
      <section className="background">
        <div>
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/accounts" element={<AccountPage />} />
            <Route path="/balance" element={<SeeBalance />} />
            <Route path="/portfolio" element={<SeePortfolio />} />
          </Routes>
        </div>
      </section>
    </div>
  );
}

export default App;
