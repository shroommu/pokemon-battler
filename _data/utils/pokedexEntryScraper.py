import urllib.request
from html_table_parser.parser import HTMLTableParser
import pandas as pd
import csv

def url_get_contents(url):
    req = urllib.request.Request(url, None, {'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5'})
    f = urllib.request.urlopen(req)

    return f.read()


def get_all_pokemon_pokedex_entries():

    pokemon_df = pd.read_csv('_data/FirstGenPokemon.csv', usecols=[' Name'])
    pokemon_list = pokemon_df.values.tolist();
    full_pokedex_entries_list = []

    for pokemon in pokemon_list:
        url = f"https://pokemondb.net/pokedex/{pokemon[0].replace(' ', '-').lower()}#dex-flavor"
        xhtml = url_get_contents(url).decode('utf-8')
        parser = HTMLTableParser()
        parser.feed(xhtml)

        flattened_table_rows = [
            entry
            for table in parser.tables
            for entry in table
        ]
        
        filtered_data_rows = []

        for row in flattened_table_rows:
            if row[0] == "Red Blue" or row[0] == "Yellow":
                filtered_data_rows.append(row[1])

        for row in filtered_data_rows[2:]:
            filtered_data_rows.remove(row);
        
        full_pokedex_entries_list.append([pokemon[0], f"{filtered_data_rows[0]} {filtered_data_rows[1]}"])

        print(f"writing data for {pokemon[0]}")

    df = pd.DataFrame(data=full_pokedex_entries_list)
    df.to_csv(path_or_buf='_data/Gen1PokedexEntries.csv', index=False, header=["Pokemon", "Description"], quoting=csv.QUOTE_ALL)

get_all_pokemon_pokedex_entries()