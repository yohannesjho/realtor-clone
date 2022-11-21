import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, signInWithEmailAndPassword,signIn} from "firebase/auth"
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { showPassword, setShowPassword } = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate()
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  

  async function onSubmit(e){
    e.preventDefault()
    
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
    if(userCredential.user){
       navigate("/")
    }
      
    } catch (error) {
      toast.error("Bad user  Credential")
      console.log(error.message)
    }


  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mt-6 ">sign in</h1>
      <div className="flex justify-center  flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://media.istockphoto.com/id/1327847528/photo/young-hispanic-couple-doing-heart-symbol-with-fingers-and-holding-key-of-new-home.jpg?b=1&s=170667a&w=0&k=20&c=GIhjhtYYo90AlfqFT4wHyVGmI45AJ6b0fNi6cIQAqAA="
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full  md:w-[67%] lg:w-[40%] lg:ml-20">
          <form  onSubmit={onSubmit}>
            <input
              className="w-full px-4 py-2 text-gray-700 text-xl bg-white border-gray-700 rounded-sm transition ease-in-out"
              type="email"
              id="email"
              value={email}
              placeholder="Email Address"
              onChange={onChange}
            />
            <div className="relative  my-6">
              <input
                className="w-full px-4 py-2 text-gray-700 text-xl bg-white border-gray-700 rounded-sm transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />

              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Don't have an account?
                <Link
                  to="/Sign-Up"
                  className="text-red-600 hover:text-red-800 transition duration ease-in-out"
                >
                  Register
                </Link>
              </p>
              <p className="text-blue-600 hover:text-blue-800 transition duration 500ms ease-in-out">
                <Link to="/forgot-Password">Forgot Password?</Link>
              </p>
            </div>
            <button className="w-full bg-blue-600 px-6 py-3 font-medium uppercase text-white hover:bg-blue-700 active:bg-blue-900">
            sign in
          </button>
          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center  uppercase semi-bold">or</p>
          </div>
          <OAuth/>
          </form>
         
        </div>
      </div>
    </section>
  );
}
