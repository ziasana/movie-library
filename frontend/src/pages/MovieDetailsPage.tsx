import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import type {Movie} from "../type/movie.ts";

export default function MovieDetailsPage() {
const {publicId} = useParams();
const [movie,setMovie] = useState<Movie |null>(null);
const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!publicId) {
            return;
        }

       axios.get(`/api/movies/${publicId}`)
           .then(res => setMovie(res.data))
           .catch(err => console.log(err))
           .finally(() => setIsLoading(false));

    }, [publicId]);

    if(isLoading){
        return (
            <p>Loading...</p>

        )
    }

    if(!movie) {
        return(
            <p>No movie found!</p>
        )
    }

    return (
        <div className="movie-card" style={{boxSizing: "border-box"}}>
            <div className="movie-poster placeholder">
                No Image
            </div>
            <div className="movie-info">
                <h2>{movie.title}</h2>
                <p>{movie.genre}</p>
                <p><strong>Imdb:</strong>{movie.id}</p>
            </div>
        </div>
    )
}