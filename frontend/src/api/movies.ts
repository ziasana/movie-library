import axios from "axios";

export interface MovieDTO {
    publicId: string;
    id: string;
    title: string;
    poster?: string;
    genre: string;
}

export async function getMovies(): Promise<MovieDTO[]> {
    const response = await axios.get("/api/movies");
    return response.data;
}
