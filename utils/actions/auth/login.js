"use server";
import { actionClient } from "@/utils/safe-action";
import { loginSchema } from "@/utils/zod";
import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export const login = actionClient
  .metadata({ actionName: "login" })
  .schema(loginSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirectTo: "/admin",
      });

      return { success: true, data: result };
    } catch (error) {
      if (isRedirectError(error)) throw error;

      if (error) {
        throw new Error("Utilizatorul sau parola sunt gresite");
      }
    }
  });
