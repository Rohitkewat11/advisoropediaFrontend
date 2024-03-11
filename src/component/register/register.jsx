import { Link } from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import { useState } from "react";
// import "./login.css";
export function Register({visible,onclose}) {

  const [active,setActive] = useState(true);
  const [error,setError] = useState();
  
  function handleClose(){
    onclose();
  }
  
  function handleEyeBtn(){
    setActive(current=>!current);
  }

  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      cnfPassword:"",
      mobile:""
    },
    onSubmit:(async(data)=>{
      if(data.password !== data.cnfPassword){
        setError("password not matched");
        return;
      }
      console.log(data);
      await axios.post('https://advisoropediabackend.onrender.com/adduser',data);
      alert("User Added");
    })
  })
  
  if(!visible) return null;

  return (
    <>
      <div id="loginbox"
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div id="formBox">
        <div>
            <button id="closeBtn" onClick={handleClose} className="bi bi-x-circle"></button>
          </div>
          <div>
            <h3 className="p-1 text-white">Signup</h3>
          </div>
          <div className="p-3">
            <form onSubmit={formik.handleSubmit}>
              <label className="form-label fw-semibold text-white">Full Name</label>
              <input className="form-control" onChange={formik.handleChange} name="name" type="text" required  placeholder="Name"/>
              <label className="form-label fw-semibold text-white">E-mail</label>
              <input className="form-control" onChange={formik.handleChange} name="email" type="email" required placeholder="Email"/>
              <label className="form-label fw-semibold text-white">Password</label>
              <div className="password-container">
                <input className="form-control" onChange={formik.handleChange} name="password" type={active?"password":"text"} required placeholder="password"/>
                <i className={active?"bi bi-eye":"bi bi-eye-slash"} onClick={handleEyeBtn}></i>
              </div>
              <label className="form-label fw-semibold text-white">Confirm Password</label>
              <div className="password-container">
                <input className="form-control" onChange={formik.handleChange} name="cnfPassword" type={active?"password":"text"} required placeholder="confirm password" />
                <i className={active?"bi bi-eye":"bi bi-eye-slash"} onClick={handleEyeBtn}></i>
              </div>
              <div>
              <span className="text-danger">{error}</span>
              </div>
              <label className="form-label fw-semibold text-white">Mobile</label>
              <input className="form-control" onChange={formik.handleChange} name="mobile" type="text" required placeholder="mobile"/>
             <div>

             <input type="checkbox" required /><span className="text-white"> I accept Terms and condition.</span>
             </div>
              <button
                type="submit"
                id="submitBtn"
                className="btn form-control fw-bold mt-3 text-white"
              >
                Submit
              </button>
            </form>
            <div className="mt-2 fw-semibold text-white">
              <p>
                Have Account?
                <Link to="" className="text-decoration-none">&nbsp;Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
