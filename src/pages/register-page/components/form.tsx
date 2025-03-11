"use client";

import { Formik, Form, Field, FormikProps } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";

import RegisterSchema from "./schema";
import IRegister from "./type";

export default function RegisterForm() {
  const router = useRouter();
  const initialValues: IRegister = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  };

  const register = async (values: IRegister) => {
    try {
      await axios.post("http://localhost:7001/user", values);

      alert("Register Success");

      router.push("/login");
    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, { resetForm }) => {
          register(values);
          resetForm();
        }}
      >
        {(props: FormikProps<IRegister>) => {
          const { values, handleChange, touched, errors } = props;

          return (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label>First Name: </label>
                <Field
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  value={values.firstname}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.firstname && errors.firstname ? (
                  <div className="text-red-500">{errors.firstname}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label>Last Name: </label>
                <Field
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  value={values.lastname}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.lastname && errors.lastname ? (
                  <div className="text-red-500">{errors.lastname}</div>
                ) : null}
              </div>
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
