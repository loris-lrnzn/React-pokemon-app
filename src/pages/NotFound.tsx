import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Erreur 404 - Page non trouvée</h1>
            <button onClick={() => navigate("/")}>Retour à l'accueil</button>
        </div>
    );
}