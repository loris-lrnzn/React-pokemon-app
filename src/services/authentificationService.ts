export default class AuthentificationService {
    static isAuthenticated: boolean = false;

    // safe normalize base url (use REACT_APP_API_URL or VITE_API_URL if defined)
    static apiUrl: string = (() => {
        // CRA: process.env.REACT_APP_API_URL (only available at build time, not in browser runtime)
        if (typeof process !== 'undefined' && (process as any).env && (process as any).env.REACT_APP_API_URL) {
            return String((process as any).env.REACT_APP_API_URL).replace(/\/+$/, '');
        }
        // Vite / modern bundlers
        try {
            // import.meta is only available in ESM; access it directly and guard with optional chaining
            if ((import.meta as any)?.env?.VITE_API_URL) {
                return String((import.meta as any).env.VITE_API_URL).replace(/\/+$/, '');
            }
        } catch {
            // import.meta not supported in this runtime environment — fall through to default
        }
        // default to local Symfony backend
        return 'https://pokemons-loris.mmi-stdie.fr/pokemon_backend/public';
    })();

    static async login(email: string, password: string): Promise<boolean> {
        try {
            const resp = await fetch(`${this.apiUrl}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            /*if (!resp.ok) {
                this.isAuthenticated = false;
                return false;
            }*/

            const data = await resp.json();
            console.log('AuthentificationService.login response data:', data);
            const token = data?.token ?? data?.accessToken ?? null;

            if (token) {
                localStorage.setItem('authToken', token);
                window.dispatchEvent(new Event('authChange')); // notif autres composants (navbar, pages) dans le même onglet
                this.isAuthenticated = true;
                return true;
            }

            if (data?.authenticated) {
                this.isAuthenticated = true;
                return true;
            }

            this.isAuthenticated = false;
            return false;
        } catch (e) {
            console.error('AuthentificationService.login error', e);
            this.isAuthenticated = false;
            return false;
        }
    }

    static logout(): void {
        this.isAuthenticated = false;
        localStorage.removeItem('authToken');
        // notif autres composants (navbar, pages) dans le même onglet
        window.dispatchEvent(new Event('authChange'));
        // si tu veux invalider côté serveur, appelle ici /logout (avec credentials)
        fetch(`${this.apiUrl}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuthHeader()
            }
        });
    }

    static getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    static getAuthHeader(): Record<string, string> {
        const token = this.getToken();
        return token ? { Authorization: `Bearer ${token}` } : {};
    }

    static decodeToken(): Record<string, any> | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const json = decodeURIComponent(atob(payload).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            return JSON.parse(json);
        } catch {
            return null;
        }
    }
}