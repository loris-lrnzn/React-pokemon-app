const MAP: Record<string, string> = {
    Normal: "bg-gray-200 text-gray-800",
    Plante: "bg-green-100 text-green-800",
    Feu: "bg-red-100 text-red-800",
    Eau: "bg-blue-100 text-blue-800",
    Poison: "bg-purple-100 text-purple-800",
    Vol: "bg-indigo-100 text-indigo-800",
    Insecte: "bg-lime-100 text-lime-800",
    Acier: "bg-gray-400 text-gray-800",
    Combat: "bg-orange-300 text-orange-800",
    Psy: "bg-pink-200 text-pink-800",
    Glace: "bg-cyan-200 text-cyan-800",
    Dragon: "bg-purple-400 text-purple-800",
    Ténèbres: "bg-gray-800 text-white",
    Fée: "bg-pink-300 text-pink-800",
    Electrik: "bg-yellow-100 text-yellow-800",
    Sol: "bg-yellow-300 text-yellow-800",
    Roche: "bg-yellow-600 text-yellow-900",
    Spectre: "bg-purple-300 text-purple-900",
};

export const TYPES = Object.keys(MAP);
export default function getTypeColor(type: string) {
    return MAP[type] ?? "bg-gray-100 text-gray-800";
}