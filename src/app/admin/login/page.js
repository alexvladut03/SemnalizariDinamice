import CustomForm from "@/components/auth/authForm";
import Image from "next/image";
import React from "react";

const LoginAdmin = () => {
  return (
    <main className=" h-svh flex items-center justify-center">
      <div className="border-2 border-black rounded-[25px] p-6 w-[400px] h-[400px] flex flex-col">
        <Image
          src="/logo.png"
          alt="ABC Control"
          width={90}
          height={90}
          className="text-center mx-auto mb-4"
        />
        <CustomForm />
      </div>
    </main>
  );
};

export default LoginAdmin;
