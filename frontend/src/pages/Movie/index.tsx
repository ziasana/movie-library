import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard.tsx";
import {type Movie} from "../../type/movie.ts";
import {getMovies} from "../../api/movies.ts";
import {useNavigate} from "react-router-dom";

export default function Index() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovies()
            .then(setMovies)
            .finally(() => setLoading(false));
    }, []);

    function handleMovieClick(id:string) {
        navigate(`/movies/${id}`);
    }

    if (loading) {
        return (
            <div style={{ padding: 20, textAlign: "center" }}>
                Loading movies...
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="pt-20">
            <h1 className="text-blue-400 2xl">  Movie Library</h1>
            <div className="movies-grid mt-4">
                {movies.map((m) => (
                    <MovieCard
                       onClick={() => handleMovieClick(m.id)}
                        id={m.id}
                        key={m.id}
                        title={m.title}
                        genre={m.genre}
                    />
                ))}
            </div>
        </div>
        </div>
    );
}
