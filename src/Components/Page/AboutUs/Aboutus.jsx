import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    document.title = "Food Link | About";
  }, []);

  return (
    <div className="">
      <section className=" flex flex-col justify-center items-center min-h-[640px] ">
        <div className="container mx-auto px-6  ">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="flex flex-col md:flex-row items-center gap-8 shadow-md p-5">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src="https://www.aib.edu.au/wp-content/uploads/2019/03/form-submission-7476-toptipseffectiveteamwork.jpg"
                alt="Food Donation"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Text Content */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">
                🚀 Welcome to Postify - Your Ultimate Blogging Platform!
              </h3>
              <p className="mb-4">
                📖 Postify is an innovative blogging platform where users can
                easily share their thoughts, experiences, and stories. Our goal
                is to create an independent and interactive space for writers,
                allowing them to express themselves and connect with others.
              </p>
              <div className="mb-4">
                🌟 Our Features:
                <p>
                  ✅ User-Friendly Interface – Easily create and manage posts.
                </p>
                <p>✅ Category-Based Posts – Write blogs on various topics.</p>
                <p>
                  ✅ Comment & Feedback System – Engage directly with readers.
                </p>
                <p>
                  ✅ Security & Data Protection – We ensure the safety of user
                  information.
                </p>
              </div>
              <div>
                <p>🎯 Our Mission:</p>
                <p>
                  We aim to make Postify a platform where everyone can share
                  their content, learn new things, and connect with like-minded
                  individuals.
                </p>
                <p>🔥 Call to Action:</p>
                <p>👉 Start sharing your stories today on Postify!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
