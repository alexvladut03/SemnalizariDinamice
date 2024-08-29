import UserForm from "@/components/forms/user-form";
import { createUser } from "@/utils/actions/user/create-user";

const CreeazaUser = () => {
  const formData = {
    name: "",
    username: "",
    password: "",
  };

  return (
    <div>
      <UserForm formData={formData} action={createUser} />
    </div>
  );
};

export default CreeazaUser;
