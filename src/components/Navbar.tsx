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
            <a href="#" className="hover:text-gray-400">Accueil</a>
            <a href="#" className="hover:text-gray-400">Pokemons</a>
            <a href="#" className="hover:text-gray-400">À propos</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar