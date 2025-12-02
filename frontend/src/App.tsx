import './App.css'
import Movies from "./pages/Movie/index";
import Add from "./pages/Movie/add.tsx";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.tsx";
import EditMovie from "./pages/Movie/edit.tsx";


function App() {

  return (
      <div className="min-h-screen flex flex-col">
          <Header />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movie" element={<Movies />} />
                  <Route path="/movie/add" element={<Add />} />
                  <Route path={"/movies/:publicId"} element={<MovieDetailsPage/>}/>
                  <Route path={"/movies/edit/:id"} element={<EditMovie/>}/>
                  <Route path="/login" element={<Login />} />
              </Routes>
          <Footer />
      </div>
  )
}

export default App
