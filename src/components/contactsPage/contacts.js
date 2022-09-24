import './contacts.css'
import Navbarr from '../navbar/navbar';
import Form from 'react-bootstrap/Form';
import { GETCONTACTCOUNTS_QUERY, GETNAME_QUERY, GET_CONTACTS, GET_FAVORITE } from '../../graphql/queries'
import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import contact_image from "../../images/avatar2.png"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { DELETECONTACT_MUTATION, SETFAVORITE_MUTATION, EXPORTPDF_MUTATION } from '../../graphql/mutations';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
import alt_image from "../../images/image1.png"
import { Card } from 'react-bootstrap';
import Pagination  from '../../components/pagination/pagination';
const Contacts = () => {

    const [checked, setChecked] = useState([]);
    const [showError, setShowError] = useState()
    localStorage.getItem('Token');
    let navigate = useNavigate();
    const [clip, setClip] = useState(false);
    const [pagesCount, setPagesCount] = useState()
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const {data:namedata,loading:nameloading,error:nameerror }= useQuery(GETNAME_QUERY)
    const { data: favdataq, loading: favloading, faverror } = useQuery(GET_FAVORITE)
    const { data: datacount, loading: loadingcount, errorcount } = useQuery(GETCONTACTCOUNTS_QUERY)
    const { data, loading, error } = useQuery(GET_CONTACTS,{fetchPolicy:'cache-and-network',
        variables: {
            page: page,
            search: search,
        }
    });
    const [deleteContacts] = useMutation(DELETECONTACT_MUTATION, { refetchQueries: [{ query: GET_CONTACTS, variables: { page, search } },{ query: GET_CONTACTS, variables: { page, search } }] })
    const [favdata, setFavdata] = useState()
    useEffect(() => {
        if (favdataq) {
            setFavdata(favdataq.getfavorite)
        }
    }, [favdataq]);

    useEffect(() => {
        /* console.log(datacount.contactsCount); */
        { datacount && setPagesCount(Math.ceil((datacount && datacount.contactsCount / 6))) };
        console.log(pagesCount);
    }, [datacount]);


    const selectAll = (checked) => {
        if (!checked)
            setChecked([])
        else {
            setChecked(Array.from(data.getcontacts, (e) => e.id))
        }
    }
    const handleModal = () => {

        if (checked.length > 0) {
            setShowError(false)
            setShowModal(true)
        }
        else
            setShowError(true)
    }
    const [MakeFav] = useMutation(SETFAVORITE_MUTATION)
    const handleCopy = (Id) => {
        var gg = document.getElementById(Id);
        gg.classList.toggle("bi-check-lg");
    }
    const [exportPDF, { data: datapdf, loading: loadingpdf, error: errorpdf }] = useMutation(EXPORTPDF_MUTATION)
    
   
    return (
        <>
            <Navbarr />
            <div className="bgpages">
                <div className="container " >

                    <Modal isOpen={showModal} >
                        <ModalHeader className=""><div className="">Danger!</div></ModalHeader>
                        <ModalBody className="p-5">
                            are you sure to delete selected contacts
                        </ModalBody>
                        <ModalFooter className=' justify-content-between'>

                            <Button
                                class="btn-primary bg-white btn textcolor fs-5"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>

                            <Button color="primary fs-5" onClick={() => {
                                deleteContacts({

                                    variables: {

                                        id: checked
                                    },
                                    onCompleted(data) {
                                        console.log(checked);
                                        if (data)
                                            setChecked([])
                                        setShowModal(false)
                                    },
                                })
                            }}>
                                Submit
                            </Button>

                        </ModalFooter>
                    </Modal>

                    <div className=" p-lg-3">
                        <h4 className="mt-lg-4 mt-0 p-lg-0 pt-5 mt-lg-0 ms-4 ms-lg-0 fw-normal px22">Home / Contacts</h4>
                        <hr className="mx-4 mx-lg-0" />
                        <div className="d-lg-flex justify-content-between mt-4 mt-lg-0 px-lg-0 px-4">
                            <div className='wid d-none d-lg-block'>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="fs-5"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />
                            </div>
                            <p className={showError ? 'text-danger' : 'd-none'}> select 1 contact at least to delete</p>
                            <div className='d-lg-flex col-lg-6 d-none mt-4 mt-lg-0 justify-content-between'>

                                <div className='col-lg-2 '>
                                    <button type="submit" onClick={() => handleModal()}

                                        className="w-75 ms-4  btn bold red  text-white ">
                                        Delete
                                    </button>
                                </div>
                                <div className='col-lg-3 '>
                                    <button onClick={() => exportPDF()} className=" w-75 ms-4 btn   btn-primary  blue ">
                                        Export to
                                    </button>
                                </div>
                                <div className='col-lg-3 col-6 d-none d-lg-block'>
                                    <a href="https://mail.google.com/mail/u/3/#inbox?compose=new" className=" w-75 ms-3 btn  btn-primary  blue">
                                        Send Email
                                    </a>
                                </div>
                                <div className='col-lg-4  '>
                                    <button onClick={() => navigate("/createcontact", { replace: true })} className=" w-100 gren btn  btn-success fw-normal border-0">
                                        Create New
                                    </button>
                                </div>
                            </div>
                            {/* /////////////// responsive buttons///////////////////// */}
                            <div className='d-lg-none col-12-6 d-block mt-4 mt-lg-0 justify-content-between '>
                                <div className='col-12'>
                                    <button onClick={() => navigate("/createcontact", { replace: true })} className="px18  w-100 btn btn-primary">
                                        Create New
                                    </button>
                                </div>

                                <div className=' d-flex justify-content-between mt-3 pb-4 '>
                                    <div className=''>
                                        <button type="submit" onClick={() => handleModal()}
                                            className="px-5  w-100 btn bold red text-white px18  ">
                                            Delete
                                        </button>
                                    </div>
                                    <div className=''>
                                        <button onClick={() => exportPDF()} className="px18  px-5 btn btn-primary  blue ">
                                            Export to
                                        </button>
                                    </div>
                                </div>
                                <div className=' d-lg-none d-block mb-3'>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="fs-5"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />
                            </div>
                            </div>
                        </div>

                        <div className=' d-lg-none  pt-2 border-top bg-white px-4 border-bottom pb-4'>
                            {data && data.getcontacts.map((contact) => (
                                <div className='mt-3 '><Card className='d-lg-none bord'>
                                    <Card.Header className={namedata && namedata.getmyprofile.id == contact.user_id ? 'mb-1 d-flex justify-content-between pt-2 pb-0 bg-white': ' d-none'}>
                                         <input class={namedata && namedata.getmyprofile.id == contact.user_id ? "fs-4 form-check-input bordcheck" : ' d-none'} type="checkbox" checked={checked.includes(contact.id)}
                                        onChange={(e) => {
                                            if (!e.target.checked)
                                                setChecked([...checked].filter((e) => e !== contact.id))
                                            else {
                                                setChecked([...checked, contact.id])
                                                console.log(checked);
                                            }
                                        }} />{favdata && <a onClick={() => {
                                            MakeFav({
                                                variables: {
                                                    contact_id: contact.id
                                                },
                                                onCompleted(data) {
                                                    /* console.log(data); */
                                                    setFavdata(data.makefavorite);
                                                }
                                            })
                                        }}
                                            className={favdata.filter((name) => name.contact_id === parseInt(contact.id)).length > 0 ? 'bi bi-star-fill textcolor cursor fs-3 mt-2' : 'fs-2 mt-2 grey bi bi-star text-dark cursor'}>
                                        </a>
                                        }</Card.Header>
                                    <Card.Body >
                                        <div className=' border p-1 rounded-2 bg-light me-5 float-start idresponsive px-2 px13'>{"" + (contact.id)}</div>

                                        <img src={contact.image === 'string' ? alt_image : contact.image} className="  avatarResponsive ms-2" />
                                        <div className='float-end'>
                                            <div className={contact.status}> {contact.status}</div></div>
                                        <div className='fs-3 text-center fw-bolder mt-3'> {contact.first_name} {contact.last_name}</div>

                                    </Card.Body>
                                    <Card.Footer className="text-muted fs-5 bg-white mx-3">
                                         <div className='text-center px18'> {contact.email}</div>
                                        <div className='text-center px18'> {contact.phone}</div></Card.Footer>
                                </Card></div>))}
                        </div>

                        <table class="table bg-white mt-3 d-lg-table d-none">

                            <thead className='border-top'>
                                <tr className='ft'>
                                    <th scope="col" className=''>
                                        <div class="form-check fw-bolder ms-3 ">
                                            <input class="form-check-input mt-2 bordcheck" type="checkbox" onChange={(e) => selectAll(e.target.checked)} />
                                            <label class="form-check-label" for="flexCheckChecked">
                                            </label>
                                        </div>
                                    </th>
                                    <th scope="col" className=''>ID</th>
                                    <th scope="col" className=''>Favorite</th>
                                    <th scope="col" className=''>Image</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col" className=''><span className='ms-5 ps-4'>Email</span></th>
                                    <th scope="col">Phone</th>
                                    <th scope="col" className=' text-center'>Status</th>
                                    <th scope="col" className='ps-5'>  <div className='ms-1'>Action</ div></th>

                                </tr>

                            </thead>

                            <tbody class="table-group-divider">
                                {data && data.getcontacts.map((contact, c, ac) => (
                                    <tr>
                                        <th scope="row">
                                            {/* {console.log(namedata.getmyprofile.id,contact.user_id)} */}
                                            <div class={namedata && namedata.getmyprofile.id == contact.user_id ? " form-check ms-3 pb-1" : ' d-none'}>
                                                <input class="form-check-input bordcheck" type="checkbox" checked={checked.includes(contact.id)}
                                                    onChange={(e) => {
                                                        if (!e.target.checked)
                                                            setChecked([...checked].filter((e) => e !== contact.id))
                                                        else {
                                                            setChecked([...checked, contact.id])
                                                            console.log(checked);
                                                        }
                                                    }} />
                                            </div>
                                        </th>
                                        <td ><div className=''><span>{"" + (contact.id)}</span></div></td>

                                        <td className='pe-3 pt-3'>
                                            <div className='text-center fs-4 text-black'  >
                                                {favdata && <a onClick={() => {
                                                    MakeFav({
                                                        variables: {
                                                            contact_id: contact.id
                                                        },
                                                        onCompleted(data) {
                                                            /* console.log(data); */
                                                            setFavdata(data.makefavorite);
                                                        }
                                                    })
                                                }}
                                                    className={favdata.filter((name) => name.contact_id === parseInt(contact.id)).length > 0 ? 'bi bi-star-fill textcolor cursor' : 'bi bi-star text-dark cursor'}>
                                                </a>
                                                }
                                            </div>

                                        </td>
                                        <td >
                                            <div className="">
                                                {/* {console.log(contact.image)} */}
                                                <img src={contact.image === 'string' ? alt_image : contact.image} class="avatar" />
                                            </div>

                                        </td>
                                        <td ><div className=''>{contact.first_name}</div></td>
                                        <td><div className=''>{contact.last_name}</div></td>
                                        <td><div className='d-flex'>{contact.email}
                                            <CopyToClipboard text={contact.email} >
                                                <div className=''>
                                                    <span id={contact.id} onClick={(e) => { { handleCopy(e.target.id) }; setClip(clip ? false : true) }} class="cursor ms-2 bi-files fs-5 tooltip">
                                                        <span class="tooltiptext ">{clip ? "Copied" : "Copy"}</span>
                                                    </span>
                                                </div>
                                            </CopyToClipboard></div></td>
                                        <td><div className=''>{contact.phone}</div></td>
                                        <td><div className='py-1 fs-6'><div className={contact.status}> {contact.status}</div></div></td>
                                        <td className='ps-5'>
                                            <Link to={"/updatecontact/" + contact.id} class={namedata && namedata.getmyprofile.id == contact.user_id ? " btn bold btn-primary float-start blue " : ' d-none'}>
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination pagesCount={pagesCount} currentPage={page} pagesToshow={3} setCurrent={setPage}/>
                    </div>
                </div>
            </div>

        </>
    )

}
export default Contacts;


