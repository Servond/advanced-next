"use client";

import axios from "axios";

export default function ButtonServer() {
  const register = async () => {
    try {
      await axios.post("http://localhost:7001/user", {
        firstname: "test-server",
        lastname: "test-server",
        email: "test@gmail.com",
        password: "!Asd1234",
      });
    } catch (err) {
      alert((err as any).message);
    }
  };

  return <button onClick={register}>add user</button>;
}
