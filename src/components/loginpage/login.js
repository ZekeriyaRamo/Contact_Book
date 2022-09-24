import "./login.css"
import logoblue from "../../images/logo_blue2.svg"
import { LOGIN_MUTATION } from "../../graphql/mutations"
import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../constants";
const LoginPage = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)
    const [token, setToken] = useState('')
    useEffect(() => {
        if (token) {
            localStorage.setItem('Token', token);
            navigate("/home")
        }
    }, [token]);
    const handle = () => {

        var togglePassword = document.querySelector("#togglePassword");
        var password = document.getElementById('password');
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle("bi-eye");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            variables: {
                email: email,
                password: password
            },
            onCompleted: (data) => {
                console.log(data.Login);
                setToken(data.Login)
            }
        })

    }

    return (
        <div className="row">

            <div className="d-none d-lg-block col-lg-8">
                <div className="image">
                </div>
            </div>
            <div className="col-12 col-lg-4 d-flex justify-content-center mt-5 pb-5 mb-5  pb-lg-5 mb-lg-5">
                <div className="Auth-form-container reg  my-auto d-block">
                    <form className="Auth-form " onSubmit={handleSubmit}>
                        <div className="Auth-form-content">
                            <img src={logoblue} className="logo" alt="logo" />
                            <h3 className="Auth-form-title">Sign In </h3>
                            <div className="">
                                <input
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    type="email"
                                    className="form-control mt-1 form-group py-2"
                                    placeholder="Email" required
                                />
                            </div>
                            <div className=" mt-4">
                                <i class="bi bi-eye-slash mt-2 fs-4" id="togglePassword" onClick={handle}></i>
                                <input type="password" className="form-control form-group py-2"
                                    placeholder="Password" name="password" id="password" value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    } required />

                            </div>

                            {error && <p className="text-danger mt-2" /* isOpen={visible} */>{error.message}</p>}
                            <div className="row mt-4 bold">
                                <div className="col-6 ">
                                    <input type="checkbox" class="form-check-input mx-1" />
                                    <span className="">Remember me</span>
                                </div>
                                <div className="col-6 ">
                                    <p className="forgot-password  text-end">
                                        <Link to='/resetPassword' className="text-dark">Forgot password</Link>
                                    </p>
                                </div>
                            </div>

                            <div className="d-grid gap-2  mt-3">
                                <button type="submit" /* onClick={()=>navigate("/users", { replace: true })} */ className="btn bold btn-primary mt-3 py-2 form-group">
                                    Sign in
                                </button>
                            </div>
                            <div className="hr-text mt-4 fs-6 ">
                                Don't have account?
                            </div>
                            <div className="ms-3 ps-4">
                                {/*/////////////////// try to return token before navigating to users page */}
                                <Link to='/register' className="btn bold ms-5 bg-white btn-dark d-block py-2 color mt-4">
                                    Sign up
                                </Link>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>



    )


}

export default LoginPage