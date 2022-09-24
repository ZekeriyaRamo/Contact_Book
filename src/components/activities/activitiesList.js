import React, { useEffect, useState } from 'react'
import Navbarr from '../navbar/navbar'
import { useQuery } from '@apollo/client'
import { ALLUSERS, GETACTIVITIESCOUNTS_QUERY, GETACTIVITYLIST_QUERY} from '../../graphql/queries'
import Pagination from '../pagination/pagination'

const ActivitiesList = () => {

  const [pagesCount, setPagesCount] = useState(1)
  const { data: datacount, loading: loadingcount, errorcount } = useQuery(GETACTIVITIESCOUNTS_QUERY)
  const [id, setId] = useState("")
  const [page, setPage] = useState(1)
  const { data: datan, loading: loadingn, error: errorn } = useQuery(ALLUSERS)
  const { data, loading, error } = useQuery(GETACTIVITYLIST_QUERY, {
    variables: {
      page
    }
  })
  useEffect(() => {
    if (datan) {
      setId(datan.users)
    }

  }, [datan]);
  useEffect(() => {
    /* console.log(datacount && datacount.getactivitiescount); */
    { setPagesCount(Math.ceil((datacount && datacount.getactivitiescount / 6))) };
    { console.log(datacount && pagesCount) };
  }, [datacount]);
  return (
    <div>
      <Navbarr />
      <div className='p-lg-5 px-lg-3 p-3 bgpages'>

        <div className='container '>
          <h4 className=" mt-3"> Home / Activities</h4>
          <hr className="" />
          <table class=" bg-white mt-3 w-100 mb-4">
            <thead>
              <tr className='ft'>
                <th scope="col" className='ps-5'>Contact</th>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <th scope="col"className='ps-5'>Date</th>
                <th scope="col"className='ps-5'>Action</th>
                <th scope="col"className='ps-5'>By</th>

              </tr>

            </thead>

            <tbody class="table-group-divider">
              {data && data.Getactivities.map((activity) => (
                <tr>
                  <td ><div className='ms-5  fs-5'><span>{activity.contactname}</span></div></td>
                  <td className='ps-5'></td>
                  <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                <td className='ps-5'></td>
                  <td ><div className='ps-5'>{activity.date}</div></td>
                  <td ><div className='ps-5'><span className={'bi-circle-fill  pe-1 ' + (activity.title)}>
                  </span  >{activity.title}</div></td>
                  <td ><div className='handled-user ms-5'>{id.filter((name) => name.id == parseInt(activity.user_id))[0].first_name} </div></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination pagesCount={pagesCount} currentPage={page} pagesToshow={3} setCurrent={setPage} />
        </div>
      </div>
    </div >
  )
}

export default ActivitiesList