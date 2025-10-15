import { useParams, useNavigate } from "react-router-dom";
import POKEMONS from "../models/mock-pokemon";
import formatDate from "../helpers/formatDate";
import getTypeColor from "../helpers/getTypeColor";

export default function PokemonDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pokemon = POKEMONS.find(p => p.id === Number(id));
    if (!pokemon) return <div className="flex items-center justify-center min-h-[80vh] text-xl">Pokémon introuvable.</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
            <div className={`w-full max-w-md bg-white shadow-lg rounded-xl p-8 border-2 ${getTypeColor(pokemon.types[0])}`}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">{pokemon.name}</h1>
                    <button
                        title="Éditer"
                        onClick={() => navigate(`/pokemonEdit/${pokemon.id}`)}
                        className="text-blue-600 text-2xl px-2 py-1 rounded hover:bg-blue-100"
                    >
                        ℹ️
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={pokemon.picture} alt={pokemon.name} className="w-32 h-32 my-4 rounded-full border-4 border-white shadow" />
                    <div className="flex gap-2 mb-2">
                        {pokemon.types.map((type) => (
                            <span
                                key={type}
                                className={`px-3 py-1 rounded text-xs font-semibold ${getTypeColor(type)}`}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className="w-full text-center">
                        <p className="text-lg font-medium">HP : <span className="font-bold">{pokemon.hp}</span></p>
                        <p className="text-lg font-medium">CP : <span className="font-bold">{pokemon.cp}</span></p>
                        <p className="text-gray-600 mt-2">
                            <small>Créé le : {formatDate(pokemon.created)}</small>
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={() => navigate("/team")}
                className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded shadow transition"
            >
                ← Retour à la liste
            </button>
        </div>
    );
}