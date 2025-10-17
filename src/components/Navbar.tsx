import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
        <nav className="bg-gray-900 text-white hidden md:block px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img src="pikachu.png" alt="pokemon" className="w-10"/>
            <a href="#" className="text-xl font-bold">React Pokemon App</a>
          </div>

          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-400">Accueil</Link>
            <Link to="/about" className="hover:text-gray-400">À propos</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            <Link to="/team" className="hover:text-gray-400">Équipe Pokémon</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar