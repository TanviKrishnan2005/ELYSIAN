import React from 'react';
import blogsdata from "../../data/blogs.json";

const Blogs = () => {
  console.log(blogsdata);
  return (
    <section className="section__container blog__container">
      <h2 className="section__header">Latest from Blogs</h2>
      <p className="section__subheader">
        fashion tips for you to uplift your style game
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogsdata.map((blog, index) => (
          <div
            key={index}
            className="blog__card cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <img src={blog.imageUrl} alt="blog image" className="w-full h-64 object-cover rounded-lg" />

            <div className="blog__card__content p-4">
              <h6 className="text-sm text-gray-500">{blog.subtitle}</h6>
              <h4 className="text-lg font-semibold">{blog.title}</h4>
              <p className="text-gray-400">{blog.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
