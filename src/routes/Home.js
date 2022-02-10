import Grid from "../components.js/Grid";
import Controls from "../components.js/Controls";
import { useState } from "react";

const Home = () => {
  const [imageSource, setImageSource] = useState([]);
  const handleUploadedImages = (e) => {
    let files = [];
    for (let file of e.target.files) {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        files.push(fileReader.result);
        if (files.length === e.target.files.length) setImageSource(files);
      };
      fileReader.readAsDataURL(file);
    }
  };
  return (
    <div style={{marginTop:80,marginLeft:10}}>
      <Controls handleUploadedImages={handleUploadedImages}></Controls>
      <Grid imageSource={imageSource}></Grid>
    </div>
  );
};
export default Home