import UserForm from "@/components/forms/user-form";
import { updateUser } from "@/utils/actions/user/update-user";
import { getUser } from "@/utils/functions/user/get-user";

const EditareUser = async ({ params }) => {
  const { id } = params;
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
