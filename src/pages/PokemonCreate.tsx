import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getTypeColor, { TYPES as HELPER_TYPES } from "../helpers/getTypeColor";
import PokemonService from "../services/pokemonService";
import type Pokemon from "../models/pokemon";

export default function PokemonCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        hp: 50,
        cp: 10,
        picture: "",
        types: [] as string[],
    });
    const [allTypes, setAllTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (Array.isArray(HELPER_TYPES) && HELPER_TYPES.length > 0) {
            setAllTypes(HELPER_TYPES);
            return;
        }
    }, []);

    const toggleType = (type: string) => {
        setForm((f) => ({
            ...f,
            types: f.types.includes(type) ? f.types.filter((t) => t !== type) : [...f.types, type],
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: name === "name" || name === "picture" ? value : Number(value) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const newPokemon: Partial<Pokemon> = {
            name: form.name,
            hp: form.hp,
            cp: form.cp,
            picture: form.picture || "https://via.placeholder.com/150",
            types: form.types,
        };

        const saved = await PokemonService.addPokemon(newPokemon as Pokemon);
        setLoading(false);

        if (!saved) {
            setMessage("Erreur: le serveur n'a pas renvoyé le Pokémon.");
            return;
        }

        setMessage("Pokémon créé ✅");
        setTimeout(() => navigate(`/pokemonDetail/${saved.id}`), 700);
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Ajouter un Pokémon</h1>

                <label className="flex flex-col">
                    Nom
                    <input name="name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
                </label>

                <div className="flex gap-4">
                    <label className="flex-1 flex flex-col">
                        HP
                        <input name="hp" type="number" value={form.hp} onChange={handleChange} className="border p-2 rounded" />
                    </label>
                    <label className="flex-1 flex flex-col">
                        CP
                        <input name="cp" type="number" value={form.cp} onChange={handleChange} className="border p-2 rounded" />
                    </label>
                </div>

                <label className="flex flex-col">
                    Image (URL)
                    <input name="picture" value={form.picture} onChange={handleChange} className="border p-2 rounded" />
                </label>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Types</span>

                    </div>

                    <div className="flex flex-wrap gap-2">
                        {allTypes.map((type) => {
                            const active = form.types.includes(type);
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleType(type)}
                                    className={`px-3 py-1 rounded text-sm font-medium ${getTypeColor(type)} ${active ? "ring-2 ring-blue-400" : ""}`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
                        {loading ? "Envoi..." : "Créer"}
                    </button>
                    <button type="button" onClick={() => navigate("/team")} className="text-gray-600 underline">
                        Annuler
                    </button>
                </div>

                {message && <div className="text-center mt-2 text-sm">{message}</div>}
            </form>
        </div>
    );
}