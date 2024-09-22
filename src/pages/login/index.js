import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export async function getServerSideProps(ctx) {
  const token = getCookie("token", { req: ctx.req, res: ctx.res });

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/login",
        { email: e.target.email.value, password: e.target.password.value },
        {
          headers: {
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
            "Content-Type": "application/json",
          },
        }
      );
      setCookie("token", res.data.token);
      toast.success(res.data.message);
      router.replace("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col mx-auto overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 bg-silver/90 hidden md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <span className="font-guerrilla">
              <span className="text-red">Taste</span>&nbsp;
              <span className="text-dark">Food</span>
            </span>
          </div>
          <p className="mt-6 font-normal text-center text-slate-600 md:mt-0">
            With the power of K-WD, you can now focus only on functionaries for
            your digital products, while leaving the UI design on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link href="#" className="underline">
              Get Started!
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-slate-600">
            Read our{" "}
            <a href="#" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              conditions
            </a>
          </p>
        </div>
        <div className="p-5 w-full bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                id="email"
                autoFocus
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-500">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline focus:text-blue-800">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="remember"
                className="text-sm font-semibold text-gray-500">
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-red rounded-md shadow">
                Log in
              </button>
            </div>
            <p className="flex md:hidden flex-col items-center justify-center mt-10 text-center">
              <span>Don't have an account?</span>
              <Link href="#" className="underline">
                Get Started!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
