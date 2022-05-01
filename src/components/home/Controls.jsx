import { useContext } from "react";
import { useState, useEffect } from "react";
import { AppContext } from "../../helpers/Context";
import BootstrapFilePicker from "./BootstrapFilePicker";
import GoogleDriveFilePicker from "./googleDriveFilePicker";

const Controls = () => {
  const { handleUploadedImages } = useContext(AppContext);


  return (
    <div className="d-flex justify-content-center mb-3 ">
      <div className="  card rounded" style={{ width: 330 }}>
         <GoogleDriveFilePicker /> 

        <BootstrapFilePicker handleUploadedImages={handleUploadedImages} />
      </div>
    </div>
  );
};

export default Controls;
