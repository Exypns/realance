// import Companies from "@/components/Landing/Companies";
// import Everything from "@/components/Landing/Everything";
// import Header from "@/components/Header";
import HeroBanner from "../components/Landing/HeroBanner";
// import JoinRealance from "@/components/Landing/JoinRealance";
import PopularServices from "../components/Landing/PopularServices";
// import RealanceBusiness from "@/components/Landing/RealanceBusiness";
import Services from "../components/Landing/Services";
import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useStateProvider } from "../context/StateContext";

function Index() {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  return (
    <div>
      {/* <Header /> */}
      <HeroBanner />
      {/* <Companies /> */}
      <PopularServices />
      {/* <Everything /> */}
      <Services />
      {/* <RealanceBusiness />
      <JoinRealance /> */}
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
}

export default Index;
