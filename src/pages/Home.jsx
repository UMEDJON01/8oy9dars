import React from "react";
import { Form } from "react-router-dom/dist";
import { useActionData } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import FormInput from "../components/FormInput";
import TodosList from "../components/TodosList";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let complet = formData.get("complet");
  return { title, complet };
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
            lebal="Add title"
            name="title"
            type="text"
            plecholder="Learn books"
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
