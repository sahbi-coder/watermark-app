

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const Footer = ({path}) => {
  return (
    <footer className="pb-3 bg-dark d-flex flex-column justify-content-start">
      <div className='d-flex justify-content-between align-items-center  bg-white py-2'>
          <button className='btn bg-light mx-1' disabled={path==='/'?true:false}>
  <FontAwesomeIcon icon={faArrowLeft} className='color-dark mx-2'/>
       PREVIOUS STEP
          </button>
          <button className='btn bg-light mx-1'>
           NEXT STEP
  <FontAwesomeIcon icon={faArrowRight}  className='color-dark mx-2'/>
          </button>


      </div>
      <div className="container px-4">
        <p className="m-0 text-center text-white ">
          Copyright &copy; Sahbi Kardi 2022
        </p>
      </div>
    </footer>
  );
};
export default Footer;
