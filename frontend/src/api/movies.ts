import axios from "axios";
import type {Movie} from "../type/movie.ts";

export async function getMovies(): Promise<Movie[]> {
    const response = await axios.get("/api/movies");
    return response.data;
}

export  async function addMovie(movie: Movie): Promise<void> {
    const response = await axios.post("/api/movies", movie);
    return response.data;
}

export async function editMovie(movie: Movie) : Promise<Movie> {
    const response = await axios.put(`/api/movies/${movie.id}`, movie);
    return response.data;
}

export async function getMovieById(id:string) {
    const response = await axios.get(`/api/movies/${id}`);
    return response.data;
}