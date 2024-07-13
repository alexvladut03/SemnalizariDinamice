import UserForm from "@/components/admin/forms/userForm";
import { getUser, updateUser } from "../../../../../../../actions/user";

const EditareUser = async ({ params }) => {
  const { id } = params;
  console.log(id);
  const utilizator = getUser.bind(null, id);

  const userData = await utilizator();

  const formData = {
    name: userData.name,
    username: userData.username,
    password: "",
  };

  const userToUpdate = updateUser.bind(null, id);

  return <UserForm formData={formData} action={userToUpdate} />;
};

export default EditareUser;
