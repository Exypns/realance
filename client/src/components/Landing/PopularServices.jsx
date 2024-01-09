import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

function PopularServices() {
  const router = useRouter();
  const popularServicesData = [
    {
      name: "Logo Design",
      label: "Build your brand",
      image: "/services1.webp",
    },
    {
      name: "Website Design",
      label: "Customize your site",
      image: "/services2.webp",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/services3.webp",
    },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/services4.webp",
    },
  ];
  return (
    <div className=" mx-20 my-16">
      <h2 className=" text-4xl mb-10 ml-2 text-gray-800 font-bold">
        Layanan Populer
      </h2>
      <ul className=" flex flex-wrap gap-16 justify-center">
        {popularServicesData.map(({ name, label, image }) => (
          <li
            key={name}
            className=" relative cursor-pointer"
            onClick={() => router.push(`search?q-${name.toLowerCase()}`)}
          >
            <div className=" absolute z-10 text-white left-5 top-4">
              <span>{label}</span>
              <h6 className=" font-extrabold text-2xl">{name}</h6>
            </div>
            <div className=" h-80 w-72 ">
              <Image src={image} fill alt="services" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularServices;
