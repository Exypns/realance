import React from "react";

function Companies() {
  return (
    <div className=" flex items-center justify-center text-gray-500 text-2xl font-bold min-h-[11vh]">
      Trusted by: &nbsp;
      <ul>
        {[1, 2, 3, 4, 5].map((num) => (
          <li key={num} className="relative h-[4.5.rem] w-[]"></li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
