import { useState } from "react";

function useGetImages() {
  const [imageSources, setImageSources] = useState([]);
  const handleUploadedImages = (e) => {
    let files = [];
    for (let file of e.target.files) {
      if (file.type.slice(0, 5) === "image") {
        const fileReader = new FileReader();
        fileReader.onloadend = function () {
          if (fileReader.result.slice(0, 10) === "data:image") {
            files.push([fileReader.result]);
            if (files.length === e.target.files.length) setImageSources(files);
          } else {
            alert("file must be an image");
          }
        };
        fileReader.readAsDataURL(file);
      } else {
        alert("file must be an image");
      }
    }
  };
  const getImagesFromDrive = (data) => {
    setImageSources([data.map((i) => i.result.webContentLink)]);
  };
  return { imageSources, handleUploadedImages, getImagesFromDrive };
}

export default useGetImages;
