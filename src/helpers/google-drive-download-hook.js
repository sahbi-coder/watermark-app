import { useEffect } from "react";
import { useApp } from "./Context";
const useGoogleDrive = (data) => {
  const { getImagesFromDrive } = useApp();
  useEffect(() => {
    const SCOPE = "https://www.googleapis.com/auth/drive.metadata.readonly";
    const handleClientLoad = () => window.gapi.load("client:auth2", initClient);
    const queryListFiles = async () => {
      try {
        await window.gapi.client.load("drive", "v3");
        if (data) {
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
        getImagesFromDrive(result);
      } catch (e) {
        console.log(e);
      }
    }

    const initClient = () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
       

        scope: SCOPE,
      });

      queryListFiles();
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
  }, [data, navigator]);
};

export default useGoogleDrive;
