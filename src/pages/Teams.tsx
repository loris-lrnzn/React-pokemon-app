import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import PokemonSearch from "../components/PokemonSearch";
import PokemonService from "../services/pokemonService";
import type Pokemon from "../models/pokemon";
import { TYPES as ALL_TYPES } from "../helpers/getTypeColor";

export default function Teams() {
    const [visiblePokemons, setVisiblePokemons] = useState<Pokemon[]>([]);

    const load = useCallback(async () => {
        const list = await PokemonService.getPokemons();
        setVisiblePokemons(list);
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleRemove = useCallback(async (id: number) => {
        const ok = await PokemonService.deletePokemon(id);
        if (ok) {
            setVisiblePokemons(prev => prev.filter(p => p.id !== id));
        } else {
            alert("Impossible de supprimer le Pokémon.");
        }
    }, []);

    const handleSearch = useCallback(async (name: string, type: string) => {
        const results = await PokemonService.searchPokemons(name, type || undefined);
        setVisiblePokemons(results);
    }, []);

    return (
        <div className="mx-auto flex flex-col justify-center items-center py-4">
            <div className="w-full max-w-4xl flex items-center justify-between mb-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold">Notre Équipe</h1>
                    <h2 className="text-2xl font-semibold">{visiblePokemons.length} cartes Pokémon</h2>
                </div>

                <Link to="/pokemonCreate" className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow">
                    + Créer un Pokémon
                </Link>
            </div>

            <PokemonSearch types={ALL_TYPES} onSearch={handleSearch} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visiblePokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} removePokemon={handleRemove} />
                ))}
            </div>
        </div>
    );
}