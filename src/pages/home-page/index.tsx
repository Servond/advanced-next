import axios from "axios";

import Link from "next/link";
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
    const response = await fetch("http://localhost:7001/user", {
      next: {
        revalidate: 5,
      },
    });
    const parse = await response.json();

    return parse;
  } catch (err) {
    console.log(err);
  }
}

export default async function HomePage() {
  const users: IUser[] = await fetchUsers();
  return (
    <div className="flex flex-col justify-center justify-items-center p-5">
      {users?.map((user) => (
        <Link
          href={`/detail/${user.id}`}
          key={user.id}
          className="border border-black p-4 mb-[20px]"
        >
          <div>{user.email}</div>
          <div>{user.firstname}</div>
          <div>{user.password}</div>
        </Link>
      ))}
      <ButtonServer />
    </div>
  );
}
