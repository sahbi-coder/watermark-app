import { Link } from "react-router-dom";
import ToolsBar from "./ToolsBar";

const Header = () => {


  return (
    <header >
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-white ">
        <div className="container">
          <Link className="navbar-brand text-primary" to="/" >
            watermark generator app by sahbi kardi
          </Link>
        </div>
      
      </nav>
      <ToolsBar />
    </header>
  );
};
export default Header;
