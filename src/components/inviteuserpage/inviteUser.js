import "./inviteUser.css"
import {Link,useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Navbarr from '../navbar/navbar';
import { INVITEUSER_MUTATION } from "../../graphql/mutations";
import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { GET_USERS } from "../../graphql/queries";
const InviteUserPage = () => {
    let navigate = useNavigate();
    const [first_name,setFirst_name] = useState("")
    const [last_name,setLast_name] = useState("")
    const [email,setEmail] = useState("")
    const [phone,setPhone] = useState("")
    const [role,setRole] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [inviteUser,{data,loading, error}] = useMutation(INVITEUSER_MUTATION)
    const handleSubmit = (e) => {
        e.preventDefault();
        inviteUser({
            variables: {
                email,
                first_name,
                last_name,
                phone,
                role
            }, onCompleted: (error) => {
                console.log(error.message);
                setShowModal(true);
            },
            refetchQueries: [{
                query: GET_USERS, variables: {page: 1,
                    search: "", }
            }],
        })
    }

    return(
        <>
        <Navbarr />
        <div className="bgpages">
                <div className="container "> 
                <form className=" p-lg-5 px-lg-3 p-3" onSubmit={handleSubmit}>
                <Modal isOpen={showModal} >
                        <ModalHeader className=""><div className="">Success!</div></ModalHeader>
                        <ModalBody className="p-5">
                            An invitation email has been sent 
                        </ModalBody>
                        <ModalFooter className=' justify-content-between'>

                            <Button
                                class="btn-primary bg-white btn textcolor fs-5"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>

                            <Button color="primary fs-5" onClick={() => {
                                
                                navigate("/users", { replace: true })
                            }}>
                                Users page
                            </Button>

                        </ModalFooter>
                    </Modal>
                    <h4 className=" mt-3"> Home / Users / Invite new user</h4>
                    <hr className=""/>
                    <div className="shadow border border-2 mt-lg-4 mt-4 rounded-3 ">
                        <div className="form-header border-bottom rounded-3  bgpages p-lg-3 ">
                            <h4 className="ms-lg-5 mt-lg-1 p-3 p-lg-0"> User details</h4>
                        </div>
                        <div className="p-lg-5 p-3 bg-white rounded-bottom">
                            <div className="row">
                                <div className="col-lg-6 pe-lg-4 col-12">
                                    <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label  ">First name<span class="text-danger ms-1">*</span></label>
                                    <input  placeholder="First Name " class="form-control  " value={first_name}
                                                    onChange={(e) =>
                                                        setFirst_name(e.target.value)
                                                    }  required/>                                    
                                </div>
                            </div>
                            <div className="col-lg-6 ps-lg-4 col-12">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label  ">Last name<span class="text-danger ms-1">*</span></label>
                                    <input  class=" form-control " placeholder="Last Name" value={last_name}
                                                    onChange={(e) =>
                                                        setLast_name(e.target.value)
                                                    } required />    
                                </div>
                            </div>
                            </div>
                                <div className="row pb-4">
                                    <div className="col-lg-4 pe-lg-4 col-12">
                                        <div class="mb-3 ">
                                        <label for="exampleInputEmail1" class="form-label ">Email<span class="text-danger ms-1">*</span></label>
                                        <input type="email" class=" form-control   "value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    } id="exampleInputEmail1" placeholder="mail@email.com"  required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 px-lg-3 col-12">
                                        <div class="mb-3">
                                        <label for="exampleInputPassword1" class=" form-label ">Phone<span class="text-danger ms-1">*</span></label>
                                            <input  class="form-control  inputColor " value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    } placeholder="Phone Number" required/>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 ps-lg-4 col-12">
                                        <div class="mb-3 ">
                                        <label for="exampleInputPassword1" class="form-label">User Type<span class="text-danger ms-1">*</span></label>
                                            <select class="form-select form-control gritext" aria-label="Select user type"
                                                    onChange={(e) =>
                                                        setRole(e.target.value)
                                                    }>
                                                <option value="" selected hidden required><span className="">Select user type</span> </option>
                                                <option className=" text-black" value="admin">Administrator</option>
                                                <option className=" text-black" value="Regular">Regular</option>    
                                            </select>
                                        </div>
                                        
                                    </div>
                                </div>
                                {error && inviteUser.error}
                            <div className="row mb-2">
                                <div className="col-lg-2 pe-lg-4 mt-lg-0 mt-3">
                                    <button type="submit" class="btn btn-primary w-100 fs-5 " /* onClick={() => handleModal()} */>Invite</button>
                                </div>
                                <div className="col-lg-2 px-lg-3 mt-lg-0 mt-4">
                                    <a class="btn btn-primary w-100 fs-5 bg-white textcolor" onClick={()=>navigate("/users", { replace: true })}>Cancel</a>
                                </div>
                            </div>
                      
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}
export default InviteUserPage