import { useState } from "react";
import POKEMONS from "../models/mock-pokemon";

function getTypeColor(type: string) {
    switch (type) {
        case "Plante":
            return "bg-green-200";
        case "Poison":
            return "bg-purple-200";
        case "Eau":
            return "bg-blue-200";
        case "Feu":
            return "bg-red-200";
        case "Electrik":
            return "bg-yellow-200";
        case "Vol":
            return "bg-indigo-200";
        case "Insecte":
            return "bg-lime-200";
        case "Normal":
            return "bg-gray-200";
        case "Sol":
            return "bg-yellow-700";
        case "Roche":
            return "bg-yellow-900";
        case "Spectre":
            return "bg-violet-400";
        case "Acier":
            return "bg-gray-400";
        case "Combat":
            return "bg-orange-300";
        case "Psy":
            return "bg-pink-200";
        case "Glace":
            return "bg-cyan-200";
        case "Dragon":
            return "bg-purple-400";
        case "Ténèbres":
            return "bg-gray-800 text-white";
        case "Fée":
            return "bg-pink-300";
        default:
            return "bg-gray-100";
    }
}

function Teams() {
    const [visiblePokemons, setVisiblePokemons] = useState(POKEMONS);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const handleRemove = (id: number) => {
        setVisiblePokemons(
            visiblePokemons.filter((pokemon) => pokemon.id !== id)
        );
    };

    return (
        <div className="mx-auto flex flex-col justify-center items-center py-4">
            <h1 className="text-3xl font-bold">Notre Équipe</h1>
            <h2 className="text-2xl font-semibold mb-4">
                {visiblePokemons.length} cartes Pokémon
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visiblePokemons.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className={`shadow rounded p-4 flex flex-col items-center ${getTypeColor(
                            pokemon.types[0]
                        )} border-2 ${
                            hoveredId === pokemon.id
                                ? "border-violet-500"
                                : "border-gray-300"
                        }`}
                        onMouseEnter={() => setHoveredId(pokemon.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <img
                            src={pokemon.picture}
                            alt={pokemon.name}
                            className="w-24 h-24 mb-2"
                        />
                        <h3 className="text-lg font-bold">{pokemon.name}</h3>
                        <p>
                            HP: {pokemon.hp} | CP: {pokemon.cp}
                        </p>
                        <div className="flex gap-2 mt-2">
                            {pokemon.types.map((type) => (
                                <span
                                    key={type}
                                    className="px-2 py-1 bg-gray-200 rounded text-xs"
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleRemove(pokemon.id)}
                                className="text-red-600 hover:text-red-800 text-xl"
                                title="Supprimer"
                            >
                                &#10006;
                            </button>
                            <button
                                className="text-yellow-500 hover:text-yellow-700 text-xl"
                                title="Épingler"
                            >
                                &#128204;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Teams;