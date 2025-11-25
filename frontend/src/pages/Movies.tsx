import { useEffect, useState } from "react";
import { getMovies, type MovieDTO } from "../api/movies.ts";
import MovieCard from "../components/MovieCard.tsx";
import {useNavigate} from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState<MovieDTO[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovies()
            .then(setMovies)
            .finally(() => setLoading(false));
    }, []);


    function handleMovieClick(publicId:string) {
        navigate(`/movies/${publicId}`);
    }
  
    if (loading) {
        return (
            <div style={{ padding: 20, textAlign: "center" }}>
                Loading movies...
            </div>
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                Movie Library
            </h1>

            <div className="movies-grid">
                {movies.map((m) => (
                    <MovieCard
                       onClick={() => handleMovieClick(m.publicId)}
                      publicId={m.publicId}
                        key={m.id}
                        title={m.title}
                        genre={m.genre}
                    />
                ))}
            </div>
        </div>
    );
}
