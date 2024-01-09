import { categories } from "../../utils/categories";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";

function Services() {
  const router = useRouter();
  return (
    <div className="mx-20 my-16">
      <h2 className=" text-4xl mb-10 text-gray-700 font-bold ml-2">Layanan</h2>
      <ul className=" grid grid-cols-5 gap-10">
        {categories.map(({ name, logo }) => (
          <li
            key={name}
            className=" flex flex-col justify-center items-center cursor-pointer hover:shadow-xl hover:to-blue-600 hover:border-blue-300 border-2 p-5 border-transparent transition-all duration-300"
            onClick={() => router.push(`/search?category=${name}`)}
          >
            <Image src={logo} alt="category" height={50} width={50} />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
