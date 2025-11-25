import axios from "axios";

export interface MovieDTO {
    publicId : string;
    title: string;
    genre: string;
}

export async function getMovies() {
    const response = await axios.get("/api/movies");
    return response.data;
}