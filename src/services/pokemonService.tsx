import type Pokemon from "../models/pokemon";
import AuthentificationService from "./authentificationService";

const API_BASE = "http://127.0.0.1:8000/api/pokemons";

export default class PokemonService {
    static async getPokemons(): Promise<Pokemon[]> {
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(API_BASE, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            if (!res.ok) {
                console.error("getPokemons failed", res.status);
                return [];
            }
            return (await res.json()) as Pokemon[];
        } catch (err) {
            console.error("getPokemons error", err);
            return [];
        }
    }

    static async getPokemon(id: number): Promise<Pokemon | null> {
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE}/${id}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            if (res.status === 404) return null;
            if (!res.ok) {
                console.error("getPokemon failed", res.status);
                return null;
            }
            const data = await res.json();
            return this.isEmpty(data) ? null : (data as Pokemon);
        } catch (err) {
            console.error("getPokemon error", err);
            return null;
        }
    }

    static isEmpty(data: Object | null | undefined): boolean {
        if (!data) return true;
        return Object.keys(data as Object).length === 0;
    }

    static async addPokemon(pokemon: Pokemon): Promise<Pokemon | null> {
        try {
            
            const token = localStorage.getItem("authToken");
            const res = await fetch(API_BASE, {
                headers: token
                    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
                    : { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(pokemon),
            });
            if (!res.ok) {
                console.error("addPokemon failed", res.status);
                return null;
            }
            return (await res.json()) as Pokemon;
        } catch (err) {
            console.error("addPokemon error", err);
            return null;
        }
    }

    static async updatePokemon(pokemon: Pokemon): Promise<Pokemon | null> {
        if (!pokemon.id) {
            console.error("updatePokemon: missing id");
            return null;
        }
        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${API_BASE}/${pokemon.id}`, {
                headers: token
                    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
                    : { "Content-Type": "application/json" },
                method: "PUT",
                body: JSON.stringify(pokemon),
            });
            if (!res.ok) {
                console.error("updatePokemon failed", res.status);
                return null;
            }
            return (await res.json()) as Pokemon;
        } catch (err) {
            console.error("updatePokemon error", err);
            return null;
        }
    }

    static async deletePokemon(id: number): Promise<boolean> {
        try {
            const token = localStorage.getItem("authToken");
            const headers: Record<string,string> = token
                ? { Authorization: `Bearer ${token}` }
                : {};

            const res = await fetch(`${API_BASE}/${id}`, {
                method: "DELETE",
                headers
            });

            if (res.status === 401 || res.status === 403) {
                console.error("deletePokemon unauthorized", res.status);
                // optionnel : forcer la déconnexion si le token est invalide
                // AuthentificationService.logout();
                return false;
            }

            if (!res.ok) {
                console.error("deletePokemon failed", res.status);
                return false;
            }

            return true;
        } catch (err) {
            console.error("deletePokemon error", err);
            return false;
        }
    }

    
    static async searchPokemons(term = "", type?: string): Promise<Pokemon[]> {
        try {
            if (!term) {
                const all = await this.getPokemons();
                return type ? all.filter(p => (p.types || []).includes(type)) : all;
            }

            const q = encodeURIComponent(term);
            const res = await fetch(`${API_BASE}?q=${q}`);
            let data: Pokemon[] = [];
            if (res.ok) {
                data = await res.json();
            } else {
                data = await this.getPokemons();
            }

            const termL = term.toLowerCase();
            const byName = data.filter(p => String(p.name || "").toLowerCase().includes(termL));
            return type ? byName.filter(p => (p.types || []).includes(type)) : byName;
        } catch (err) {
            console.error("searchPokemons error", err);
            return [];
        }
    }
}