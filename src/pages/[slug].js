import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { FaChevronLeft, FaHeart } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;
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
      `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${slug}`,
      {
        headers: {
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      props: {
        food: res.data.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function FoodDetail({ food }) {
  return (
    <div className="w-full h-screen flex items-center justify-center py-2">
      <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg w-full mx-2 md:m-0 md:w-max">
        <div className="flex items-center">
          <Link href="/">
            <FaChevronLeft className="text-2xl text-gray-500 ml-5" />
          </Link>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Food database
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Details and informations about food.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div
            className="w-full h-56 bg-center bg-cover"
            style={{
              backgroundImage: `url('${food.imageUrl}')`,
            }}></div>
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {food.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ingredients</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  {food.ingredients.map((ingredient, i) => (
                    <li key={i}>- {ingredient}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Rating</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-4">
                <div className="flex gap-2">
                  {Array.from({ length: Math.floor(food.rating) }).map(
                    (_, i) => (
                      <IoStar className="text-yellow text-lg" key={i} />
                    )
                  )}
                  {Array.from({ length: 5 - Math.floor(food.rating) }).map(
                    (_, i) => (
                      <IoStar className="text-silver text-lg" key={i} />
                    )
                  )}
                </div>
                <span className="font-medium">({food.rating}/5)</span>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Likes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-2">
                <FaHeart className="text-red" />
                <p className="font-medium">{food.totalLikes}</p>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {food.description}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
