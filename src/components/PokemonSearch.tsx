import { useState } from "react";

type Props = {
    types: string[];
    onSearch: (name: string, type: string) => void;
};

export default function PokemonSearch({ types, onSearch }: Props) {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearch(e.target.value, selectedType);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
        onSearch(search, e.target.value);
    };

    return (
        <div className="flex gap-4 mb-6">
            <input
                type="text"
                placeholder="Rechercher un Pokémon"
                value={search}
                onChange={handleChange}
                className="border p-2 rounded"
            />
            <select
                value={selectedType}
                onChange={handleTypeChange}
                className="border p-2 rounded"
            >
                <option value="">Tous les types</option>
                {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
        </div>
    );
}