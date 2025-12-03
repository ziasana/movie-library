import {useNavigate, useParams} from "react-router-dom";
import {type FormEvent, useEffect, useState} from "react";
import type {Movie} from "../../type/movie.ts";
import {editMovie, getMovieById} from "../../api/movies.ts";

export default function EditMovie() {
    const {id} = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }

        getMovieById(id).then(setMovie)


    }, [id])


    function handleEdit(event: FormEvent) {
        event?.preventDefault();

        if (!movie || !id) {
            return;
        }
        editMovie(movie).then(() => navigate("/movie"));

    }

    if (!movie) {
        return <p>Loading movie...</p>;
    }
    return (

        <>
            <form onSubmit={handleEdit}
                  className="max-w-md bg-white p-6 rounded shadow space-y-4">
                <div>

                    <label className="block mb-1 font-medium">
                        Title
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setMovie({...movie, title: e.target.value})}
                            value={movie.title || ""}
                            name={"title"}/>
                    </label>
                </div>
                <div>

                    <label className="block mb-1 font-medium">
                        Genre
                        <input
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setMovie({...movie, genre: e.target.value})}
                            name={"genre"}
                            value={movie.genre || ""}/>
                    </label>
                </div>
                <button type={"submit"}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >Save edit</button>
            </form>
        </>
    )


}