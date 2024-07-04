import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { LuLogIn } from "react-icons/lu";
import { IoLogoGoogle } from "react-icons/io5";
import { useLogin } from "../hooks/useLogin";
import { useGoogle } from "../hooks/useGoogle";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let password = formData.get("password");
  let email = formData.get("email");
  return { email, password };
};

function Login() {
  let data = useActionData();
  let { isPending, loginUser, resetPassword } = useLogin();
  let { handleGoogle } = useGoogle();

  let [sendEmail, setSendEmail] = useState(true);

  useEffect(() => {
    if (data) {
      let { email, password } = data;
      if (email && password) {
        loginUser(data);
      } else if (email && password === null) {
        resetPassword(data);
      }
    }
  }, [data]);

  return (
    <>
      <div
        className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url("/bg-registor.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center gap-5 card glass py-5 px-16 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg">
            <h1 className="font-bold text-4xl uppercase text-center text-white">
              Login
            </h1>
            <Form
              method="post"
              className="flex items-center justify-center flex-col w-72"
            >
              <FormInput
                type="email"
                lebal="Email"
                plecholder="example@gmail.com"
                name="email"
              />
              {sendEmail && (
                <FormInput
                  type="password"
                  lebal="Password"
                  name="password"
                  plecholder="••••••••"
                />
              )}
              {sendEmail ? (
                isPending ? (
                  <button disabled className="btn btn-disabled w-full mt-5">
                    Loading...
                  </button>
                ) : (
                  <button className="btn btn-primary w-full mt-5">
                    <LuLogIn className="inline-block mr-2" />
                    Login
                  </button>
                )
              ) : (
                <button className="btn btn-primary w-full mt-5">
                  <LuLogIn className="inline-block mr-2" />
                  Send password
                </button>
              )}
            </Form>
            {sendEmail && (
              <button
                onClick={() => handleGoogle()}
                className="btn btn-accent w-72"
              >
                <IoLogoGoogle className="inline-block mr-2" />
                Google
              </button>
            )}
            <p className="text-white">
              Don't have an account?{" "}
              <Link className="link link-primary" to="/registor">
                Register
              </Link>
            </p>
            <p className="text-white">
              Forgot your password?{" "}
              <button
                onClick={() => setSendEmail(!sendEmail)}
                className="link link-info"
              >
                {sendEmail ? "Send Password" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
