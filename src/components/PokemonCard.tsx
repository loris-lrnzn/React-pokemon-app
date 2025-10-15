import { useState } from "react";
import Pokemon from "../models/pokemon";

// Fonction utilitaire pour la couleur des types
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

type Props = {
    pokemon: Pokemon;
    removePokemon: (id: number) => void;
    borderColor?: string;
};

export default function PokemonCard({
    pokemon,
    removePokemon,
    borderColor = "#666666",
}: Props) {
    const [isHovered, setIsHovered] = useState(false);

    // Utilise le premier type pour la couleur de fond de la carte
    const cardBgColor = getTypeColor(pokemon.types[0]);

    return (
        <div
            className={`shadow rounded p-4 flex flex-col items-center ${cardBgColor}`}
            style={{
                border: "2px solid",
                borderColor: isHovered ? "#8b5cf6" : borderColor,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={pokemon.picture} alt={pokemon.name} className="w-24 h-24 mb-2" />
            <h3 className="text-lg font-bold">{pokemon.name}</h3>
            <p>
                HP: {pokemon.hp} | CP: {pokemon.cp}
            </p>
            <div className="flex gap-2 mt-2">
                {pokemon.types.map((type) => (
                    <span
                        key={type}
                        className="px-2 py-1 rounded text-xs bg-white bg-opacity-70"
                    >
                        {type}
                    </span>
                ))}
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => removePokemon(pokemon.id)}
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
    );
}