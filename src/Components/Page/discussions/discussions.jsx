import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

export default function Discussions() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: discussions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["discussions"],
    queryFn: async () => {
      const res = await fetch("/discussions.json");
      return res.json();
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500">Failed to load discussions.</p>;

  const categories = ["All", ...new Set(discussions.map((d) => d.category))];

  const filteredDiscussions =
    selectedCategory === "All"
      ? discussions
      : discussions.filter((d) => d.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DynamicTitle title="💬 Community Discussions" />

      {/* Category Filter */}
      <div className="flex gap-3 mb-4 my-5">
        {categories.map((category, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              selectedCategory === category ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((discussion, i) => (
            <div key={i} className="p-4 bg-base-200 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{discussion.title}</h3>
              <p className="text-sm text-gray-500">
                Replies: {discussion.replies} | Last reply:{" "}
                {discussion.lastReply}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No discussions found.</p>
        )}
      </div>
    </div>
  );
}
