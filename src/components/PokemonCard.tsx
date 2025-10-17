import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import getTypeColor from "../helpers/getTypeColor";



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
    const navigate = useNavigate();

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
            <p className="text-black">
            </p>
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
                <button
                    onClick={() => navigate(`/pokemonDetail/${pokemon.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                    title="Détail"
                >
                    Détail
                </button>
            </div>
        </div>
    );
}