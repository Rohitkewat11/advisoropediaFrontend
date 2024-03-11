import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import "./login.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";


export function Login({visible,onclose}) {

  const [verified,setVerified] = useState(false);
  const navigate = useNavigate();
  const [active,setActive] = useState(true);

  // function for verifying google Recaptcha //
  function handleRecaptcha(value) {
    setVerified(true);
  }
  
  function handleClose(){
    onclose();
  }
  
  function handleEyeBtn(){
    setActive(current=>!current);
  }

  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    onSubmit:(async(data)=>{
      await axios.post('https://advisoropediabackend.onrender.com/login',data)
      .then(res=>{
      localStorage.setItem("token",res.data);
      navigate("dashboard");
      })
  }) 
})

  if(!visible) return null;
  return (
    <>
      <div id="loginbox" className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
  
        <div id="formBox">
          <div>
            <button id="closeBtn" onClick={handleClose} className="bi bi-x-circle"></button>
          </div>
            <div>
                <h3 className="p-1 text-white">Login</h3>
            </div>
            <div className="p-3">
            <form onSubmit={formik.handleSubmit}>
                <label className="form-label fw-semibold text-white">E-mail</label>
                <input className="form-control" onChange={formik.handleChange} name="email" type="email" placeholder="E-mail" required/>
                <label className="form-label fw-semibold text-white">Password</label>
                <div className="password-container">
                <input className="form-control" onChange={formik.handleChange} name="password" type={active?"password":"text"} placeholder="password" required/>
                <i className={active?"bi bi-eye":"bi bi-eye-slash"} onClick={handleEyeBtn}></i>
                </div>
                <div className="mt-4">
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={handleRecaptcha}
                 />
                </div>
                <button type="submit" id="submitBtn" disabled={!verified} className="btn form-control fw-bold mt-3 text-white">Submit</button>
          </form>
            <div className="mt-2 fw-semibold">
            <p className="text-white">Haven't Account?<Link to="" className="text-decoration-none">&nbsp;Signup</Link></p>
            </div>
            </div>          
        </div>
      </div>
    </>
  );
}
