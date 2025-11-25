import { useEffect, useState } from "react";
import {getMovies, type MovieDTO} from "../api/movies.ts";
import MovieCard from "../components/MovieCard.tsx";

export default function Movies() {
    const [movies, setMovies] = useState<MovieDTO[]>([]);

    useEffect(() => {
        getMovies().then(setMovies);
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Movie Library</h1>

            <ul>
                {movies.map((m) => (
                    <li key={m.genre + m.title}>
                        <MovieCard title={m.title} genre={m.genre}></MovieCard>
                    </li>
                ))}
            </ul>
        </div>
    );
}
