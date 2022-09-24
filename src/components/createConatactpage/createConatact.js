import './createConatact.css'
import Navbarr from '../navbar/navbar';
import { useMutation } from "@apollo/client";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CREATECONTACT_MUTATION } from '../../graphql/mutations';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactFileReader from 'react-file-reader';
import { GETCONTACTCOUNTS_QUERY, GETLASTACTIVITIES_QUERY, GET_CONTACTS } from '../../graphql/queries';
import alt from '../../images/image1.png';
const CreateContact = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [phone, setPhone] = useState("")
    const [email2, setEmail2] = useState("")
    const [mobile, setMobile] = useState("")
    const [address1, setAdress1] = useState("")
    const [address2, setAdress2] = useState("")
    const [image, setImage] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [CreateContact, { data, loading, error }] = useMutation(CREATECONTACT_MUTATION)
    const handleSubmit = (e) => {
        e.preventDefault();
        CreateContact({
            variables: {
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
            },refetchQueries: [{ query: GET_CONTACTS, variables: { page: 1, search:"" }},
            {query: GETLASTACTIVITIES_QUERY},
            {query: GETCONTACTCOUNTS_QUERY}
        ]
        })
    }
   const handleFiles = (files) => {

    console.log(files.base64)
      }
    return (
        <>
            <Navbarr />
            <div className="bgpages">
                <div className="container ">

                    <form className=" p-lg-0 px-lg-3 pt-lg-4 p-3" onSubmit={handleSubmit}>
                        {data && <Modal isOpen={showModal}>
                            <ModalHeader className=""><div className="">Great!</div></ModalHeader>
                            <ModalBody className="p-5">
                                Company profile has been updated successfully
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => navigate("/contacts", { replace: true })}>
                                    Home
                                </Button>

                            </ModalFooter>
                        </Modal>}
                        <h4 className=""> Home / Contacts / Create new</h4>
                        <hr className="" />
                        <div className="shadow-lg border border-2 mt-lg-4 mt-4 rounded-3 ">
                            <div className="form-header border-bottom rounded-3  bgpages p-lg-3 d-flex justify-content-between ">
                                <h4 className="ms-lg-5 mt-lg-1 p-3 p-lg-0">Contact details</h4>
                            </div>
                            {error && <p className="text-danger mt-2">{error.message}</p>}

                            <div className="p-lg-4 p-3 bg-white rounded-bottom ">

                                <div className='row ms-lg-3 mb-4 '>
                                    <div className='col-lg-3 mt-3 pb-5'>
                                        <div className='ms-lg-2 ms-3'>
                                        <img className='imagebg mx-0 ms-5 '  src={image.length > 0 ? image : alt}/></div>

                                        <p className='gritext w-100 ms-lg-4 ps-lg-2 ms-4 ps-4 fw-bolder mt-4'>JPG or PNG no larger than 5 MB</p>

                                       <div className='ms-lg-0 ps-4 ps-lg-0'>
                                            <ReactFileReader base64={true} handleFiles={(e)=> {handleFiles(e);setImage(e.base64)}}>
                                                <label className='btn btn-primary  w-75 ms-lg-4 ms-4 fw-normal'>Upload an image</label>
                                            </ReactFileReader>
                                        </div>
                                    </div>
                                    <div className='col-lg-9'>
                                        <div className='row mt-2'>
                                            <div className='col-lg-6 col-12 px-lg-2'><label class="form-label ">first name<span class="text-danger ms-1">*</span></label>
                                                <input class="form-control bg-white text-black" placeholder='First' value={first_name}
                                                    onChange={(e) =>
                                                        setFirst_name(e.target.value)
                                                    }
                                                    required />
                                            </div>
                                            <div className='col-lg-6 col-12 px-lg-2'>
                                                <label class="form-label  ">last name <span class="text-danger ms-1">*</span></label>
                                                <input class="form-control bg-white text-black " placeholder='Last' value={last_name}
                                                    onChange={(e) =>
                                                        setLast_name(e.target.value)
                                                    }
                                                    required />
                                            </div>

                                        </div>
                                        <div className='row mt-3'>

                                            <div className='col-lg-6 col-12 px-lg-2'><label class="form-label  ">Email</label>
                                                <input type="email" class="form-control  bg-white text-black" placeholder='name@example.com' value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className='col-lg-6 col-12 px-lg-2'>
                                                <label class="form-label  ">Phone<span class="text-danger ms-1">*</span></label>
                                                <input class="form-control  bg-white text-black" placeholder='555-123-4567' value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                    required />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-lg-6 col-12 px-lg-2'>
                                                <label class="form-label  ">Email 2</label>
                                                <input type="email" class="form-control  bg-white text-black" placeholder='name@example.com' value={email2}
                                                    onChange={(e) =>
                                                        setEmail2(e.target.value)
                                                    } />
                                            </div>
                                            <div className='col-lg-6 col-12 px-lg-2'>
                                                <label class="form-label  ">Mobile</label>
                                                <input class="form-control  bg-white text-black" placeholder='555-123-4567' value={mobile}
                                                    onChange={(e) =>
                                                        setMobile(e.target.value)
                                                    } />
                                            </div>
                                        </div>
                                        <div className='row mt-3'>

                                            <div className='col-lg-6 col-12 px-lg-2'><label class="form-label  ">Adress</label>
                                                <textarea class="form-control  bg-white text-black" rows="3" placeholder='Address' value={address1}
                                                    onChange={(e) =>
                                                        setAdress1(e.target.value)
                                                    } />

                                            </div>

                                            <div className='col-lg-6 col-12 px-lg-2'>
                                                <label class="form-label ">Adress 2</label>
                                                <textarea class="form-control  bg-white text-black" rows="3" placeholder='Address 2' value={address2}
                                                    onChange={(e) =>
                                                        setAdress2(e.target.value)
                                                    } />

                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-start w-75 mt-3 pt-3 ms-lg-2 ms-0">
                                            <div className="col-lg-3 mt-lg-0 mt-3">
                                                <button
                                                    class="btn-primary px-lg-0 px-5 btn bgcolor col-lg-8 w-100 text-white "
                                                    onClick={() => { setShowModal(true) }}>Create</button>
                                            </div>
                                            <div className="col-lg-3 mt-lg-0 mt-3 ms-lg-5 ms-4 ps-2 ps-lg-0">
                                                <button class="btn btn-primary col-lg-8 w-100 px-lg-0 px-5 bg-white textcolor"
                                                    onClick={() => navigate("/contacts", { replace: true })}>Back</button>
                                            </div>
                                        </div>
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
export default CreateContact;