import { useState } from 'react';
import './navbar.css';
import logowhite from "../../images/Contact_Book_Logo.svg"
import { NavbarBrand, } from 'reactstrap';
import { Offcanvas, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_MUTATION } from '../../graphql/mutations';
import { GETNAME_QUERY } from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from 'reactstrap';

const Navbarr = () => {
    let navigate = useNavigate();
    localStorage.getItem('Token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION);
    const { data: namedata, loading: nameloading, error: nameerror } = useQuery(GETNAME_QUERY, { fetchPolicy: 'network-only' })

    return (
        <div className='navbar shadow-1 py-0 py-lg-1'>
            <div className='container'>
                <div className=' py-2 py-lg-2 pb-lg-3 w-100' dark expand="sm">
                    <div className='d-flex justify-content-between'>
                        <h1 class=" bi-list text-white ms-3 d-lg-none" onClick={handleShow}></h1>
                        <div className='d-lg-flex pe-lg-5 me-lg-5'>
                            <Link to={'/home'}>
                                <NavbarBrand className='float-start me-lg-0 pe-lg-0 ms-lg-1 ps-lg-3'>
                                    <img src={logowhite} alt="logo" className='navlogo' />
                                </NavbarBrand>
                            </Link>
                            <Nav class=" d-lg-flex mt-1 d-none me-lg-5 pe-lg-5 " variant='disabled'>
                                <Nav.Link className='mt-2 ' onClick={() => navigate("/home")}>Home</Nav.Link>
                                <Nav.Link onClick={() => navigate("/contacts")} className='mt-2 ms-5'>Contacts</Nav.Link>
                                <Nav.Link className='mt-2  ms-5' onClick={() => navigate("/companyprofile")}>Company Profile</Nav.Link>
                                <Nav.Link className='mt-2 ms-5 me-lg-5 pe-lg-3' onClick={() => navigate("/users")} >Users</Nav.Link>
                            </Nav>
                        </div>
                        <div className='d-lg-flex d-none mt-lg-1 me-4' >
                            <div class=" text-light mt-1 parent_person "><span className='bi bi-person-fill fs-4 '></span></div>
                            <NavDropdown
                                className='d-none d-lg-block ms-2 mt-2 pt-1 text-right'
                                title={namedata && namedata.getmyprofile.first_name}
                                menuVariant="white">

                                <NavDropdown.Item onClick={() => navigate("/myprofile")}>My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => {
                                    navigate("/");
                                    localStorage.removeItem('Token')
                                }}>Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                        <Offcanvas className="offcanva shadow-lg" show={show} onHide={handleClose}>
                            <Offcanvas.Header className="bgcolor " closeButton>
                                <Offcanvas.Title className='ms-3' ><img src={logowhite} alt="logo" /></Offcanvas.Title>
                            </Offcanvas.Header>
                            <div className='sidenav '>
                                <a className='nav' onClick={() => navigate("/home")} >Home</a>
                                <div className='hr mt-3'></div>
                                <a className='nav' onClick={() => navigate("/contacts")}>Contacts</a>
                                <div className='hr mt-3'></div>
                                <a className='nav' onClick={() => navigate("/companyprofile")}>Company Profile</a>
                                <div className='hr mt-3'></div>
                                <a className='nav' onClick={() => navigate("/users")}>Users</a>
                                <div className='hr mt-3'></div>
                                <p className='nav'>Username<p class="bi bi-person-fill fs-5 ms-1"></p></p>
                                <div className='hr '></div>
                                <a className='nav ms-5 ps-3' onClick={() => navigate("/myprofile")}>My Profile</a>
                                <div className='hr mt-3'></div>
                                <a className='nav ms-5 ps-3' onClick={() => {
                                    navigate("/");
                                    localStorage.removeItem('AUTH_TOKEN');
                                }}>Log Out</a>
                            </div>
                        </Offcanvas>

                    </div>
                </div>
            </div>
        </div>
    )

}
export default Navbarr 
