import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard.tsx";
import {type Movie} from "../../type/movie.ts";
import {getMovies} from "../../api/movies.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Index() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovies()
            .then(setMovies)
            .finally(() => setLoading(false));
    }, []);

    function loadMovies() {
        axios.get("/api/movies")
            .then((res) => setMovies(res.data));
    }
    useEffect(() => {
        loadMovies();
    }, []);

    function fetchMovies() {
        axios.get("/api/movies")
            .then(response => setMovies(response.data));
    }

    function handleMovieClick(id:string) {
        navigate(`/movies/${id}`);
    }

    function handleDeleteMovie(id: string) {
        const answer = window.confirm("Willst du diesen Film wirklich löschen?");
        if (!answer) {
            return;
        }

        axios.delete("/api/movies/" + id)
            .then(() => {
                fetchMovies();
            })
            .catch(() => alert("Löschen fehlgeschlagen"));
    }

    function handleEditMovie(id:string) {
        navigate(`/movies/edit/${id}`)
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
                       onCardClick={() => handleMovieClick(m.id)}
                       onDelete={() => handleDeleteMovie(m.id)}
                       onEdit={() => handleEditMovie(m.id)}
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
