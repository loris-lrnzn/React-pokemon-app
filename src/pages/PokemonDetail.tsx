import { useParams } from "react-router-dom";
import POKEMONS from "../models/mock-pokemon";
import formatDate from "../helpers/formatDate";
import getTypeColor from "../helpers/getTypeColor";

export default function PokemonDetail() {
    const { id } = useParams<{ id: string }>();
    const pokemon = POKEMONS.find(p => p.id === Number(id));
    if (!pokemon) return <div>Pokémon introuvable.</div>;

    return (
        <div className={`p-8 rounded shadow ${getTypeColor(pokemon.types[0])}`}>
            <h1 className="text-3xl font-bold">{pokemon.name}</h1>
            <img src={pokemon.picture} alt={pokemon.name} className="w-32 h-32 my-4" />
            <p>HP: {pokemon.hp}</p>
            <p>CP: {pokemon.cp}</p>
            <p>Types: {pokemon.types.join(", ")}</p>
            <p>Créé le : {formatDate(pokemon.created)}</p>
        </div>
    );
}