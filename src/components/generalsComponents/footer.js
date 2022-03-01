import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectedUrls = ["/user-options","/image-manipulation","/all-images-manipulation"]
  useEffect(() => {
    if (~redirectedUrls.indexOf(location.pathname) ) {
      navigate("/");
    }
  }, []);

  return (
    <footer className="pb-3 bg-dark d-flex flex-column justify-content-start">
      <div className="container px-4">
        <p className="m-0 text-center text-white ">
          Copyright &copy; Sahbi Kardi 2022
        </p>
      </div>
    </footer>
  );
};
export default Footer;
