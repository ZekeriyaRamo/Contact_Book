import './users.css'
import Navbarr from '../navbar/navbar';
import Form from 'react-bootstrap/Form';
import { GET_USERS, GETUSERSCOUNT_QUERY, GETNAME_QUERY } from '../../graphql/queries'
import { DELETEUSER_MUTATION } from '../../graphql/mutations'
import { useQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Pagination from '../../components/pagination/pagination';
import { Card } from 'react-bootstrap';
import alt_image from "../../images/pp.svg"
const Users = () => {
    localStorage.getItem('Token');
    let navigate = useNavigate();
    const [checked, setChecked] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const [showError, setShowError] = useState()
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState()
    const { data, loading, error } = useQuery(GET_USERS, {
        variables: {
            page: page,
            search: search,
        }
    });
    const {data:namedata,loading:nameloading,error:nameerror }= useQuery(GETNAME_QUERY)
    const [deleteUsers] = useMutation(DELETEUSER_MUTATION, { refetchQueries: [{ query: GET_USERS, variables: { page, search } }] })
    const { data: datacount, loading: loadingcount, errorcount } = useQuery(GETUSERSCOUNT_QUERY)
    const selectAll = (checked) => {
        if (!checked)
            setChecked([])
        else {
            setChecked(Array.from(data.getusers, (e) => e.id))

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
    useEffect(() => {
        /* console.log(datacount.contactsCount); */
        { datacount && setPagesCount(Math.ceil((datacount.userscount / 6))) };
        { datacount && console.log(pagesCount) };
    }, [datacount]);

    return (
        <>
            <Navbarr />
            <div className="bgpages">
                <div className="container" >
                    
                        <Modal isOpen={showModal} >
                            <ModalHeader className=""><div className="">Warning!</div></ModalHeader>
                            <ModalBody className="p-5">
                                are you sure to delete selected users
                            </ModalBody>
                            <ModalFooter className=' justify-content-between'>

                                <Button
                                    class="btn-primary bg-white btn textcolor fs-5"
                                    onClick={() => setShowModal(false)}>
                                    Cancel
                                </Button>

                                <Button color="primary fs-5" onClick={() => {
                                    deleteUsers({
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
                            <h4 className="mt-lg-4 mt-0 p-lg-0 pt-4 ms-4 ms-lg-0 fw-normal px22"> Home / Users </h4>
                            <hr className="mx-4 mx-lg-0" />
                            <div className="d-lg-flex justify-content-between mt-4 mt-lg-0 px-lg-0 px-4 ">
                                <div className='col-lg-4'>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <p className={showError ? 'text-danger' : 'd-none'}> select 1 user at least to delete</p>
                                <div className='d-lg-flex d-flex col-lg-4 mt-4 mt-lg-0 mb-3 mb-lg-0 justify-content-between'>
                                    <div className='col-lg-3 ms-lg-5  col-5'>{console.log(namedata && namedata.getmyprofile.role)}
                                        <button type="submit" onClick={() => handleModal()} className={namedata && namedata.getmyprofile.role === "admin" ?"w-100  btn bold red text-white ": "d-none"}>
                                            Delete
                                        </button>
                                    </div>
                                    
                                    <div className='col-lg-7 col-6'>
                                        <button onClick={() => navigate("/inviteuser", { replace: true })}className={namedata && namedata.getmyprofile.role === "admin" ? " w-100  btn bold btn-primary  blue " : " d-none"}>
                                            Invite New User
                                        </button>
                                    </div>


                                </div>

                            </div>

                            <div className=' d-lg-none pt-2 border-top bg-white px-4 border-bottom pb-4'>
                                {data && data.getusers.map((user) => (
                                    <div className='mt-3 '><Card className='d-lg-none bord'>
                                        <Card.Header className={namedata && namedata.getmyprofile.role === "admin" ? "mb-1 d-flex justify-content-between py-2 bg-white pb-2" : "d-none"}>
                                            <input class="form-check-input fs-3 bordcheck " type="checkbox" checked={checked.includes(user.id)}
                                                onChange={(e) => {
                                                    if (!e.target.checked)
                                                        setChecked([...checked].filter((e) => e !== user.id))
                                                    else {
                                                        setChecked([...checked, user.id])
                                                        console.log(checked);
                                                    }
                                                }} />

                                        </Card.Header>
                                        <Card.Body className='text-center'>
                                            <div className=' border d-inline-flex p-1 rounded-2 bg-light float-start idresponsive px-2 px13 '>{"" + (user.id)}</div>
                                            <div className='float-end '>
                                                <div className={user.status}> {user.status}</div>
                                            </div>
                                            <img src={alt_image} className="px-1 w-25 ms-4 mt-1" />
                                            <div className=' text-center fw-bolder mt-3 px24 '> {user.first_name} {user.last_name}</div>
                                        </Card.Body>
                                        <Card.Footer className="text-muted fs-5 bg-white mx-3">
                                            <div className='text-center px18'> {user.email}</div>
                                            <div className='text-center px18'> {user.phone}</div></Card.Footer>
                                    </Card></div>))}
                            </div>

                            <table class="table bg-white mt-3 tabl d-none d-lg-table">

                                <thead>
                                    <tr className='ft'>
                                        <th scope="col" className=''>
                                            <div class={namedata && namedata.getmyprofile.role === "admin" ? "form-check fw-bolder ms-3 " : " d-none"}>
                                                <input class="form-check-input bordcheck" type="checkbox " onChange={(e) => { selectAll(e.target.checked); }} />
                                                <label class="form-check-label" for="flexCheckChecked">
                                                </label>
                                            </div>
                                        </th>
                                        <th scope="col" className=''> <div className=''>ID</div></th>

                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col" className=' text-center'>Status</th>
                                        <th scope="col" className='ps-5'>  <div className=''>Action</ div></th>
                                    </tr>

                                </thead>

                                <tbody class="table-group-divider">
                                    {data && data.getusers.map((user) => (
                                        <tr className=''>
                                            <th scope="row"><div class="form-check ms-3">

                                                <input class={namedata && namedata.getmyprofile.role === "admin" ? "form-check-input bordcheck" : "d-none"} type="checkbox" checked={checked.includes(user.id)}
                                                    onChange={(e) => {
                                                        if (!e.target.checked)
                                                            setChecked([...checked].filter((e) => e !== user.id))
                                                        else
                                                            setChecked([...checked, user.id])
                                                        console.log(checked);
                                                    }} />
                                            </div>
                                            </th>
                                            <td ><div ><span>{"" + user.id}</span></div></td>
                                            <td ><div >{user.first_name}</div></td>
                                            <td><div >{user.last_name}</div></td>
                                            <td><div >{user.email}</div></td>
                                            <td><div>{user.phone}</div></td>
                                            <td><div className='py-1 fs-6'><div className={'px-1 ' + user.status}> {user.status}</div></div></td>
                                            <td className='ps-5'>
                                                <Link to={"/userprofile/" + user.id} className=" btn bold btn-primary float-start blue ">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination pagesCount={pagesCount} currentPage={page} pagesToshow={3} setCurrent={setPage} />
                        </div>
                   
                </div>
            </div>

        </>
    )

}
export default Users