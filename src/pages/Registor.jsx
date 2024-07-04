// Registor.jsx
import React, { useEffect } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { IoLogoGoogle, IoCreate } from "react-icons/io5";
import { useRegister } from "../hooks/useRegister";
import { useGoogle } from "../hooks/useGoogle";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const photoURL = formData.get("photoURL");
  const password = formData.get("password");
  const email = formData.get("email");
  return { email, password, photoURL, displayName };
};

function Registor() {
  const userData = useActionData();
  const { isPending, register } = useRegister(); // useRegister hook
  const { handleGoogle } = useGoogle();

  useEffect(() => {
    if (userData) {
      const { email, password, photoURL, displayName } = userData;
      register({ email, password, photoURL, displayName });
    }
  }, [userData, register]);

  return (
    <>
      <div
        className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url("/bg-login.jpg")' }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center gap-5 card glass py-5 px-16 bg-white bg-opacity-80 backdrop-blur-lg rounded-lg shadow-lg">
            <h1 className="font-bold text-4xl uppercase text-center text-white">
              Register
            </h1>
            <Form
              method="post"
              className="flex items-center justify-center flex-col w-72"
            >
              <FormInput
                type="text"
                name="displayName"
                lebal="Display Name"
                plecholder="Alex"
              />
              <FormInput
                type="url"
                lebal="Photo URL"
                plecholder="https://example.com"
                name="photoURL"
              />
              <FormInput
                type="email"
                lebal="Email"
                plecholder="example@gmail.com"
                name="email"
              />
              <FormInput
                type="password"
                lebal="Password"
                name="password"
                plecholder="••••••••"
              />
              {!isPending ? (
                <button className="btn btn-info w-full mt-5">
                  <IoCreate className="inline-block mr-2" /> Register
                </button>
              ) : (
                <button disabled className="btn btn-disabled w-full mt-5">
                  <IoCreate className="inline-block mr-2" /> Loading..
                </button>
              )}
            </Form>
            <button onClick={handleGoogle} className="btn btn-accent w-72">
              <IoLogoGoogle className="inline-block mr-2" /> Google
            </button>
            <p className="text-white">
              Already have an account?{" "}
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registor;
