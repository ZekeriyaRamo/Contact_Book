import "./resetpassword.css";
import logoblue from "../../images/logo_blue2.svg"
import {Link} from "react-router-dom";
import { useMutation } from "@apollo/client";
import {React, useState } from 'react';
import { SENDMAILPASSWORD_MUTATION } from "../../graphql/mutations"

const ResetPasswordPage = () => {

    
    /* this hook will close hide the message when user click the send button again */
    /* const [visible, setHidden] = useState(false); */

    const [email, setEmail] = useState("")
    const [sendmailpassword, {data, loading, error}] = useMutation(SENDMAILPASSWORD_MUTATION);
    const handleSubmit = (e) => {
        e.preventDefault();
        sendmailpassword({
            variables: {
                email: email,
            },
            onCompleted: (data) => {
                
            } 
        }
        )
    }

    return (

        <div className="row ">
            <div className="col-lg-8 d-lg-block d-none">
                <div className="image">
                </div>
            </div>
            <div className="col-lg-4 reg d-flex align-items-center justify-content-center">
            
                <form className="col-lg-6  col-10 form"onSubmit={handleSubmit}><div className="d-lg-none mb-4 text-center" >
                
                    <img src={logoblue} className="" alt="logo" /></div> 
                    <h3 className="Auth-form-title d-lg-block">Change Password</h3>
                    <div class="">
                        <input type="email" className="form-control form-group py-2"
                        placeholder="Enter your email address" value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        } />

                        {/*////////////////////// validation Alerts///////////////////////// */}
                        {data && <p className="text-success mt-2" /* isOpen={visible} */>Mail has been sent</p>}
                        {error && <p className="text-danger mt-2" /* isOpen={visible} */>{error.message}</p>}



                    </div>
                    <div className=" "> 
                        <button type="submit" /* onClick={() => setHidden(true)} */ className="btn bold w-100 btn-primary d-block py-2 mt-4">
                                    Send
                        </button>
                        
                        <div className="d-flex justify-content-center mt-5">
                            <Link to='/' className="color  bold">
                                    Back to login
                            </Link>
                        </div>

                    </div>
                </form> 
                             
            </div>
        </div>

    )

}    

export default ResetPasswordPage