import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useCollection } from "../hooks/useCollection";
import { errorInputAction } from "../app/userSlice";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";

function TodosList() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);
  const dispatch = useDispatch();

  const addTodo = async (newTodo) => {
    try {
      await addDoc(collection(db, "todos"), { ...newTodo, uid: user.uid });
      toast.success(`Added todo: ${newTodo.title}`);
    } catch (error) {
      dispatch(errorInputAction(error.message));
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      toast.error("Deleted todo");
    } catch (error) {
      toast.error("Error deleting todo");
    }
  };

  const toggleComplete = async (id, currentCompletionStatus) => {
    try {
      await updateDoc(doc(db, "todos", id), {
        complet: !currentCompletionStatus,
      });
      if (!currentCompletionStatus) {
        toast("Good Job!", {
          icon: "👏",
        });
      } else {
        toast.error("Marked as incomplete");
      }
    } catch (error) {
      toast.error("Error updating todo");
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data &&
          data.map((todo) => (
            <div
              key={todo.id}
              className={`card bg-base-200 shadow-xl relative ${
                todo.complet ? "opacity-50" : ""
              }`}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-bold mb-2">
                  {todo.title}
                </h2>
                {todo.firstName && <p>First Name: {todo.firstName}</p>}
                {todo.lastName && <p>Last Name: {todo.lastName}</p>}
                {todo.age && <p>Age: {todo.age}</p>}
                {todo.description && <p>{todo.description}</p>}
                {todo.dueDate && (
                  <p className="text-sm text-gray-500">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => toggleComplete(todo.id, todo.complet)}
                    className={`btn ${
                      todo.complet ? "btn-accent" : "btn-primary"
                    }`}
                  >
                    {todo.complet ? "Completed" : "Check Out"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        {!data && <span className="loading loading-lg"></span>}
      </div>
    </div>
  );
}

export default TodosList;
