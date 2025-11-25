interface MovieCardProps {
    publicId: string,
    title: string;
    genre: string;
    poster?: string,
    onClick: () => void
}



export default function MovieCard({ title, genre, poster, onClick }: MovieCardProps) {
    return (
        <div onClick={onClick} className="movie-card">
            {poster ? (
                <img src={poster} alt={title} className="movie-poster" />
            ) : (
                <div className="movie-poster placeholder">
                    No Image
                </div>
            )}
            <div className="movie-info">
                <h2>{title}</h2>
                <p>{genre}</p>
            </div>
        </div>
    );
}
