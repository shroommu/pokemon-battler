import urllib.request
from bs4 import BeautifulSoup
import pandas as pd

def url_get_contents(url):
    req = urllib.request.Request(url, None, {'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5'})
    f = urllib.request.urlopen(req)

    return f.read()


def get_all_pokemon_pokedex_entries():

    pokemon_df = pd.read_csv('_data/FirstGenPokemon.csv', usecols=[' Name'])
    pokemon_list = pokemon_df.values.tolist();
    vitals_dict = dict()

    for pokemon in pokemon_list:
        url = f"https://pokemondb.net/pokedex/{pokemon[0].replace(' ', '-').lower()}"
        xhtml = url_get_contents(url).decode('utf-8')
        soup = BeautifulSoup(xhtml, 'html.parser')

        pokedex_vitals_table = soup.find("table", class_="vitals-table")

        if pokedex_vitals_table is None:
            print(f"No Pokédex vitals table found for {pokemon[0]}")
            continue

        pokemon_species = pokedex_vitals_table.find("th", text="Species").next_sibling.next_sibling.string
        pokemon_height = pokedex_vitals_table.find("th", text="Height").next_sibling.next_sibling.string
        pokemon_weight = pokedex_vitals_table.find("th", text="Weight").next_sibling.next_sibling.string

        vitals_dict[pokemon[0]] = {"Species": pokemon_species, "Height": pokemon_height, "Weight": pokemon_weight}

        print(f"writing data for {pokemon[0]}")

    vitals_df = pd.DataFrame.from_dict(vitals_dict, "index")
    vitals_df.to_csv(path_or_buf='_data/Gen1PokedexBasics.csv', index_label="Pokemon")

get_all_pokemon_pokedex_entries()