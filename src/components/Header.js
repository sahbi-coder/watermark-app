import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm bg-white ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            watermark generator app by sahbi kardi
          </Link>
          <ul id="main_nav" className="nav nav-pills ms-auto">
            <li className="nav-item mx-3">
              <Link to="/" style={{textDecoration:'none'}}> select image(s) </Link>
            </li>
            <li className="nav-item mx-3">
              <Link to="/mass-watermark" style={{textDecoration:'none'}} >watermark All</Link>
            </li>
            <li className="nav-item mx-3">
              <Link to="/manual-watermark" style={{textDecoration:'none'}} >watermark individually </Link>
            </li>
           
           
           
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
