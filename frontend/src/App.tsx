import './App.css'
import Movies from "./pages/Movies.tsx";
import {Route, Routes} from "react-router-dom";
import MovieDetailsPage from "./pages/MovieDetailsPage.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Movies/>}/>
                <Route path={"/movies/:publicId"} element={<MovieDetailsPage/>}/>
            </Routes>
        </>
    )
}

export default App
