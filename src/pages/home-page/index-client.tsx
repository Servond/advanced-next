"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function HomePage() {
  const [users, setUsers] = useState<IUser[]>([]);

  async function fetchUsers() {
    try {
      const { data } = await axios.get("http://localhost:7001/user");

      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <div>{user.email}</div>
          <div>{user.firstname}</div>
          <div>{user.password}</div>
        </div>
      ))}
    </div>
  );
}
