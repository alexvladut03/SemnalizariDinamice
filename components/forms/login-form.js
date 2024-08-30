"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa";
import { BsKeyFill } from "react-icons/bs";
import { login } from "@/utils/actions/auth/login";
import { useAction } from "next-safe-action/hooks";
import { loginSchema } from "@/utils/zod";
import { useToast } from "../ui/use-toast";
import { DisplayServerActionResponse } from "../custom ui/display-server-actions-response";

const LoginForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { execute, result, isExecuting } = useAction(login, {
    onSuccess: ({ data }) => {
      toast({
        variant: "default",
        title: "Succes",
        description: "Te-ai logat cu succes!",
        duration: 3000,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const username = form.getValues("username");
        const password = form.getValues("password");
        execute({ username, password });
      }}
      className="space-y-8 text-white"
    >
      <div className="bg-black flex items-center border-b-2">
        <input
          {...form.register("username")}
          placeholder="Username"
          className="w-full mt-4 bg-black text-white placeholder-white outline-none"
        />
        <FaUser className="text-white" />
      </div>
      <p className="text-red-500">
        {result.validationErrors?.username._errors[0]}
      </p>
      <div className="bg-black flex items-center border-b-2">
        <input
          type="password"
          {...form.register("password")}
          placeholder="Password"
          className="w-full mt-4 bg-black text-white placeholder-white outline-none"
        />
        <BsKeyFill className="text-white rotate-180 text-xl" />
      </div>
      <p className="text-red-500">
        {result.validationErrors?.username._errors[0]}
      </p>
      <button
        className="bg-amber-500 text-white rounded-xl text-center w-full py-2 font-semibold"
        type="submit"
        disabled={isExecuting}
      >
        {isExecuting ? "Se incarca..." : "Logeaza-te"}
      </button>
      {!result.validationErrors && (
        <DisplayServerActionResponse result={result} />
      )}
    </form>
  );
};

export default LoginForm;
