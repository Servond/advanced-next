import axios from "axios";

import ButtonServer from "./components/button";

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

async function fetchUsers() {
  try {
    const { data } = await axios.get("http://localhost:7001/user");

    return data;
  } catch (err) {
    console.log(err);
  }
}

export default async function HomePage() {
  const users: IUser[] = await fetchUsers();
  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <div>{user.email}</div>
          <div>{user.firstname}</div>
          <div>{user.password}</div>
        </div>
      ))}
      <ButtonServer />
    </div>
  );
}
