import React from 'react'
import  { useEffect, useState } from 'react';
const Pagination = ({ pagesCount=1, currentPage=1, pagesToshow=1,setCurrent }) => {
    const [start, setStart] = useState(Math.max(Math.min((currentPage - Math.floor((pagesToshow - 1) / 2)), pagesCount - pagesToshow - 1),1));
    const [end, setEnd] = useState(0)
    useEffect(() => {
        if (start >0) {
            setEnd(Math.min(start + pagesToshow - 1, pagesCount))
        }
    }, [start])
/* console.log(start,end,pagesToshow,pagesCount); */
    return (
        pagesCount > 1 && start && end &&  <nav aria-label="..." className='float-lg-end justify-content-center d-flex px-1 mt-lg-1 mt-4'>
            <ul class="pagination">
                <li class="page-item" >
                    <a class={"page-link" + (currentPage-1 === 0 ? ' disabled' : '')} onClick={() => setCurrent(currentPage - 1)}>Previous</a>
                </li>

                {[...Array(start+end-1)].map((num,i) =>
                    <li class="page-item" >
                        <a className={ 'page-link' + (i+start=== currentPage ? ' active' :'')} onClick={() => setCurrent(i+start)}>{i+currentPage}</a>
                    </li>
                )} 

                <li class="page-item" >
                    <a class={"page-link" + (currentPage === pagesCount ?  ' disabled' : '')} onClick={() => {/* setStart(start+1);setEnd(end+1);  */setCurrent(currentPage + 1);}}>Next</a>
                </li>

            </ul>
        </nav>
    )
}

export default Pagination