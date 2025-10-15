import { useState } from "react";
import POKEMONS from "../models/mock-pokemon";
import PokemonCard from "../components/PokemonCard";


function Teams() {
    const [visiblePokemons, setVisiblePokemons] = useState(POKEMONS);

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
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        removePokemon={handleRemove}
                    />
                ))}
            </div>
        </div>
    );
}

export default Teams;