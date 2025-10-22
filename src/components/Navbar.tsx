import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthentificationService from "../services/authentificationService";

function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean>(() =>
    Boolean(AuthentificationService.getToken() ?? AuthentificationService.isAuthenticated)
  );

  useEffect(() => {
    const onAuthChange = () =>
      setIsAuth(Boolean(AuthentificationService.getToken() ?? AuthentificationService.isAuthenticated));
    window.addEventListener("storage", onAuthChange); // cross-tab changes
    window.addEventListener("authChange", onAuthChange); // in-tab custom event
    // sync initial state
    onAuthChange();
    return () => {
      window.removeEventListener("storage", onAuthChange);
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  const handleLogout = () => {
    AuthentificationService.logout();
    window.dispatchEvent(new Event("authChange")); //
    navigate("/login");
  };


  return (
    <div>
      <nav className="bg-gray-900 text-white hidden md:block px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img src="pikachu.png" alt="pokemon" className="w-10" />
            <a href="#" className="text-xl font-bold">React Pokemon App</a>
          </div>

          <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-400">Accueil</Link>
            <Link to="/about" className="hover:text-gray-400">À propos</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
            <Link to="/team" className="hover:text-gray-400">Équipe Pokémon</Link>

            {isAuth ? (
              <button onClick={handleLogout} className="hover:text-gray-400 bg-transparent border-none">
                Logout
              </button>
            ) : (
              <Link to="/login" className="hover:text-gray-400">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;