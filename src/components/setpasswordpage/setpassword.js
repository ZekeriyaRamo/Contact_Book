import "./setpassword.css"
import React, { useState } from 'react';
import logoblue from "../../images/logo_blue2.svg"
import { useMutation } from "@apollo/client";
import { SETPASSWORD_MUTATION } from "../../graphql/mutations"
import { useParams  } from "react-router-dom"
import {useNavigate} from "react-router-dom";
const SetPasswordPage = () => {
  let navigate = useNavigate();

  const [password, setPasswordd] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [setPassword, {data, loading, error}] = useMutation(SETPASSWORD_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword({
        variables: {
          password: password,
          confirmpassword: confirmpassword,
        },
        onCompleted: (data) => {
            
            navigate("/", { replace: true });
            localStorage.removeItem("Token");
        } 
    }
    )
}  
const handle = () => {

  var togglePassword = document.querySelector("#togglePassword");
  var password = document.getElementById('password');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  togglePassword.classList.toggle("bi-eye");
}
const handle2= () => {

  var toggleePassword = document.querySelector("#toggleePassword");
  var confirmpassword = document.getElementById('confirmpassword');
  const type = confirmpassword.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmpassword.setAttribute('type', type);
  toggleePassword.classList.toggle("bi-eye");
}

let { token } = useParams();
localStorage.setItem("Token",token);
  return (

    <div className="row ">
        <div className="col-lg-8 d-lg-block d-none">
            <div className="image">
            </div>
        </div>
        <div className="col-lg-4  d-flex align-items-center justify-content-center reg">
        
            <form className="col-lg-6 col-10 form"onSubmit={handleSubmit}><div className="d-lg-none mb-4 text-center" >
            
                <img src={logoblue} className="" alt="logo" /></div> 
                <h3 className="Auth-form-title d-lg-block">Set a Password</h3>
                <div className=" mt-4">
                                <i class="bi bi-eye-slash mt-1 fs-4" id="togglePassword" onClick={handle}></i>
                                <input type="password" className="form-control form-group py-2"
                                    placeholder="Password" name="password" id="password" value={password}
                                    onChange={(e) =>
                                      setPasswordd(e.target.value)
                                    } />

                </div>
                <div className=" mt-4">
                                <i class="bi bi-eye-slash mt-1 fs-4" id="toggleePassword" onClick={handle2}></i>
                                <input type="password" className="form-control form-group py-2"
                                    placeholder="Confirm password" name="password" id="confirmpassword" value={confirmpassword}
                                    onChange={(e) =>
                                      setConfirmpassword(e.target.value)
                                    } />
                </div>
                <div className=""> 
                    <button type="submit" /* onClick={() => setHidden(true)} */ className="btn bold w-100 btn-primary d-block py-2 mt-5">
                                Reset Password
                    </button>


                </div>
            </form> 
                         
        </div>
    </div>

)
}    

export default SetPasswordPage