import { Link, useNavigate, useParams } from "react-router-dom";
import Navbarr from '../navbar/navbar';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import pen from "../../images/edit-off.svg"
import { useMutation, useQuery } from '@apollo/client';
import { GETNAME_QUERY, GETUSERPROFİLE_QUERY, GET_USERS } from '../../graphql/queries'
import { UPDATEUSER_MUTATION } from "../../graphql/mutations";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useEffect } from "react";

const UserProfile = () => {
    let { userId } = useParams();
    let navigate = useNavigate();
    const [switchh, setSwitchh] = useState(false)
    const [disabled, setDisable] = useState(true)
    const [color, setColor] = useState(true)
    const [id, setId] = useState(userId)
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")
    const [showModal, setShowModal] = useState(false)
    const {data:namedata,loading:nameloading,error:nameerror }= useQuery(GETNAME_QUERY)
    const { data, loading, error } = useQuery(GETUSERPROFİLE_QUERY, {
        variables: {
            id,
        }
    })
    const [status, setStatus] = useState("")
    // console.log(status)
    const [updateUser, { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATEUSER_MUTATION)
    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({
            variables: {
                id,
                first_name,
                last_name,
                email,
                phone,
                status,
                role
            },
            refetchQueries: [{
                query: GETUSERPROFİLE_QUERY, variables: { id },
                query: GET_USERS, variables: {
                    page: 1,
                    search: "",
                }
            }],
            onCompleted: (error) => {
                console.log(error.message);
            }
        })
    }

    useEffect(() => {
        if (data) {
            setSwitchh(data.userprofilbyid.status === 'Locked' ? true : false)
            setFirst_name(data.userprofilbyid.first_name)
            setLast_name(data.userprofilbyid.last_name)
            setEmail(data.userprofilbyid.email)
            setPhone(data.userprofilbyid.phone)
            setRole(data.userprofilbyid.role)
            setStatus(data.userprofilbyid.status)
        }
    }, [data])
    return (
        <>
            <Navbarr />
            <div className="bgpages">
                <div className="container ">
                    {data && <form className=" p-lg-5 px-lg-3 p-3 " onSubmit={handleSubmit}>
                        {data && <Modal isOpen={showModal}>
                            <ModalHeader className=""><div className="">Great!</div></ModalHeader>
                            <ModalBody className="p-5">
                                User profile has been updated successfully
                            </ModalBody>
                            <ModalFooter>
                                <Link className="btn btn-primary" color="primary" to={"/users"}>
                                    All Users
                                </Link>

                            </ModalFooter>
                        </Modal>}
                        <h4 className=""> Home / Users / {data.userprofilbyid.first_name} {data.userprofilbyid.last_name} </h4>
                        <hr className="" />
                        <div className="shadow border border-2 mt-lg-4 mt-4 rounded-3 ">
                            <div className="form-header border-bottom rounded-3  bgpages p-lg-3 d-flex justify-content-between ">
                                <h4 className="ms-lg-3 ps-lg-0 mt-lg-1 p-3 p-lg-0"> User details</h4>
                                <div className="d-flex mt-2 pt-1 pt-lg-0 mt-lg-0 ps-2 mt-lg-0" >

                                    <Form.Check
                                        type="switch"
                                        disabled={disabled ? true : false}
                                        label={data.userprofilbyid.status !== 'Pending' ?
                                            (status === 'Active' ? 'Unlocked' : 'Locked') : ' '}
                                        checked={switchh}
                                        id="custom-switch"
                                        className={data.userprofilbyid.status === "Pending" ? 'd-none' : 'fs-4 pe-lg-5 me-lg-5 me-2'}
                                        reverse
                                        onClick={(e) => {
                                            setSwitchh(e.target.checked); setStatus(switchh ? 'Active' : 'Locked')
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="p-lg-5 p-3 bg-white rounded-bottom">
                                <div className="row">
                                    <div className="col-lg-6 px-lg-4 col-12">
                                        <div class="mb-3">
                                            <label class="form-label  ">First name</label>
                                            <input placeholder={data.userprofilbyid.first_name} onChange={(e) => setFirst_name(e.target.value)}
                                                value={first_name} class={'form-control' + (disabled ? ' gritext' : ' text-black')} disabled={disabled ? true : false} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 px-lg-4 col-12">
                                        <div class="mb-3">
                                            <label class="form-label  ">Last name</label>
                                            <input onChange={(e) => setLast_name(e.target.value)}
                                                value={last_name} class={'form-control' + (disabled ? ' gritext' : ' text-black')}
                                                placeholder={data.userprofilbyid.last_name}
                                                disabled={disabled ? true : false} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row pb-4">
                                    <div className="col-lg-4 px-lg-4 col-12">
                                        <div class="mb-3 ">
                                            <label class="form-label ">Email</label>
                                            <input onChange={(e) => setEmail(e.target.value)}
                                                value={email} type="email" class={'form-control' + (disabled ? ' gritext' : ' text-black')} id="exampleInputEmail1" placeholder={data.userprofilbyid.email} disabled={disabled ? true : false} />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 px-lg-4 col-12">
                                        <div class="mb-3">
                                            <label class=" form-label ">Phone</label>
                                            <input onChange={(e) => setPhone(e.target.value)}
                                                value={phone} class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.userprofilbyid.phone} disabled={disabled ? true : false} />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 px-lg-4 col-12">
                                        <div class="mb-3 ">
                                            <label class="form-label " >User Type</label>
                                            <select onChange={(e) => setRole(e.target.value)}
                                                class={'form-control form-select' + (disabled ? ' gritext' : ' text-black')} aria-label="Select user type" disabled={disabled ? true : false}>
                                                <option className='is' disabled selected hidden>{data.userprofilbyid.role.charAt(0).toUpperCase() + data.userprofilbyid.role.slice(1)}</option>
                                                <option className="text-dark " value="admin">Administrator</option>
                                                <option className="text-dark" value="Regular">Regular User</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <div className="row ms-lg-4">
                                    <div className=" col-lg-2 col-12 mt-lg-0 mt-3">
                                        <div className={color ? 'fs-5 d-flex w-100' : ' d-none'}>
                                            <div className= {namedata && namedata.getmyprofile.role === "admin" ? 'col-lg-11 col-6 pe-3' : 'd-none'}>
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
                                                        setFirst_name(data.userprofilbyid.first_name)
                                                        setLast_name(data.userprofilbyid.last_name)
                                                        setEmail(data.userprofilbyid.email)
                                                        setPhone(data.userprofilbyid.phone)
                                                        setRole(data.userprofilbyid.role)
                                                        setStatus(data.userprofilbyid.status)
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
        </>
    )

}
export default UserProfile