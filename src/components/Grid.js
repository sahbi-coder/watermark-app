import { useContext } from "react";
import { AppContext } from "../helpers/Context";
const Grid = () => {
  const {imageSources} = useContext(AppContext)
  const generateKey = (pre) => {
   
    return `${pre}_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
  };
 
  return (
    <div className="container-fluid">
      {imageSources.map(function (item, index) {
        return (
          <div key={generateKey(index) } >
            <div className="gallery-item">
              <div className="image">
                <img src={item} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
