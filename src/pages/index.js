import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { IoLogOut, IoStar } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Fragment } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  const token = getCookie("token", { req: ctx.req, res: ctx.res });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const res = await axios.get(
      "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
      {
        headers: {
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      props: {
        foods: res.data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default function Home({ foods }) {
  const router = useRouter();
  const logout = () => {
    deleteCookie("token");
    router.replace("/login");
  };

  return (
    <Fragment>
      <div className="flex justify-between shadow-lg px-10 py-4 w-screen fixed bg-white">
        <h1 className="text-4xl font-bold tracking-wider text-center">
          <span className="font-guerrilla">
            <span className="text-red">Taste</span>&nbsp;
            <span className="text-dark">Food</span>
          </span>
        </h1>
        <button
          className="flex items-center gap-2 bg-red text-white rounded-xl px-3 py-1"
          onClick={logout}>
          <p className="hidden md:inline-block">Logout</p>
          <IoLogOut className="text-2xl" />
        </button>
      </div>
      <div className="py-7 px-10 pt-12">
        <div className="mt-10 mb-2 text-center w-[80%] md:w-[60%] mx-auto">
          <h1 className="text-4xl font-bold tracking-wider font-guerrilla mb-5">
            <span className="text-dark">Our Taste</span>&nbsp;
            <span className="text-red">Food</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {foods.data.map((food, i) => (
            <div
              className="border-2 shadow-md rounded-xl overflow-hidden flex flex-col gap-2 pb-3"
              key={i}>
              <div
                className="w-full h-52 bg-center bg-cover"
                style={{
                  backgroundImage: `url('${food.imageUrl}')`,
                }}></div>
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: Math.floor(food.rating) }).map((_, i) => (
                  <IoStar className="text-yellow text-lg" />
                ))}
                {Array.from({ length: 5 - Math.floor(food.rating) }).map(
                  (_, i) => (
                    <IoStar className="text-silver text-lg" />
                  )
                )}
              </div>
              <h1 className="text-dark font-guerrilla text-center text-2xl">
                {food.name}
              </h1>
              <p className="text-center text-slate-400 inline-block w-[80%] mx-auto">
                {food.description}
              </p>
              <p className="text-center text-red inline-block w-[80%] mx-auto">
                Ingredients : {food.ingredients.join(", ")}
              </p>
              <div className="flex items-center justify-evenly gap-3 w-[80%] mx-auto mt-1">
                <Link
                  href={`/${food.id}`}
                  className="flex items-center gap-3 border-2 border-silver py-1 rounded-full w-full justify-center">
                  <FiEye className="text-xl" />
                  <p className="font-medium text-lg">Show Detail</p>
                </Link>
                <button
                  className={`flex items-center gap-2 py-1 px-2 rounded-lg ${
                    food.isLike ? "bg-red text-white" : "bg-silver text-dark"
                  }`}>
                  <p className="text-lg">{food.totalLikes}</p>
                  <FaRegHeart className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
