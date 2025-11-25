interface MovieCardProps {
    title: string;
    genre: string;
}

export default function MovieCard({ title, genre }: MovieCardProps) {
    return (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'limegreen' }}>
            <strong>{title} – {genre}</strong>
        </div>
    );
}
