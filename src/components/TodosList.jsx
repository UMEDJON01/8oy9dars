// TodosList.jsx
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
import { useCollection, useActionData } from "../hooks/useCollection"; // useActionData import
import { errorInputAction } from "../app/userSlice";
import toast from "react-hot-toast";
import FormInput from "../components/FormInput";

function TodosList() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);
  const dispatch = useDispatch();
  const userData = useActionData(); // Using useActionData hook

  useEffect(() => {
    if (userData) {
      if (!(userData.title.trim() === "")) {
        const { title, complet } = userData;
        const newTodo = {
          title: title,
          uid: user.uid,
          complet: complet ? true : false,
        };
        addDoc(collection(db, "todos"), newTodo);
        toast.success(`Added todo: ${newTodo.title}`);
      } else {
        dispatch(errorInputAction("Title must not be empty"));
      }
    }
  }, [userData, user, dispatch]);

  const deleteTodo = (id) => {
    deleteDoc(doc(db, "todos", id));
    toast.error("Deleted todo");
  };

  const toggleComplete = (id, currentCompletionStatus) => {
    updateDoc(doc(db, "todos", id), {
      complet: !currentCompletionStatus,
    });
    if (!currentCompletionStatus) {
      toast("Good Job!", {
        icon: "👏",
      });
    } else {
      toast.error("Marked as incomplete");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
  );
}

export default TodosList;
