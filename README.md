### Pokemons

*   **GET /api/pokemons**
    *   Name: `api_pokemons_list`
    *   Description: Get the list of all pokemons.

*   **GET /api/pokemons/{id}**
    *   Name: `api_pokemons_show`
    *   Description: Get a specific pokemon by its ID.
    *   Example: `/api/pokemons/1`

*   **POST /api/pokemons**
    *   Name: `api_pokemons_create`
    *   Description: Create a new pokemon. The picture must be a valid URL.
    *   Body (raw, JSON):
        ```json
        {
            "name": "Pikachu",
            "hp": 35,
            "cp": 55,
            "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
            "types": ["Electric"]
        }
        ```

*   **PUT /api/pokemons/{id}**
    *   Name: `api_pokemons_update`
    *   Description: Update an existing pokemon.
    *   Example: `/api/pokemons/1`
    *   Body (raw, JSON):
        ```json
        {
            "name": "Pikachu",
            "hp": 40,
            "cp": 60,
            "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
            "types": ["Electric"]
        }
        ```

*   **DELETE /api/pokemons/{id}**
    *   Name: `api_pokemons_delete`
    *   Description: Delete a pokemon by its ID.
    *   Example: `/api/pokemons/1`

### Users

*   **POST /user/login**
    *   Name: `app_userlogin`
    *   Description: Login a user.
    *   Body (raw, JSON):
        ```json
        {
            "username": "your_username",
            "password": "your_password"
        }
        ```
