import { AppContext } from "../helpers/Context";
import { useContext} from "react";

const UserOptions = () => {
  
  
  const { toggleMode } = useContext(AppContext);
  return (
    <form className="was-validated" >
      <div>please choose one of the two options below:</div>
      <div className="custom-control custom-radio">
        <input
          type="radio"
          className="custom-control-input mx-1"
          id="multiple"
          name="radio-stacked"
          required
          onClick={toggleMode}
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
          onClick={toggleMode}
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
