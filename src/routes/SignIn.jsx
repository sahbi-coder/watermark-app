import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center mb-5 flex-column align-items-center">
        <h1>Sign in</h1>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
