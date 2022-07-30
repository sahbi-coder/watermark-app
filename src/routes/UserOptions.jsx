
import { useApp } from "../helpers/Context";

const UserOptions = () => {
  
  
  const {setIsIndividual} =useApp()
  

  return (
    <form className="was-validated">
      <div className="mb-3">please select one of the options below:</div>
      <div className="custom-control custom-radio mb-1">
        <input
          type="radio"
          className="custom-control-input mx-1"
          id="multiple"
          name="radio-stacked"
          required
          onClick={(e)=>{setIsIndividual(false)}}
        />
        <label
          className="custom-control-label"
          htmlFor="customControlValidation2"
        >
          Apply one watermark for all.
        </label>
      </div>
      <div className="custom-control custom-radio mb-3">
        <input
          type="radio"
          className="custom-control-input mx-1"
          id="individual"
          name="radio-stacked"
          required
          onClick={(e)=>{setIsIndividual(true)}}
        />
        <label
          className="custom-control-label"
          htmlFor="customControlValidation3"
        >
          Or Apply an individual watermark for each image.
        </label>
      </div>
    </form>
  );
};
export default UserOptions;
