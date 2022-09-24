import './companyProfile.css'
import { useNavigate } from "react-router-dom";
import Navbarr from '../navbar/navbar';
import { useState } from 'react';
import pen from "../../images/edit-off.svg"
import { MYCOMPANYPROFILE } from '../../graphql/queries'
import { useQuery, useMutation } from "@apollo/client";
import { UPDATECOMPANY_MUTATION } from '../../graphql/mutations';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const CompanyProfile = () => {
    let navigate = useNavigate();
    const { data: datar, loading: load, error: errorr } = useQuery(MYCOMPANYPROFILE);
    const [updatecompany, { data, loading, error }] = useMutation(UPDATECOMPANY_MUTATION);
    const [disabled, setDisable] = useState(true)
    const [color, setColor] = useState(true)
    const [griText, setGriText] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [formState, setFormState] = useState(datar && datar.mycompanyprofile)

    const handleSubmit = (e) => {
        e.preventDefault();
        updatecompany({
            variables: {
                name: formState.name,
                vat_num: formState.vat_num,
                state: formState.state,
                street: formState.street,
                street2: formState.street2,
                city: formState.city,
                state: formState.state,
                zip: formState.zip,
                country: formState.country,
            }, refetchQueries: () => [{
                query: MYCOMPANYPROFILE
            }],
            onCompleted: (error) => {
                console.log(error.message);
            }
        })
    }
    return (
        <>
            <Navbarr />
            <div className="bgpages">
                <div className="container ">

                    <form className="p-lg-0 px-lg-3 pt-lg-4 p-3" onSubmit={handleSubmit}>
                        {data && <Modal isOpen={showModal}>
                            <ModalHeader className=""><div className="">Great!</div></ModalHeader>
                            <ModalBody className="p-5">
                                Company profile has been updated successfully
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => navigate("/users", { replace: true })}>
                                    Home
                                </Button>

                            </ModalFooter>
                        </Modal>}
                        <h4 className="pt-lg-0 pt-4"> Home / Company Profile</h4>
                        <hr className="" />
                        <div className="shadow border border-2 mt-lg-4 mt-4 rounded-3 ">
                            <div className="form-header border-bottom rounded-3  bgpages p-lg-3 d-flex justify-content-between ">
                                <h4 className="ms-lg-2 mt-lg-1 mt-1 p-3 p-lg-0"> Company Profile</h4>
                            </div>
                            

                            <div className="p-lg-4 p-3 bg-white rounded-bottom ">

                                <div className='row ms-lg-3 mb-4 pt-1'>
                                {error && <p className="text-danger">{error.message}</p>}
                                    <div className="col-lg-4 col-12 pe-lg-3 pe-0">
                                        <div class="mb-3 pb-1 ps-lg-3 px-0">
                                            <label class="form-label fs-5 ">Company Name</label>
                                            <input class={'form-control' + (disabled ? ' gritext' : ' text-black')} value={formState?.name}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        name: e.target.value
                                                    })
                                                } placeholder={datar && datar.mycompanyprofile.name} disabled={disabled ? true : false} />
                                        </div>
                                        <div class="mb-3 pb-1 ps-lg-3 px-0">
                                            <label class="form-label fs-5">Street</label>
                                            <input class={'form-control' + (disabled ? ' gritext' : ' text-black')} value={formState?.street}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        street: e.target.value
                                                    })
                                                } placeholder={datar && datar.mycompanyprofile.street} disabled={disabled ? true : false} />
                                        </div>
                                        <div class="mb-3 pb-1 ps-lg-3 px-0">
                                            <label class="form-label fs-5">City</label>
                                            <input  className={'form-control' + (disabled ? ' gritext' : ' text-black')}
                                             value={formState?.city}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        city: e.target.value
                                                    })
                                                } placeholder={datar && datar.mycompanyprofile.city} disabled={disabled ? true : false} />
                                        </div>
                                        <div class="mb-3 pb-1 ps-lg-3 px-0">
                                            <label class="form-label fs-5">Zip</label>
                                            <input className={'form-control' + (disabled ? ' gritext' : ' text-black')} value={formState?.zip}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        zip: e.target.value
                                                    })
                                                } placeholder={datar && datar.mycompanyprofile.zip} disabled={disabled ? true : false} />
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-12 ps-lg-3 ps-0">
                                        <div class="mb-3 pb-1 pe-lg-3 px-0">
                                            <label class="form-label fs-5">VAT Number</label>
                                            <input class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={datar && datar.mycompanyprofile.vat_num} value={formState?.vat_num}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        vat_num: e.target.value
                                                    })
                                                } disabled={disabled ? true : false} />
                                        </div>

                                        <div class="mb-3 pb-1 pe-lg-3 px-0">
                                            <label class="form-label fs-5">Street 2</label>
                                            <input class={'form-control' + (disabled ? ' gritext' : ' text-black')} placeholder={datar && datar.mycompanyprofile.street2} value={formState?.street2}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        street2: e.target.value
                                                    })
                                                } disabled={disabled ? true : false} />
                                        </div>
                                        <div class="mb-3 pb-1 pe-lg-3 px-0">
                                            <label class="form-label fs-5">State</label>
                                            <input  value={formState?.state}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        state: e.target.value
                                                    })
                                                } placeholder={datar && datar.mycompanyprofile.state} disabled={disabled ? true : false}
                                                 class={'form-control' + (disabled ? ' gritext' : ' text-black')}/>
                                        </div>
                                        <div class="mb-3 pb-1 pe-lg-3 px-0">
                                            <label class="form-label fs-5" >Country</label>
                                            
                                            <select className={'form-control form-select' + (disabled ? ' gritext' : ' text-black')} aria-label="Select user type" value={formState?.country}
                                                onChange={(e) =>
                                                    setFormState({
                                                        ...formState,
                                                        country: e.target.value
                                                    })
                                                } disabled={disabled ? true : false}>
                                                <option  disabled selected hidden  ><span className="" >{datar && datar.mycompanyprofile.country}</span> </option>
                                                <optgroup id="country-optgroup-Europe" label="Europe">
                                                    <option value="AL" label="Albania">Albania</option>
                                                    <option value="AD" label="Andorra">Andorra</option>
                                                    <option value="AT" label="Austria">Austria</option>
                                                    <option value="BY" label="Belarus">Belarus</option>
                                                    <option value="BE" label="Belgium">Belgium</option>
                                                    <option value="BA" label="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                                    <option value="BG" label="Bulgaria">Bulgaria</option>
                                                    <option value="HR" label="Croatia">Croatia</option>
                                                    <option value="CY" label="Cyprus">Cyprus</option>
                                                    <option value="CZ" label="Czech Republic">Czech Republic</option>
                                                    <option value="DK" label="Denmark">Denmark</option>
                                                    <option value="DD" label="East Germany">East Germany</option>
                                                    <option value="EE" label="Estonia">Estonia</option>
                                                    <option value="FO" label="Faroe Islands">Faroe Islands</option>
                                                    <option value="FI" label="Finland">Finland</option>
                                                    <option value="FR" label="France">France</option>
                                                    <option value="DE" label="Germany">Germany</option>
                                                    <option value="GI" label="Gibraltar">Gibraltar</option>
                                                    <option value="GR" label="Greece">Greece</option>
                                                    <option value="GG" label="Guernsey">Guernsey</option>
                                                    <option value="HU" label="Hungary">Hungary</option>
                                                    <option value="IS" label="Iceland">Iceland</option>
                                                    <option value="IE" label="Ireland">Ireland</option>
                                                    <option value="IM" label="Isle of Man">Isle of Man</option>
                                                    <option value="IT" label="Italy">Italy</option>
                                                    <option value="JE" label="Jersey">Jersey</option>
                                                    <option value="LV" label="Latvia">Latvia</option>
                                                    <option value="LI" label="Liechtenstein">Liechtenstein</option>
                                                    <option value="LT" label="Lithuania">Lithuania</option>
                                                    <option value="LU" label="Luxembourg">Luxembourg</option>
                                                    <option value="MK" label="Macedonia">Macedonia</option>
                                                    <option value="MT" label="Malta">Malta</option>
                                                    <option value="FX" label="Metropolitan France">Metropolitan France</option>
                                                    <option value="MD" label="Moldova">Moldova</option>
                                                    <option value="MC" label="Monaco">Monaco</option>
                                                    <option value="ME" label="Montenegro">Montenegro</option>
                                                    <option value="NL" label="Netherlands">Netherlands</option>
                                                    <option value="NO" label="Norway">Norway</option>
                                                    <option value="PL" label="Poland">Poland</option>
                                                    <option value="PT" label="Portugal">Portugal</option>
                                                    <option value="RO" label="Romania">Romania</option>
                                                    <option value="RU" label="Russia">Russia</option>
                                                    <option value="SM" label="San Marino">San Marino</option>
                                                    <option value="RS" label="Serbia">Serbia</option>
                                                    <option value="CS" label="Serbia and Montenegro">Serbia and Montenegro</option>
                                                    <option value="SK" label="Slovakia">Slovakia</option>
                                                    <option value="SI" label="Slovenia">Slovenia</option>
                                                    <option value="ES" label="Spain">Spain</option>
                                                    <option value="SJ" label="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                                    <option value="SE" label="Sweden">Sweden</option>
                                                    <option value="CH" label="Switzerland">Switzerland</option>
                                                    <option value="UA" label="Ukraine">Ukraine</option>
                                                    <option value="SU" label="Union of Soviet Socialist Republics">Union of Soviet Socialist Republics</option>
                                                    <option value="GB" label="United Kingdom">United Kingdom</option>
                                                    <option value="VA" label="Vatican City">Vatican City</option>
                                                    <option value="AX" label="Åland Islands">Åland Islands</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mt-4 pt-2 mt-lg-0 text-center">
                                        <iframe className='map m-lg-4 ms-0' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1598.4794493964341!2d34.52933073448866!3d36.747557625725015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15278a688c923a41%3A0x6636935db7703298!2sMenderes%2C%20Gazi%20Mustafa%20Kemal%20Blv.%2C%2033340%20Mezitli%2FMersin!5e0!3m2!1sen!2str!4v1661856280591!5m2!1sen!2str"
                                            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" col-lg-4 mt-lg-0 mt-3 ms-lg-4">
                                        <div className='col-lg-5 col-8 ms-5 ms-lg-1 '>
                                            <a
                                                class={color ? 'btn-primary bg-white ms-1 btn textcolor w-100 ' : 'd-none'}
                                                onClick={() => {
                                                    setDisable(false);
                                                    setColor(false);setGriText(false);
                                                }}><img src={pen}
                                                    className="pen me-1 mb-1" />Edit
                                            </a>
                                        </div>
                                        <div className='d-flex '>
                                            <div className='col-5 ms-3 ms-lg-2'>
                                                <button
                                                    class={color ? "d-none" : "btn bt-primary bgcolor text-white w-100 "}
                                                    onClick={() => setShowModal(true)}>
                                                    Save
                                                </button>
                                            </div>
                                            <div className='col-5 ms-3'>
                                                <a
                                                    class={color ? "d-none" : "btn-primary bg-white btn textcolor w-100 "}
                                                    onClick={() => {setFormState(datar.mycompanyprofile);setDisable(true);
                                                        setColor(true);setGriText(true);}}>
                                                    Cancel
                                                </a>
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
export default CompanyProfile;