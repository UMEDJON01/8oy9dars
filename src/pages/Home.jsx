import React from "react";
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
import FormInput from "../components/FormInput";
import TodosList from "../components/TodosList";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let complet = formData.get("complet");
  let firstName = formData.get("firstName");
  let lastName = formData.get("lastName");
  let age = formData.get("age");
  return { title, complet, firstName, lastName, age };
};

function Home() {
  return (
    <div className="align-content grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
      <div className="p-16">
        <Form
          method="post"
          className="flex items-center justify-center flex-col w-72 py-10"
        >
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
            size="input"
          />
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
            size="input"
          />
          <FormInput
            label="Age"
            name="age"
            type="number"
            placeholder="30"
            size="input"
          />
          <FormInput
            label="Add title"
            name="title"
            type="text"
            placeholder="Learn books"
            size="input"
          />
          <div className="form-control mt-5">
            <label className="cursor-pointer label gap-10">
              <span className="label-text">Completed</span>
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-accent"
                name="complet"
              />
            </label>
          </div>
          <button className="btn btn-primary w-full mt-5">Add</button>
        </Form>
      </div>
      <div className="flex flex-col my-10 gap-20">
        <TodosList />
      </div>
    </div>
  );
}

export default Home;
