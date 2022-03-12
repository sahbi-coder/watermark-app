import { useContext } from "react";
import { useState,useEffect } from "react";
import { AppContext } from "../../helpers/Context";
import BootstrapFilePicker from "./BootstrapFilePicker";
import GoogleDriveFilePicker from "./googleDriveFilePicker";

const Controls = () => {
  const { handleUploadedImages } = useContext(AppContext);
  const [isOnline, setIsonline] = useState(navigator.onLine)
  useEffect(() => {
    setInterval(function(e){
          setIsonline(navigator.onLine)
    },3000)
  
    
  }, [isOnline])
  
  return (
    <div className="d-flex justify-content-center mb-3 ">
      <div className="  card rounded" style={{ width: 330 }}>
      
        { navigator.onLine?(<GoogleDriveFilePicker />):null
      } 

        
        <BootstrapFilePicker handleUploadedImages={handleUploadedImages} />
      </div>
    </div>
  );
};

export default Controls;
