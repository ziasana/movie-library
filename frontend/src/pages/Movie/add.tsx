import { useState } from "react";
import type {Movie} from "../../type/movie.ts";
import {addMovie} from "../../api/movies.ts";
import * as React from "react";

export default function Add() {
    const [formData, setFormData] = useState<Movie>({id: "", title: "", genre: ""});
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Form submitted:\nTitle: ${formData?.title}\nGenre: ${formData?.genre}`);
        setFormData({ id: "", title: "", genre: "" });
         addMovie(formData).then((result) => {
             setIsSaved(true);
             console.log("Movie added", result, isSaved);
         })

    };

    return (
        <main className="flex-grow container mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6">Add New Movie!</h2>

            <form
                onSubmit={handleSubmit}
                className="max-w-md bg-white p-6 rounded shadow space-y-4"
            >
                <div>
                    <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="genre" className="block mb-1 font-medium">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
