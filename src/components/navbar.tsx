"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { deleteCookie } from "cookies-next";

import { onLogout } from "@/lib/redux/features/authSlice";

export default function Navbar() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="h-[50px] flex justify-between p-4">
      <Link href={"/"}>
        <div>
          {auth.isLogin ? (
            <div>Hello, {auth.user.firstname}</div>
          ) : (
            <div>Hello, User</div>
          )}
        </div>
      </Link>
      <div>
        {auth.isLogin ? (
          <div>
            <button
              onClick={() => {
                dispatch(onLogout());
                deleteCookie("access_token");
              }}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <button onClick={() => router.push("/login")}>Sign In</button>
            <button onClick={() => router.push("/register")}>Sign Up</button>
          </div>
        )}
      </div>
    </div>
  );
}
