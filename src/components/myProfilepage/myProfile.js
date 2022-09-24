import { useQuery,useMutation, } from '@apollo/client'
import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import pen from "../../images/edit-off.svg"
import { useState } from 'react';
import { GETMYPROFILE_QUERY, GETNAME_QUERY, GET_USERS } from '../../graphql/queries';
import Navbarr from '../navbar/navbar';
import { UPDATEMYPROFILE_MUTATION } from '../../graphql/mutations';
import { useEffect } from 'react';
const MyProfile = () => {
    const [disabled, setDisable] = useState(true)
    const [color, setColor] = useState(true)
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [showModal, setShowModal] = useState(false)
    const {data,loading,error} = useQuery(GETMYPROFILE_QUERY)
    const [updateMyprofile, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATEMYPROFILE_MUTATION)
    const handleSubmit = (e) => {
        e.preventDefault();
        updateMyprofile({
            variables: {
                first_name,
                last_name,
                email,
                phone,
            },
            refetchQueries: [{
                query: GETMYPROFILE_QUERY,
                query: GET_USERS, variables: {page: 1,
                    search: "", },
                query: GETNAME_QUERY,     
            }],
            onCompleted: (error) => {
                console.log(error.message);
            }
        })
    }
    useEffect(() => {
        if (data) {
            setFirst_name(data.getmyprofile.first_name)
            setLast_name(data.getmyprofile.last_name)
            setEmail(data.getmyprofile.email)
            setPhone(data.getmyprofile.phone)
        }
    }, [data])
    return (
        
        <div className="bgpages">
            <Navbarr />
            <div className="container pt-4 pt-lg-0">
                {data && <form className=" p-lg-5 px-lg-3 p-3" onSubmit={handleSubmit}>
                    {data && <Modal isOpen={showModal}>
                        <ModalHeader className=""><div className="">Great!</div></ModalHeader>
                        <ModalBody className="p-5">
                            Your profile has been updated successfully
                        </ModalBody>
                        <ModalFooter>
                            <Link className="btn btn-primary" color="primary" to={"/users"}>
                                All Users
                            </Link>

                        </ModalFooter>
                    </Modal>}
                    <h4 className=""> Home / Users / {data.getmyprofile.first_name} {data.getmyprofile.last_name} </h4>
                    <hr className="" />
                    <div className="shadow border border-2 mt-lg-4 mt-4 rounded-3 ">
                        <div className="form-header border-bottom rounded-3  bgpages p-lg-3 d-flex justify-content-between ">
                            <h4 className="ms-lg-5 ps-lg-2 mt-lg-1 p-3 p-lg-0"> User details</h4>
                        </div>
                        <div className="p-lg-5 p-3 bg-white rounded-bottom">
                            <div className="row">
                                <div className="col-lg-6 px-lg-4 col-12">
                                    <div class="mb-3">
                                        <label class="form-label  ">First name</label>
                                        <input placeholder={data.getmyprofile.first_name} onChange={(e) => setFirst_name(e.target.value)}
                                            value={first_name} class={'form-control' + (disabled ? ' gritext' : ' text-black')} disabled={disabled ? true : false} />
                                    </div>
                                </div>
                                <div className="col-lg-6 px-lg-4 col-12">
                                    <div class="mb-3">
                                        <label class="form-label  ">Last name</label>
                                        <input onChange={(e) => setLast_name(e.target.value)}
                                            value={last_name} class={'form-control' + (disabled ? ' gritext' : ' text-black')}
                                            placeholder={data.getmyprofile.last_name}
                                            disabled={disabled ? true : false} />
                                    </div>
                                </div>
                            </div>
                            <div className="row pb-4">
                                <div className="col-lg-6 px-lg-4 col-12">
                                    <div class="mb-3 ">
                                        <label class="form-label ">Email</label>
                                        <input onChange={(e) => setEmail(e.target.value)}
                                            value={email} type="email" class={'form-control' + (disabled ? ' gritext' : ' text-black')} id="exampleInputEmail1" placeholder={data.getmyprofile.email} disabled={disabled ? true : false} />
                                    </div>
                                </div>
                                <div className="col-lg-6 px-lg-4 col-12">
                                    <div class="mb-3">
                                        <label class=" form-label ">Phone</label>
                                        <input onChange={(e) => setPhone(e.target.value)}
                                            value={phone} class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getmyprofile.phone} disabled={disabled ? true : false} />
                                    </div>
                                </div>
          
                            </div>

                            <div className="row ms-lg-4">
                                <div className=" col-lg-2 col-12 mt-lg-0 mt-3">
                                    <div className={color ? 'fs-5 d-flex w-100' : ' d-none'}>
                                        <div className='col-lg-11 col-6 pe-3'>
                                            <a class='btn-primary bg-white btn fs-5 textcolor w-100 '
                                                onClick={() => {
                                                    setDisable(disabled ? false : true);
                                                    setColor(color ? false : true)
                                                }}><img src={pen}
                                                    className="pen me-1 mb-1" />Edit
                                            </a>
                                        </div>
                                        <div className='col-lg-11 col-6 ps-3'>
                                            <Link to={"/users"} class='btn-primary bg-white btn textcolor fs-5 w-100 ' >
                                                Back
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={'d-flex justify-content-between' + (color ? " d-none" : " ")}>
                                        <div className='col-lg-11 col-6 pe-3'>
                                            <button
                                                class="btn bt-primary bgcolor text-white w-100 fs-5"
                                                onClick={() => setShowModal(true)}>
                                                Save
                                            </button>
                                        </div>
                                        <div className='col-lg-11 col-6 ps-3'>
                                            <a
                                                class="btn-primary bg-white btn textcolor w-100 fs-5"
                                                onClick={() => {
                                                    setDisable(true);
                                                    setColor(true);
                                                    setFirst_name(data.getmyprofile.first_name)
                                                    setLast_name(data.getmyprofile.last_name)
                                                    setEmail(data.getmyprofile.email)
                                                    setPhone(data.getmyprofile.phone)
                                                }}>
                                                Cancel
                                            </a>
                                        </div>


                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </form>}

            </div>
        </div>
    )
}

export default MyProfile
// rfce