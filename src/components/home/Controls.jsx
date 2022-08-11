
import { useApp } from "../../helpers/Context";
import BootstrapFilePicker from "./BootstrapFilePicker";
import GoogleDriveFilePicker from "./googleDriveFilePicker";

const Controls = () => {
  const { handleUploadedImages } = useApp();


  return (
    <div className="d-flex justify-content-center my-3 ">
      <div className=" card rounded p-2" >
         <GoogleDriveFilePicker /> 

        <BootstrapFilePicker handleUploadedImages={handleUploadedImages} />
      </div>
    </div>
  );
};

export default Controls;
