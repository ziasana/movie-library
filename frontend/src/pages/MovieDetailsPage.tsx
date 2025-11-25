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
            setIsLoading(false);
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
            <div>
                <h2>{movie.title}</h2>
                <p>{movie.genre}</p>
                <p>{movie.publicId}</p>
            </div>
        </>
    )
}