import { useEffect } from "react";
import { AppContext } from "./Context";
import { useContext } from "react";
const useGoogleDrive = (data) => {
  const {getImagesFromDrive} = useContext(AppContext)
  useEffect(() => {
    

      const SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";
      const handleClientLoad = () => window.gapi.load("client:auth2", initClient);
      const queryListFiles = async () => {
        try {
         await window.gapi.client.load("drive", "v3");
          if(data){
             
              displayResults(data);
          }
        } catch (e) {
          console.error("Error getting files", e);
        }
      };
  
      async function displayResults(data) {
        let result = [];
        try {
          for (let i = 0; i < data.docs.length; i++) {
            let temp = await window.gapi.client.drive.files.get({
              fileId: data.docs[i].id,
              fields: "webContentLink",
            });
            result.push(temp);
          }
          getImagesFromDrive(result)
        } catch (e) {
          console.log(e);
        }
      }
  
      const initClient = () => {
        window.gapi.client.init({
          clientId:
            "348886086241-1065bc5qf6e7d6l6c1las8shn3n4at3g.apps.googleusercontent.com",
  
          scope: SCOPE,
        });
      
        queryListFiles()
       
      };
      
      const script = document.createElement("script");
      
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.defer = true;
      script.onload = handleClientLoad;
      
  
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    
   
    }, [data,navigator]);
};

export default useGoogleDrive;