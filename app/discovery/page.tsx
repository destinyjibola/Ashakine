"use client";

import DonationCard from '@/components/DonationCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ProjectResponse } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import birthday from "../../assets/crowdfund/birthday.webp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
    _id: string;
    category: string;
}

const Discovery = () => {
    const [projects, setProjects] = useState<ProjectResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Default to "all"

    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryQuery = searchParams.get("category");

    // Sync selectedCategory with the query parameter
    useEffect(() => {
        if (categoryQuery) {
            setSelectedCategory(categoryQuery);
        } else {
            setSelectedCategory("all"); // Default to "all" if no query parameter
        }
    }, [categoryQuery]);

    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_APP_URL}/api/getAllPost`,
                    { headers: { "Cache-Control": "no-store" } }
                );
                setProjects(response.data.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_APP_URL}/api/getCategory`
                );
                setCategories(response.data.data);
            } catch (err: any) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    // Handle category change
    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        // Update the URL with the new category
        if (value === "all") {
            router.push("/discovery"); // Remove the category query parameter
        } else {
            router.push(`/discovery?category=${value}`);
        }
    };

    // Filter projects by selected category
    const filteredProjects = selectedCategory === "all"
        ? projects // Show all projects if "all" is selected
        : projects.filter((project) => project.categoryId?._id === selectedCategory);

    return (
        <>
            <Navbar />
            <section id="" className="container-spacing section-spacing min-h-[12rem] ">
                <h2 className='primaryheading-2'>Discovery</h2>
                <p className="paragraph-1">Explore donation and campaigns</p>

                <div className='mt-10'>
                    <div className='mb-6'>
                        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
                            <SelectTrigger className="w-[180px] bg-black text-white">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white">
                                <SelectItem
                                    value="all"
                                    className="hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white"
                                >
                                    All Categories
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category._id}
                                        value={category._id}
                                        className="hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white"
                                    >
                                        {category.category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {loading ? (
                            <p>Loading donations...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : filteredProjects.length === 0 ? ( // Check if filteredProjects is empty
                            <div className="col-span-full text-center h-[5rem] text-gray-500">
                                No projects found for the selected category.
                            </div>
                        ) : (
                            filteredProjects.map((data: ProjectResponse) => (
                                <DonationCard
                                    key={data._id}
                                    goalAmount={data.goalAmount}
                                    currentAmount={data.currentAmount}
                                    title={data.title}
                                    shortdesc={data.shortdesc}
                                    description={data.description}
                                    imageSrc={data.images[0] || birthday.src}
                                    altText={data.title}
                                    link={`/donation/${data._id}`}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Discovery;