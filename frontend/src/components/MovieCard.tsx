interface MovieCardProps {
    publicId: string,
    title: string;
    genre: string;
    onClick: () => void
}

export default function MovieCard({onClick, title, genre}: MovieCardProps) {
    return (
        <div onClick={onClick} style={{textAlign: 'center', marginTop: '1rem', color: 'limegreen'}}>
            <strong>{title} – {genre}</strong>
        </div>
    );
}
