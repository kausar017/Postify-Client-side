import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../Loader/Loader";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

export default function PopularPostsSection() {
  const {
    data: popular = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const res = await fetch("/popular.json");
      return res.json();
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  // console.log(fqdata);
  console.log(popular);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <DynamicTitle title="🔥 Trending Posts" />
      <div className="trending-posts container mx-auto px-4 py-8">
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-6">
          {Array.isArray(popular) && popular.length > 0 ? (
            popular.map((post, i) => (
              <div
                key={i}
                className="post rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-800 mb-2">
                    {post?.title}
                  </h3>
                  <p className="text-gray-900 mb-4">{post?.description}</p>
                  <p className="text-sm text-gray-900 mb-4">
                    👀 {post?.views} | ❤️ {post?.likes} | 💬 {post?.comments}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    ✍️ {post?.author} | 📅 {post?.date}
                  </p>
                  <button className="btn bg-pink-600/60 w-full mt-4">
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">
              🚀 No popular posts found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
