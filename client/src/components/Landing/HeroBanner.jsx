import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function HeroBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);

  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 5 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="h-[680px] relative bg-cover">
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image
          alt="hero"
          src="/bg-hero1.png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero2.png"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero3.png"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero4.png"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        {/* <Image
          alt="hero"
          src="/bg-hero5.jpg"
          fill
          className={`${
            image === 5 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        /> */}
      </div>
      <div className="z-1 relative w-[650px] flex justify-center flex-col h-full gap-5 nl-20 left-20">
        <h1 className="text-white text-5xl leading-snug font-bold">
          Temukan layanan <i>Freelance</i> <br /> terbaik untuk bisnismu.
        </h1>
        {/* <div className="flex align-middle">
          <div className="relative">
            <input
              type="text"
              className="h-14 w-[450px] pl-10 rounded-md rounded-none rounded-tl-md rounded-bl-md"
              placeholder={`Try "building mobile app"`}
            />
          </div>
          <button className="bg-[#427D9D] text-white px-12 text-lg font-sans rounded-r-md">
            Search
          </button>
        </div> */}
        <div className="text-white flex gap-4">
          Populer:{" "}
          <ul className="flex gap-5">
            <li className=" text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer ">
              Website Design
            </li>
            <li className=" text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer ">
              Illustration
            </li>
            <li className=" text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer ">
              Programming
            </li>
            <li className=" text-sm py-1 px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer ">
              UI/UX
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
