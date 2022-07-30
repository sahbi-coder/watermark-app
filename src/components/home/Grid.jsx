
import { useApp } from "../../helpers/Context";

const Grid = () => {
  const { imageSources } = useApp();
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
  };

  return (
    <div className="container-fluid">
      {imageSources.map(function (item, index) {
        return (
          <div key={generateKey(index)}>
            <div className="gallery-item">
              <div className="image">
                <img src={item[0]} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
