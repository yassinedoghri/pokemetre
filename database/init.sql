.import "../src/pokeapi/data/v2/csv/pokemon.csv" _temp_pokemon --csv

CREATE TABLE pokemons(
    id INTEGER NOT NULL,
    identifier TEXT NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NUll
);

INSERT INTO pokemons (id, identifier, height, weight)
    SELECT id, identifier, height, weight
    FROM _temp_pokemon;

DROP TABLE _temp_pokemon;
