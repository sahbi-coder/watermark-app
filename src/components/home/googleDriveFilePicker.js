import React from "react";
import useGoogleDrive from "C:/Users/__SAHBI__/Desktop/projects/portfolio projects/git-watermark-generator/watermark-app/src/helpers/google-drive-download-hook"

import useDrivePicker from "react-google-drive-picker/dist";

function GoogleDriveFilePicker() {
  const [openPicker, data, authResponse] = useDrivePicker();

  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "348886086241-1065bc5qf6e7d6l6c1las8shn3n4at3g.apps.googleusercontent.com",
      developerKey: "AIzaSyAOUjcI--uiwzQXb40A4E7kZrNP0E5ygAg",
      discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
      viewId: "DOCS",
      
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
    });
  };

  useGoogleDrive(data);

  return (
    <div className="my-3">
      
        <button onClick={handleOpenPicker} className="btn btn-outline-primary" style={{width:169,height:46}}>select from drive</button>
      
    </div>
  );
}

export default GoogleDriveFilePicker;