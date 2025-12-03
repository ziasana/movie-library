import './App.css'
import Movies from "./pages/Movie/index";
import Add from "./pages/Movie/add.tsx";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import {Header} from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import MovieDetailsPage from "./pages/MovieDetailsPage.tsx";
import ProtectedPages from "./components/ProtectedPages.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import EditMovie from "./pages/Movie/edit.tsx";



function App() {
    const [username, setUsername] = useState("");
    useEffect(()=>{
        axios.get("/api/users").then(res => {
            setUsername(res.data);
        })
    },[])

  return (
      <div className="min-h-screen flex flex-col">
          <Header user={username}></Header>
              <Routes>
                  <Route path="/" element={<Home  user={username}/>} />
                  <Route element={<ProtectedPages user={username}/>}>
                      <Route path="/movie" element={<Movies />} />
                      <Route path="/movie/add" element={<Add />} />
                      <Route path={"/movies/:publicId"} element={<MovieDetailsPage/>}/>
                      <Route path={"/movies/edit/:id"} element={<EditMovie/>}/>
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout"  />
              </Routes>
          <Footer />
      </div>
  )
}

export default App
