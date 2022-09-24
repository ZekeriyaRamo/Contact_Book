import "./footer.css"

const footer= () =>{
    return (

        <div>
            <footer className="footer fixed-bottom w-100 d-lg-block d-none ">
                <div className="hr">   
                </div>
                <p className="text1 mt-2 pt-2 d-block">Copyright <i class="bi bi-c-circle "></i>  ITM Development | Contact Book | 2022 
                    <span className="text">Privacy Policy - Terms & Conditions</span>
                </p>
            </footer>

        <footer className=" d-lg-none">
            <div className="sticky-bottom text-center bgc pt-4">
                <div className="responsivehr ms-4 "> 

                </div>
                <p className="textresponsive d-lg-none mt-3">Copyright ITM Development | Contact Book | 2022 
                </p>
            </div>

        </footer>

        </div>
    );
}

export default footer