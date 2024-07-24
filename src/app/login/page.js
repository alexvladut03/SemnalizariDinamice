import CustomForm from "@/components/auth/authForm";
import Image from "next/image";
import React from "react";

const LoginAdmin = () => {
  return (
    <main className=" h-screen flex items-center justify-center  bg-gradient-to-tl from-amber-400 from-5% via-amber-500 via-20% to-black to-95%">
      <div className="bg-black rounded-3xl p-6 w-[400px] h-[400]  shadow-md hover:shadow-white ">
        <Image
          src="/Logo.png"
          alt="Logo..."
          width={80}
          height={80}
          className="text-center mx-auto mb-4"
        />
        <CustomForm />
      </div>
    </main>
  );
};

export default LoginAdmin;
