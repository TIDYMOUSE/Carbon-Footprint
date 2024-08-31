import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth, db } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import Cookies from "js-cookie";
import { addDoc, collection } from "firebase/firestore";

const SignupForm = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, seterror] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = form;
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      Cookies.set("jwtToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        email: email,
        isAdmin: false,
      });
    } catch (error) {
      console.log(error.code);
      seterror(error.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      navigate("/dashboard");
    }
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col my-8 gap-8">
        <div className="border-black border-2 rounded-full px-6 py-3 flex items-center">
          <MdOutlineEmail className="text-xl mr-4 text-Red" />
          <input
            className="text-black bg-transparent focus:outline-none "
            type="email"
            placeholder="Email ID"
            name="email"
            id="email"
            value={form.email}
            onChange={(e) => {
              setform({ ...form, [e.target.name]: e.target.value });
            }}
          />
        </div>

        <div className="border-black border-2 rounded-full px-6 py-3 flex items-center">
          <CiLock className="mr-4 text-Red text-2xl" />
          <input
            className="text-black bg-transparent  focus:outline-none "
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={form.password}
            onChange={(e) => {
              setform({ ...form, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <button
        type="submit"
          className="bg-Black text-White rounded-full p-2 bg-secondary/90 hover:bg-secondary text-white font-bold transition-all duration-200"
        >
          Sign Up
        </button>
      </div>
      </form>
    </div>
  );
};

export default SignupForm;
