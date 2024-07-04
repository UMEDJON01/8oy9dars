import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../app/userSlice";
import toast from "react-hot-toast";

export const useGoogle = () => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        toast.success(`Welcome ${user.displayName}`);
        dispatch(login(user));
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return { handleGoogle };
};
