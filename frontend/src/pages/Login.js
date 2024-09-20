import LoginSignup from "../components/LoginSignup";
import Card from "../components/card";
import First from "../components/firstPage";
import { Link } from "react-router-dom";
import "../components/index.css";

// const First = () => {
//   return(
//       <>
//       <h1>Welcome to BIG BANK CLUB</h1>
//       <h2>What do you want to do?</h2>
//       <h3><a href="#">See my balance</a></h3>
//       <h3><a href="#">Deposit money</a></h3>
//       <h3><a href="#">Withdraw money</a></h3>
//       <h3><a href="#">See my account</a></h3>
//       </>
//   )
// }

/* function Login(){
  return(
    <div className='Login'>
      <First></First>
    </div>
  )
}
export default Login */

function Login() {
  return (
    <>
      <div className="mainFirstPage">
        <div className="firstPage">
          <h1>
            Welcome To <br />
            Big Bank Club
          </h1>

          <p>
            Let us help make your life a little easier, join our services and
            become a part of our incredible journey
          </p>
          <h3>Our services:</h3>
        </div>
        <div className="homeLinks">
          <Link to="/customers">🔎 See customers</Link>
          <Link to="/accounts">🔒 See accounts</Link>
          <Link to="/balance">💸 Insert/Withdraw money</Link>
          <Link to="/portfolio">💼 See your portfolio</Link>
          <Link to="/balance">💰 See your balance</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
