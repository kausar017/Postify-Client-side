import React from "react";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

export default function FAQHelpSection() {

  const {
    data: fqdata = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fqa"],
    queryFn: async () => {
      const res = await fetch("fqa.json");
      return res.json();
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  // console.log(fqdata);

  return (
    <>
      <DynamicTitle title="FAQ/Help Section" />

      <div className="py-5 md:px-3">
        {fqdata?.map((item, i) => (
          <div key={i} className="w-full max-w-6xl mx-auto pt-5">
            <div tabIndex={0} className="collapse bg-base-200">
              <div className="collapse-title text-xl font-medium">
                {item?.question}
              </div>
              <div className="collapse-content">
                <p>{item?.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
