import React from "react";
import NavBar from "./NavBar";
import { getSession } from "@/lib/getSession";
import { logout } from "../../../actions/user";

const NavbarLogin = async () => {
  const session = await getSession();

  return (
    <div>
      <p>{session?.user?.name}</p>
      <form action={logout}>
        <button type="submit">Sign Out</button>
      </form>
      <NavBar />
    </div>
  );
};

export default NavbarLogin;
