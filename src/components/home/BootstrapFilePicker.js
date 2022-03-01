import React from "react";

function BootstrapFilePicker({ handleUploadedImages }) {
  return (
     
    
    <div style={{width:330,position:"relative",height:38}} className="my-3">
        <label className="btn btn-primary" htmlFor='ormFile'style={{position:'absolute',left:25,zIndex:100 ,top:0,height:38}}> select from device</label>
        <input
          style={{position:'absolute',left:75,top:4,height:38}}
          id="formFile"
          type="file"
          multiple
          onChange={handleUploadedImages}
        />
    </div>


  );
}

export default BootstrapFilePicker;
