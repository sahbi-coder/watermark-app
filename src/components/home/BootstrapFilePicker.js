import React from "react";

function BootstrapFilePicker({ handleUploadedImages }) {
  return (
     
    
   
    <form action="/form/sumbit" className="my-3">
      <label className="my-label" htmlFor="upload" >select from device</label>
      <input type="file" name="photo" id="upload"onChange={handleUploadedImages} multiple/>
    </form>


  );
}

export default BootstrapFilePicker;
