import { useStateProvider } from "../../context/StateContext";
import { useRouter } from "next/router";
import React from "react";
import { FiClock, FiRefreshCcw } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";

function Pricing() {
  const [{ gigData, userInfo }, dispatch] = useStateProvider();
  const router = useRouter();
  return (
    <>
      {gigData && (
        <div className=" sticky top-36 mb-10 h-max w-96">
          <div className=" border p-10 flex flex-col gap-5">
            <div className=" flex justify-between">
              <h4 className=" text-md font-normal text-gray-500">
                {gigData.shortDesc}
              </h4>
              <h6 className=" font-medium text-lg">Rp.{gigData.price}</h6>
            </div>
            <div>
              <div className=" text-gray-500 font-semibold text-sm flex gap-6">
                <div className=" flex items-center gap-2">
                  <FiClock className=" text-xl" />
                  <span>{gigData.deliveryTime} Days Delivery</span>
                </div>
                <div className=" flex items-center gap-2">
                  <FiRefreshCcw className=" text-xl" />
                  <span>{gigData.revisions} Revisions</span>
                </div>
              </div>
            </div>
            <ul>
              {gigData.features.map((feature) => (
                <li key={feature} className=" flex items-center gap-3">
                  <BsCheckLg className=" text-blue-500 text-lg" />
                  <span className=" text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            {gigData.userId === userInfo?.id ? (
              <button
                className=" flex items-center bg-blue-500 text-white py-2 justify-center font-bold text-lg relative"
                onClick={() => router.push(`/seller/gigs/${gigData.id}`)}
              >
                <span>Edit</span>
                <BiRightArrowAlt className=" text-2xl absolute right-4" />
              </button>
            ) : (
              <button
                className=" flex items-center bg-blue-500 text-white py-2 justify-center font-bold text-lg relative rounded"
                onClick={() => router.push(`/checkout?gigId=${gigData.id}`)}
              >
                <span>Continue</span>
                <BiRightArrowAlt className=" text-2xl absolute right-4" />
              </button>
            )}
          </div>
          {gigData.userId !== userInfo?.id && (
            <div className=" flex items-center justify-center mt-5">
              <button className=" w-5/6 hover:bg-gray-500 py-1 border border-gray-500 px-5 text-gray-400 hover:text-white transition-all duration-300 text-lg rounded font-bold">
                Contact Me
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Pricing;
