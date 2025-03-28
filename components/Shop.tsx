import React from "react";
import Link from "next/link";
import product1 from "../assets/images/uiproduct.jpg"; // Replace with actual images
import { Button } from "./ui/button";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "UX Research Templates Bundle",
    price: "$49.99",
    description: "Interview guides, synthesis templates, and stakeholder reports.",
    image: product1.src,
  },
  {
    id: 2,
    name: "The Ultimate UX Research Course",
    price: "$199.99",
    description: "6-week cohort-based training with live feedback.",
    image: product1.src,
  },
  {
    id: 3,
    name: "1:1 Mentorship Session",
    price: "$150.00",
    description: "Personalized guidance for your research challenges.",
    image: product1.src,
  },
];

export default function ShopPreview() {
  return (
    <section className="container-spacing py-[6rem] bg-primary-green-400">
      <h2 className="primaryheading text-primary-green-200 text-center mb-12">
        Shop Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-medium text-primary-green-100">
              {product.name}
            </h3>
            <p className="paragraph-3 mt-2 text-primary-green-200">
              {product.description}
            </p>
            <p className="font-bold mt-4 text-primary-green-50">{product.price}</p>
            <Link href={`/shop/${product.id}`}>
              <Button className="w-full mt-4 py-4 bg-primary-green-50 hover:bg-primary-green-100 text-white">
                Add to Cart
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}