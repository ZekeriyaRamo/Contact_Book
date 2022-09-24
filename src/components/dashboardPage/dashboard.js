import React, { useEffect, useState } from 'react'
import Navbarr from '../navbar/navbar'
import './dahsboard.css';
import email from '../../images/email-icon.svg';
import { useQuery } from '@apollo/client';
import {
    GETACTIVITIES_QUERY, GETLASTACTIVITIES_QUERY,
    GETACTIVECONTACTS_QUERY, GETINACTIVECONTACTS_QUERY,
    GETWITHEMAILCONTACTS_QUERY, GETWITHOUTEMAILCONTACTS_QUERY, ALLUSERS
} from '../../graphql/queries';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    let navigate = useNavigate();
    const { data, loading, error } = useQuery(GETLASTACTIVITIES_QUERY , {fetchPolicy:'network-only'})
    const { data: dataa, loading: loadinga, error: errora } = useQuery(GETACTIVECONTACTS_QUERY , {fetchPolicy:'network-only'})
    const { data: datai, loading: loadingi, error: errori } = useQuery(GETINACTIVECONTACTS_QUERY , {fetchPolicy:'network-only'})
    const { data: dataw, loading: loadingw, error: errorw } = useQuery(GETWITHEMAILCONTACTS_QUERY , {fetchPolicy:'network-only'})
    const { data: datawo, loading: loadingwo, error: errorwo } = useQuery(GETWITHOUTEMAILCONTACTS_QUERY , {fetchPolicy:'network-only'})
    const { data: datan, loading: loadingn, error: errorn } = useQuery(ALLUSERS , {fetchPolicy:'network-only'})
    const [id, setId] = useState("")
    useEffect(() => {
        if (datan) {
            setId(datan.users)
        }

    }, [datan]);

    return (
        <div>
            <Navbarr />
            <div className="bgpages">
                <div className="container p-lg-0 px-lg-3 pt-lg-5">
                    <h4 className="p-lg-0 pt-4 ps-3 ">Statistical Dashboard</h4>
                    <hr className=" mb-5 pb-lg-3 pb-0 mx-3 mx-lg-0 " />
                    <div className='d-lg-flex'>
                        <div className='col-6 text-white ms-4 ms-lg-0'>
                            <div className='row '>
                                <div className='col-lg-6 col-12 pb-lg-0 pb-5'>
                                    <div className=' card activeCard border-0 ms-lg-0 ms-4'>
                                        <div class="card-body">
                                            <h5 class="d-inline titl">{dataa && dataa.Getactivecontacts}</h5>
                                            <span class="bi ico float-end bi-arrow-up-circle-fill"></span>

                                            <p class="card-text opacity-50 mt-3 px20">Active</p>
                                            <div className='d-flex opacity-50'><spna class="bi fs-5 bi-arrow-up-short "></spna><span className='fs-6'>3% from last month</span>  </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=' col-lg-6 col-12 '>
                                    <div className='card border-0 inacticeCard ms-lg-2 ms-4'>
                                        <div class="card-body">
                                            <h5 class="d-inline titl">{datai && datai.Getinactivecontacts}</h5>
                                            <p class="bi  float-end bi-arrow-down-circle-fill ico"></p>
                                            <p class="card-text opacity-50 mt-3 px20">Inactive</p>
                                            <div className='d-flex opacity-50'><spna class="bi fs-5 bi-arrow-up-short "></spna><span className='fs-6'>3% from last month</span>  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-5 pt-0 pt-lg-2'>
                                <div className='col-lg-6 col-12  pb-5 '>
                                    <div className='card border-0 withEmailcard ms-lg-0 ms-4'>
                                        <div class="card-body">
                                            <h5 class="d-inline titl">{dataw && dataw.Getwithemailcontacts}</h5>
                                            <img src={email} className="float-end" />

                                            <p class="card-text opacity-50 mt-3 px20">With email</p>
                                            <div className='d-flex opacity-50'><spna class="bi fs-5 bi-arrow-up-short "></spna><span className='fs-6'>3% from last month</span>  </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-6 col-12 '>
                                    <div className='card border-0 withoutemail ms-lg-2 ms-4 '>
                                        <div class="card-body">
                                            <h5 class="d-inline titl ">{datawo && datawo.Getwithoutemailcontacts}</h5>
                                            <p class="bi float-end bi-x-circle-fill ico"> </p>
                                            <p class="card-text opacity-50 mt-3 px20 fw-light">Without email</p>
                                            <div className='d-flex opacity-50'><spna class="bi fs-5 bi-arrow-up-short "></spna><span className=''>3% from last month</span>  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 d-none d-lg-block'>
                            <div className='activity ms-3 border border-2 mt-lg-0 pb-lg-0 mt-4 rounded-3 '>
                                <div className="form-header border-bottom rounded-3  ps-lg-3 pt-lg-2 bgpages d-flex justify-content-between ">
                                    <h4 className="ms-lg-2 mt-lg-1 p-3 p-lg-2 py-lg-2  px26"><a className='text-dark text-decoration-none cursor' onClick={() => navigate("/activitylist")}>Latest activities</a></h4>
                                </div>
                                <div className="p-lg-4 pb-lg-3 pt-lg-0 p-3 bg-white rounded-bottom  ">
                                    {data && data.getlastactivities.map((activity) => (
                                        <div className=' justify-content-between py-lg-2 d-flex '>
                                            <span className='float-start ms-2  px20'>{activity.contactname}</span>
                                            <div className='d-flex w-50 justify-content-between p-1 pb-1 pe-3'>
                                                <span className='gritext'> {activity.created_at.split("T", 1)}</span>
                                                <div className='w-25'><span className={'bi-circle-fill  pe-1 ' + (activity.title)}>
                                                </span><span className='gritext '>{activity.title}</span></div>

                                                <div className='handled-user'>
                                                    {id && id.filter((name) => name.id == parseInt(activity.user_id))[0].first_name}
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='border-top mt-5 pt-2 rounded-3 d-lg-none  '>
                            <div className="border-bottom rounded-3 bgpages  ">
                                <h4 className=" p-3 px26">Latest activities</h4>
                            </div>
                            <div className="p-3 bg-white rounded-bottom ">
                                {data && data.getlastactivities.map((activity) => (

                                    <div className='py-lg-2 d-flex'>
                                        <div className='col-9'>
                                            <span className='row'><span className='float-start px20'>{activity.contactname}</span></span>
                                            <span className='gritext pe-4'> {activity.created_at.split("T", 1)}</span>
                                        </div>
                                        <div className='col-3'>
                                            <span className={'bi-circle-fill pe-2 ' + (activity.title)}>
                                            </span><span className='gritext'>{activity.title}</span>
                                            <div className='handled-user mb-3'>
                                                {id && id.filter((name) => name.id == parseInt(activity.user_id))[0].first_name}
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard