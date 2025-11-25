import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {type MovieDTO} from "../api/movies.ts";
import axios from "axios";

export default function MovieDetailsPage() {
const {publicId} = useParams();
const [movie,setMovie] = useState<MovieDTO |null>(null);
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
        <>
            <div className="movie-card" style={{ boxSizing:"border-box"}}>
                {movie.poster ? (
                    <img src={movie.poster} alt={movie.title} className="movie-poster" />
                ) : (
                    <div className="movie-poster placeholder">
                        No Image
                    </div>
                )}
                <div className="movie-info">
                    <h2>{movie.title}</h2>
                    <p>{movie.genre}</p>
                    <p><strong>Imdb:</strong>{movie.publicId}</p>
                </div>
            </div>
        </>
    )
}