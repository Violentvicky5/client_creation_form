"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleRoute = () => {
    router.push("/client-creation-form");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
     
      <button
        type="button"
        onClick={handleRoute}
        className=" w-25 h-12.5 bg-blue-500 text-white rounded text-xs"
      >
        Create client
      </button>
    </div>
  );
};

export default Page;
