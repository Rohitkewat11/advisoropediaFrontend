import { useState,useEffect } from "react";
import { Login } from "../login/login";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../register/register";

export function Home() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [active,setActive] = useState(true);

  let nevigate = useNavigate();

  const handleOnCloseLogin = () => setShowModalLogin(false);
  const handleOnCloseRegister = () => setShowModalRegister(false);

  function handleMenuClick() {
    setActive(current => !current);
  }

  useEffect(()=>{
    const retriveToken = localStorage.getItem('token');
    if(retriveToken==null){
      nevigate("/");
    }else{
      nevigate("/dashboard");
    }
    // const data = parseJwt(retriveToken);
    // console.log(data.isUser);
    // setUser(data.isUser);
  },[])

  return (
    <>
      <div id="box">
        <div id="login-container">
          <Login onclose={handleOnCloseLogin} visible={showModalLogin} />
        </div>
        <div id="register-container">
          <Register
            onclose={handleOnCloseRegister}
            visible={showModalRegister}
          />
        </div>
        <header>
          <div>
            <p id="brand-name" className="fw-bold">
              The Green Chilli
            </p>
            <img
              id="chilli"
              src="./chilli.png"
              alt=""
              height={50}
              width={150}
            />
          </div>
          <div className={active?"navBar":"navBarShow"}>
            <div id="navbar-box">
              <div>
                <Link to="/" className="navMenu">
                  HOME
                </Link>
              </div>
              <div>
                <Link className="navMenu">ABOUT</Link>
              </div>
              <div>
                <Link className="navMenu">CONTECT</Link>
              </div>
            <div className="fw-bold text-white" id="login">
              <span className="bi bi-person">
                &nbsp;
                <Link
                  to=""
                  onClick={() => {
                    setShowModalLogin(true);
                  }}
                  className="text-decoration-none text-white"
                  >
                  Login
                </Link>
                /
              </span>
              <span>
                <Link
                  to="/"
                  onClick={() => {
                    setShowModalRegister(true);
                  }}
                  className="text-decoration-none text-white"
                  >
                  Signup
                </Link>
              </span>
            </div>
          </div>
                  </div>
          <span className="bi bi-list btn" onClick={handleMenuClick}></span>
        </header>
        <div id="main">
          <div>
            <p id="title">
              Fellings Hungry? <br /> Order Now...
            </p>
            <Link
              to=""
              onClick={() => {
                setShowModalLogin(true);
              }}
            >
              <button className="btn" id="orderBtn">
                Order
              </button>
            </Link>
            <p id="sub-title">
              People who love to eat are alwayes <br />
              the best people.
            </p>
          </div>
          <div>
            <img src="./food-img.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
