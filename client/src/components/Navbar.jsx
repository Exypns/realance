import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "../context/StateContext";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO } from "../utils/constant";
import { reducerCases } from "../context/constants";
import { HOST } from "../utils/constant";

function Navbar() {
  const realanceLogoURL = "/RealanceLogo.png";

  const router = useRouter();
  const [cookies] = useCookies();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setsearchData] = useState("");
  const [{ showLoginModal, showSignupModal, userInfo, isSeller }, dispatch] =
    useStateProvider();

  const handleLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };
  const handleSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  useEffect(() => {
    if (router.pathname === "/") {
      const positionNavbar = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener("scroll", positionNavbar);
      return () => window.removeEventListener("scroll", positionNavbar);
    } else {
      setIsFixed(true);
    }
  }, [router.pathname]);

  const links = [
    { linkName: "Beranda", handler: "#", type: "link" },
    { linkName: "Kategori", handler: "#", type: "link" },
    { linkName: "Perusahaan", handler: "#", type: "link" },
    { linkName: "Blog", handler: "#", type: "link" },
    { linkName: "Sign In", handler: handleLogin, type: "button" },
    { linkName: "Sign Up", handler: handleSignup, type: "button2" },
  ];

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );
          console.log({ user });
          let projectedUserInfo = { ...user };
          if (user.profileImage) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.profileImage,
            };
          }
          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });
          setIsLoaded(true);
          if (user.isProfileInfoSet === false) {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo]);

  const handleOrdersNavigate = () => {
    if (isSeller) router.push("/seller/orders");
    router.push("/buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/buyer/orders");
    } else {
      dispatch({ type: reducerCases.SWITCH_MODE });
      router.push("/seller");
    }
  };
  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 py-6 flex justify-between items-center top-0 z-30 transition-all duration-300 ${
            isFixed || userInfo
              ? "fixed bg-[#427D9D] shadow-xl border-e-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <img
                src={realanceLogoURL}
                alt="Realance Logo"
                style={{ width: "120px", height: "auto" }}
              />
            </Link>
          </div>
          <div
            className={`flex ${
              isFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              className=" w-[30rem] py-2.5 px-4 border rounded-tl-lg rounded-bl-lg"
              value={searchData}
              onChange={(e) => setsearchData(e.target.value)}
              placeholder="What service are you looking for today"
            />
            <button
              className=" bg-slate-900 py-1.5 text-white w-16 flex justify-center items-center rounded-tr-lg rounded-br-lg"
              onClick={() => {
                setsearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6" />
            </button>
          </div>
          {console.log("userInfo", { userInfo })}
          {!userInfo ? (
            <ul className=" flex gap-10 items-center text-white">
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                    key={linkName}
                    className={`${
                      isFixed ? "text-base" : "text-white"
                    } font-medium`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}>{linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border text-md font-semibold py-1 px-3 rounded-md ${
                          isFixed
                            ? "border-blue-400 text-white"
                            : " border-white text-white"
                        } hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-all duration-500`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-white font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Buat Halaman Pekerjaan
                </li>
              )}
              <li
                className="cursor-pointer text-white font-medium"
                onClick={handleOrdersNavigate}
              >
                Pesanan
              </li>
              <li
                className=" cursor-pointer font-semibold text-white py-1 px-3 border rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 "
                onClick={handleModeSwitch}
              >
                Ganti Sebagai {isSeller ? "Pembeli" : "Freelancer"}
              </li>
              <li
                className=" cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  //   setIsContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className=" bg-slate-700 h-10 w-10 flex items-center justify-center rounded-full relative">
                    <span className=" text-xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
        </nav>
      )}
    </>
  );
}

export default Navbar;
