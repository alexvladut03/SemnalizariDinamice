"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zod";
import { login } from "../../../actions/user";
import { FaUser } from "react-icons/fa";
import { BsKeyFill } from "react-icons/bs";

const CustomForm = () => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <form action={login} className="space-y-8 text-white">
      <div className="bg-black flex items-center border-b-2">
        <input
          {...form.register("username")}
          placeholder="Username"
          className="w-full mt-4 bg-black text-white placeholder-white outline-none"
        />
        <FaUser className="text-white" />
      </div>
      <p className="text-red-500">{form.formState.errors.username?.message}</p>

      <div className="bg-black flex items-center border-b-2">
        <input
          type="password"
          {...form.register("password")}
          placeholder="Password"
          className="w-full mt-4 bg-black text-white placeholder-white outline-none"
        />
        <BsKeyFill className="text-white rotate-180 text-xl" />
      </div>
      <p className="text-red-500">{form.formState.errors.password?.message}</p>
      <button
        className="bg-amber-500 text-white rounded-xl text-center w-full py-2 font-semibold"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CustomForm;
