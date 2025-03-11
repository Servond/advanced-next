"use client";

import { Formik, Form, Field, FormikProps } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";

import { onLogin } from "@/lib/redux/features/authSlice";

import LoginSchema from "./schema";
import ILogin from "./type";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const login = async (values: ILogin) => {
    try {
      const { data } = await axios.get(
        `http://localhost:7001/user?email=${values.email}&password=${values.password}`
      );
      console.log(data);

      if (data.length === 0) throw new Error("Email atau Password salah");

      dispatch(
        onLogin({
          user: {
            email: data[0].email,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
          },
          isLogin: true,
        })
      );

      alert("Login Success");
      router.push("/");
    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { resetForm }) => {
          login(values);
          resetForm();
        }}
      >
        {(props: FormikProps<ILogin>) => {
          const { values, handleChange, touched, errors } = props;

          return (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>Email: </label>
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.email && errors.email ? (
                  <div className="text-red-500">{errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label>Password: </label>
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.password && errors.password ? (
                  <div className="text-red-500">{errors.password}</div>
                ) : null}
              </div>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
