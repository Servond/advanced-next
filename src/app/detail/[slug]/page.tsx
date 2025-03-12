"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  avatar?: string;
}

export default function Detail({ params }: { params: { slug: string } }) {
  const [user, setUser] = useState<IUser | null>(null);

  async function fetchUser() {
    try {
      const param = await params;
      const res = await fetch(`http://localhost:7001/user?id=${param.slug}`);
      const parse = await res.json();

      setUser(parse[0]);
    } catch (Err) {
      console.log(Err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Image src={user.avatar || ""} height={30} width={30} alt="avatar" />
          <div>{user.email}</div>
          <div>{user.firstname}</div>
          <div>{user.password}</div>
        </div>
      ) : null}
    </div>
  );
}
