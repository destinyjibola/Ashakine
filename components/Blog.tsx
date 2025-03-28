import React from "react";
import Link from "next/link";
import blog1 from "../assets/images/uiproduct.jpg"; 
import blog2 from "../assets/images/uiproduct.jpg";
import blog3 from "../assets/images/uiproduct.jpg";
import { Button } from "./ui/button";
import Image from "next/image";

const blogs = [
  {
    id: 1,
    title: "How to Write a UX Research Plan That Stakeholders Love",
    excerpt: "Learn the 5 key sections every research plan needs to get buy-in.",
    image: blog1.src,
    date: "May 15, 2024",
  },
  {
    id: 2,
    title: "Common Pitfalls in User Interviews (And How to Avoid Them)",
    excerpt: "Even seasoned researchers make these mistakes. Here’s how to fix them.",
    image: blog2.src,
    date: "April 28, 2024",
  },
  {
    id: 3,
    title: "Transitioning to UX Research from Academia: A Step-by-Step Guide",
    excerpt: "Leverage your research skills in a new industry.",
    image: blog3.src,
    date: "March 10, 2024",
  },
];

export default function BlogPreview() {
  return (
    <section className="container-spacing py-[6rem] bg-white">
      <h2 className="primaryheading text-primary-green-200 text-center mb-12">
        Latest from the Blog
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:px-[12rem]">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <div className="border border-custom-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
              <Image
                src={blog.image}
                alt={blog.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-custom-gray-100">{blog.date}</p>
                <h3 className="text-lg font-medium mt-2 text-primary-green-100">
                  {blog.title}
                </h3>
                <p className="paragraph-3 mt-2 text-primary-green-200">
                  {blog.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/blog">
          <Button
            variant="outline"
            className="py-6 text-lg px-8 border border-primary-green-300 hover:bg-primary-green-400 transition"
          >
            View All Posts
          </Button>
        </Link>
      </div>
    </section>
  );
}