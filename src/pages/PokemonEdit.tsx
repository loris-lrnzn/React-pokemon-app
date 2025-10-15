import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import POKEMONS from "../models/mock-pokemon";
import getTypeColor from "../helpers/getTypeColor";

const ALL_TYPES = Array.from(
    new Set(POKEMONS.flatMap((p) => p.types))
);

export default function PokemonEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pokemon = POKEMONS.find(p => p.id === Number(id));
    const [form, setForm] = useState(
        pokemon
            ? { name: pokemon.name, hp: pokemon.hp, cp: pokemon.cp, types: [...pokemon.types] }
            : { name: "", hp: 0, cp: 0, types: [] as string[] }
    );
    const [message, setMessage] = useState("");

    if (!pokemon) return <div>Pokémon introuvable.</div>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "name" ? value : Number(value) });
    };

    const handleTypeChange = (type: string) => {
        setForm((prev) => {
            const types = prev.types.includes(type)
                ? prev.types.filter((t) => t !== type)
                : [...prev.types, type];
            return { ...prev, types };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        pokemon.name = form.name;
        pokemon.hp = form.hp;
        pokemon.cp = form.cp;
        pokemon.types = [...form.types];
        setMessage("✅ Modifications enregistrées !");
        setTimeout(() => {
            navigate(`/pokemonDetail/${pokemon.id}`);
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-lg bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6 border-2 ${getTypeColor(form.types[0] || "Normal")}`}
            >
                <h1 className="text-3xl font-bold text-center mb-2">Éditer {pokemon.name}</h1>
                <label className="flex flex-col gap-1">
                    Nom :
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <div className="flex gap-4">
                    <label className="flex-1 flex flex-col gap-1">
                        HP :
                        <input
                            type="number"
                            name="hp"
                            value={form.hp}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                    <label className="flex-1 flex flex-col gap-1">
                        CP :
                        <input
                            type="number"
                            name="cp"
                            value={form.cp}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                    </label>
                </div>
                <div>
                    <span className="font-semibold">Types :</span>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {ALL_TYPES.map((type) => (
                            <label key={type} className="flex items-center gap-1 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.types.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                    className="accent-blue-600"
                                />
                                <span className={`px-2 py-1 rounded text-xs ${getTypeColor(type)}`}>
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        Types sélectionnés : {form.types.length > 0 ? form.types.join(", ") : "Aucun"}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
                >
                    Valider les modifications
                </button>
                {message && <p className="text-green-600 text-center">{message}</p>}
            </form>
        </div>
    );
}