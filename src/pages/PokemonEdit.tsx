import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getTypeColor, { TYPES as HELPER_TYPES } from "../helpers/getTypeColor";
import PokemonService from "../services/pokemonService";
import type Pokemon from "../models/pokemon";

export default function PokemonEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState<any | null>(null);
    const [form, setForm] = useState({
        name: "",
        hp: 0,
        cp: 0,
        types: [] as string[],
    });
    const [message, setMessage] = useState("");
    const [allTypes, setAllTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        let mounted = true;
        setLoading(true);
        (async () => {
            const p = await PokemonService.getPokemon(Number(id));
            if (!mounted) return;
            if (p) {
                setPokemon(p);
                setForm({
                    name: p.name || "",
                    hp: p.hp || 0,
                    cp: p.cp || 0,
                    types: Array.isArray(p.types) ? [...p.types] : [],
                });
            } else {
                setPokemon(null);
            }
            if (mounted) setLoading(false);
        })();
        return () => { mounted = false; };
    }, [id]);

    useEffect(() => {
        if (Array.isArray(HELPER_TYPES) && HELPER_TYPES.length > 0) {
            setAllTypes(HELPER_TYPES);
            return;
        }
    }, []);

    if (loading) return <div className="p-8 text-center">Chargement…</div>;
    if (!pokemon) return <div className="p-8 text-center">Pokémon introuvable.</div>;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const updatedPokemon = {
            ...pokemon,
            name: form.name,
            hp: form.hp,
            cp: form.cp,
            types: [...form.types],
        };

        const saved = await PokemonService.updatePokemon(updatedPokemon as Pokemon);
        setLoading(false);

        if (!saved) {
            setMessage("Erreur lors de la sauvegarde.");
            return;
        }

        setPokemon(saved);
        setMessage("✅ Modifications enregistrées !");
        setTimeout(() => navigate(`/pokemonDetail/${id}`), 800);
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
                        {allTypes.map((type) => (
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