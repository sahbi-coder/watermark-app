import { useContext } from "react";
import { AppContext } from "../helpers/Context";

const Controls = () => {
  const { handleUploadedImages } = useContext(AppContext);
  return (
    <div className="mb-3" style={{ width: 300, textAlign: "start" }}>
      <label htmlFor="formFile" className="form-label">
        {" "}
        choose image(s) below:
      </label>
      <input
        className="form-control form-control-sm"
        id="formFile"
        type="file"
        multiple
        onChange={handleUploadedImages}
      />
    </div>
  );
};

export default Controls;
