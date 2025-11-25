import { useEffect, useState } from "react";
import {getMovies, type MovieDTO} from "../api/movies.ts";
import MovieCard from "../components/MovieCard.tsx";
import {useNavigate} from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        getMovies().then(setMovies);
    }, []);

    function handleMovieClick(publicId:string) {
        navigate(`/movies/${publicId}`);
    }

    return (
        <>
            <h1>Movie Library</h1>


                {movies.map((m) => (
                    <div style={{ padding: 20 }} key={m.publicId}>
                        <MovieCard key={m.publicId} onClick={() => handleMovieClick(m.publicId)} publicId={m.publicId} title={m.title} genre={m.genre}></MovieCard>
                    </div>

                ))}

        </>

    );
}
