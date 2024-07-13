import UserForm from "@/components/admin/forms/userForm";
import React from "react";
import { register } from "../../../../../../actions/user";

const CreeazaUser = () => {
  const formData = {
    name: "",
    username: "",
    password: "",
  };

  return (
    <div>
      <UserForm formData={formData} action={register} />
    </div>
  );
};

export default CreeazaUser;
