import Image from "next/image";
import React, { useEffect, useState } from "react";
import community from "../assets/icons/Community.svg";
import { Category } from "@/lib/types";
import axios from "axios";
import Link from "next/link";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/getCategory`
        );
        setCategories(response.data.data);
      } catch (err: any) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="donation" className="container-spacing section-spacing">
      <h2 className="primaryheading mb-10 text-custom-gray">Categories</h2>

      {loading && <p className="text-center text-gray-500">Loading categories...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
          {categories.map((category) => (
            <Link href={`/discovery?category=${category._id}`} key={category._id}>
              <div className="flex items-center space-x-3">
                <Image src={community.src} width={50} height={50} alt={category.category} />
                <h2 className="secondaryheading-5">{category.category}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
