import { Routes, Route } from "react-router-dom";
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Teams from './pages/Teams'
import PokemonDetail from './pages/PokemonDetail'
import PokemonEdit from './pages/PokemonEdit'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/pokemonDetail/:id" element={<PokemonDetail />} />
          <Route path="/pokemonEdit/:id" element={<PokemonEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App