const getTypeColor = (type: string) => {
    switch (type) {
        case "Plante":
            return "bg-green-200";
        case "Poison":
            return "bg-purple-200";
        case "Eau":
            return "bg-blue-200";
        case "Feu":
            return "bg-red-200";
        case "Electrik":
            return "bg-yellow-200";
        case "Vol":
            return "bg-indigo-200";
        case "Insecte":
            return "bg-lime-200";
        case "Normal":
            return "bg-gray-200";
        case "Sol":
            return "bg-yellow-700";
        case "Roche":
            return "bg-yellow-900";
        case "Spectre":
            return "bg-violet-400";
        case "Acier":
            return "bg-gray-400";
        case "Combat":
            return "bg-orange-300";
        case "Psy":
            return "bg-pink-200";
        case "Glace":
            return "bg-cyan-200";
        case "Dragon":
            return "bg-purple-400";
        case "Ténèbres":
            return "bg-gray-800 text-white";
        case "Fée":
            return "bg-pink-300";
        default:
            return "bg-gray-100";
    }
};

export default getTypeColor;