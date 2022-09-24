import './updateContact.css'
import Navbarr from '../navbar/navbar';
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from 'react';
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { CREATECONTACT_MUTATION, UPDATECONTACT_MUTATION } from '../../graphql/mutations';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactFileReader from 'react-file-reader';
import Form from 'react-bootstrap/Form';
import pen from "../../images/edit-off.svg"
import { GETCONTACTPROFILE_QUERY, GET_CONTACTS,GETWITHOUTEMAILCONTACTS_QUERY,GETWITHEMAILCONTACTS_QUERY,GETINACTIVECONTACTS_QUERY,GETACTIVECONTACTS_QUERY, GETLASTACTIVITIES_QUERY } from '../../graphql/queries';
import { useEffect } from 'react';
import alt_image from "../../images/image1.png"
const CreateContact = () => {
    let navigate = useNavigate();
    let { conId } = useParams();
    const [email, setEmail] = useState("")
    const [switchh, setSwitchh] = useState(false)
    const [disabled, setDisable] = useState(true)
    const [color, setColor] = useState(true)
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [phone, setPhone] = useState("")
    const [email2, setEmail2] = useState("")
    const [mobile, setMobile] = useState("")
    const [address1, setAdress1] = useState("")
    const [address2, setAdress2] = useState("")
    const [image, setImage] = useState("")
    const [status, setStatus] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [contact_id, setContact_id] = useState(conId)
    console.log(conId);
    const { data, loading, error } = useQuery(GETCONTACTPROFILE_QUERY,
        {
            variables: {
                id: contact_id
            }
        })
    const [UpdateContact, { data: dartaupdate, loading: loadingupdate, error: errorupdate }] = useMutation(UPDATECONTACT_MUTATION, { refetchQueries: [{ query: GETCONTACTPROFILE_QUERY, variables: { id: contact_id } }] })
    /* const [formState, setFormState] = useState(data && data.getcontactprofile) */
    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateContact({
            variables: {
                contact_id,
                status,
                email,
                first_name,
                last_name,
                phone,
                mobile,
                email2,
                address2,
                address1,
                image,
            }, onCompleted: (error) => {
                console.log(error.message);
            },
            refetchQueries: [{ query: GET_CONTACTS, variables: { page: 1, search: "" }},
                             {query: GETCONTACTPROFILE_QUERY, variables: { id: contact_id}},
                             {query: GETACTIVECONTACTS_QUERY},
                             {query: GETINACTIVECONTACTS_QUERY},
                             {query: GETWITHEMAILCONTACTS_QUERY},
                             {query: GETWITHOUTEMAILCONTACTS_QUERY},
                             { query: GETLASTACTIVITIES_QUERY},
                            ]
        })
    }
    useEffect(() => {
        if (data) {
            setSwitchh(data.getcontactprofile.status === 'Active' ? true : false)
            setFirst_name(data.getcontactprofile.first_name)
            setLast_name(data.getcontactprofile.last_name)
            setEmail(data.getcontactprofile.email)
            setEmail2(data.getcontactprofile.email2)
            setPhone(data.getcontactprofile.phone)
            setMobile(data.getcontactprofile.mobile)
            setStatus(data.getcontactprofile.status)
            setAdress1(data.getcontactprofile.address1)
            setAdress2(data.getcontactprofile.address2)
            setImage(data.getcontactprofile.image)

        }
    }, [data])
    const handleFiles = (files) => {
        /* console.log(files.base64) */
    }
    return (
        <>
            <Navbarr />
            <div className="bgpages">
                <div className="container ">

                    {data && <form className=" p-lg-0 px-lg-3 pt-lg-4 p-3" onSubmit={handleSubmit}>
                        <Modal isOpen={showModal}>
                            <ModalHeader className=""><div className="">Great!</div></ModalHeader>
                            <ModalBody className="p-5">
                                Contact profile has been updated successfully
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => navigate("/contacts", { replace: true })}>
                                    All Contacts
                                </Button>

                            </ModalFooter>
                        </Modal>
                        <h4 className=""> Home / Contacts / {data.getcontactprofile.first_name}</h4>

                        <hr className="" />
                        <div className="shadow-lg border border-2 mt-lg-4 mt-4 rounded-3 ">

                            <div className="form-header border-bottom rounded-3  bgpages p-lg-3 d-flex justify-content-between ">
                                <h4 className="ms-lg-3 mt-lg-1 p-3 p-lg-0">Contact details</h4>
                                <div className='d-flex mt-2 pt-1 pt-lg-0 mt-lg-0 ps-2 mt-lg-0'>
                                    <Form.Check
                                        label={status}
                                        type="switch"
                                        disabled={disabled ? true : false}
                                        id="custom-switch"
                                        checked={switchh}
                                        className='fs-4 pe-lg-5 me-lg-5 me-2'
                                        reverse
                                        onClick={(e) => { setSwitchh(e.target.checked); setStatus(switchh ? 'Inactive' : 'Active') }}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-danger mt-2">{error.message}</p>}

                            <div className="p-lg-4 pe-lg-5 p-3 bg-white rounded-bottom ">

                                <div className='row ms-lg-3 mb-4 '>
                                    <div className='col-lg-3 mt-3 ps-3'>
                                        <div className='ms-lg-3 ms-0'>
                                        <img className='imagebg ms-5' placeholder='' src={image === 'string' ? alt_image : image} /></div>

                                        <p className={disabled ? 'd-none' : 'text-center gritext w-100 fw-bolder mt-4'}>JPG or PNG no larger than 5 MB</p>
                                        <p className={disabled ? ' w-100 text-center fw-bolder mt-4 pe-5 ms-2 ms-lg-3' : 'd-none'}>{data.getcontactprofile.first_name} {data.getcontactprofile.last_name}</p>
                                        <ReactFileReader base64={true} handleFiles={(e) => { handleFiles(e); setImage(e.base64) }}>
                                            <label className={disabled ? 'd-none' : 'btn btn-primary ms-4 col-10 fw-normal'}>Upload an image</label>
                                        </ReactFileReader>
                                    </div>
                                    <div className='col-lg-9'>
                                        <div className='row mt-2'>
                                            <div className='col-lg-6 px-2 col-12'><label class="form-label fs-5 ">first name</label>
                                                <input disabled={disabled ? true : false} class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getcontactprofile.first_name} value={first_name}
                                                    onChange={(e) =>
                                                        setFirst_name(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className='col-lg-6 px-2 col-12'>
                                                <label class="form-label fs-5 ">last name </label>
                                                <input disabled={disabled ? true : false} class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getcontactprofile.last_name} value={last_name}
                                                    onChange={(e) =>
                                                        setLast_name(e.target.value)
                                                    }
                                                />
                                            </div>

                                        </div>
                                        <div className='row mt-3 '>
                                            <div className='col-lg-6 px-2 col-12'><label class="form-label fs-5 ">Email</label>
                                                <input disabled={disabled ? true : false} type="email" class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getcontactprofile.email} value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className='col-lg-6 px-2 col-12'>
                                                <label class="form-label fs-5 ">Phone</label>
                                                <input disabled={disabled ? true : false} type="tel" class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getcontactprofile.phone} value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-lg-6 px-2 col-12'>
                                                <label class="form-label fs-5 ">Email 2</label>
                                                <input disabled={disabled ? true : false} type="email" class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getcontactprofile.email2} value={email2}
                                                    onChange={(e) =>
                                                        setEmail2(e.target.value)
                                                    } />
                                            </div>
                                            <div className='col-lg-6 px-2 col-12'>
                                                <label class="form-label fs-5 ">Mobile</label>
                                                <input disabled={disabled ? true : false} class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={data.getcontactprofile.mobile} value={mobile}
                                                    onChange={(e) =>
                                                        setMobile(e.target.value)
                                                    } />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-lg-6 px-2 col-12'><label class="form-label fs-5 ">Adress</label>
                                                <textarea disabled={disabled ? true : false} class={'form-control' + (disabled ? ' gritext' : ' text-black')} rows="3" placeholder={data.getcontactprofile.address1} value={address1}
                                                    onChange={(e) =>
                                                        setAdress1(e.target.value)
                                                    } />
                                            </div>
                                            <div className='col-lg-6 px-2 col-12'>
                                                <label class="form-label fs-5 ">Adress 2</label>
                                                <textarea disabled={disabled ? true : false} class={'form-control' + (disabled ? ' gritext' : ' text-black')} rows="3" placeholder={data.getcontactprofile.address2} value={address2}
                                                    onChange={(e) =>
                                                        setAdress2(e.target.value)
                                                    } />
                                            </div>
                                        </div>
                                        <div className="row mt-3 w-75 pt-3 ms-lg-2">
                                            <div className=" col-lg-4 mt-lg-0 mt-3 d-flex">
                                                <div className={color ? 'd-flex' : ' d-none'}>
                                                    <div className='col-lg-11'>
                                                        <a
                                                            class='btn-primary bg-white btn textcolor w-100 fs-5'
                                                            onClick={() => {
                                                                setDisable(disabled ? false : true);
                                                                setColor(color ? false : true)
                                                            }}><img src={pen}
                                                                className="pen me-1 mb-1" />Edit
                                                        </a>
                                                    </div>
                                                    <div className='col-lg-11 ms-4 ps-2'>
                                                        <Link to={"/contacts"} class={color ? 'btn-primary bg-white btn textcolor w-100 fs-5' : 'd-none'}>
                                                            Back
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='col-lg-11'>
                                                        <button
                                                            class={color ? "d-none" : "btn bt-primary bgcolor text-white w-100 fs-5"}
                                                            onClick={() => setShowModal(true)}>
                                                            Save
                                                        </button>
                                                    </div>
                                                    <div className='col-lg-11 ms-4 ps-2'>
                                                        <a class={color ? "d-none" : "btn-primary bg-white btn textcolor w-100 fs-5"}
                                                            onClick={() => {
                                                                setDisable(true);
                                                                setColor(true);
                                                                setFirst_name(data.getcontactprofile.first_name)
                                                                setLast_name(data.getcontactprofile.last_name)
                                                                setEmail(data.getcontactprofile.email)
                                                                setEmail2(data.getcontactprofile.email2)
                                                                setPhone(data.getcontactprofile.phone)
                                                                setMobile(data.getcontactprofile.mobile)
                                                                setStatus(data.getcontactprofile.status)
                                                                setAdress1(data.getcontactprofile.address1)
                                                                setAdress2(data.getcontactprofile.address2)
                                                                setImage(data.getcontactprofile.image)
                                                            }}>
                                                            Cancel
                                                        </a>
                                                    </div>


                                                </div>
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
export default CreateContact;