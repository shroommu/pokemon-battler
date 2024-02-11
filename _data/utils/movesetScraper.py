import urllib.request
from pprint import pprint
from html_table_parser.parser import HTMLTableParser
import pandas as pd

def url_get_contents(url):
    req = urllib.request.Request(url, None, {'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5'})
    f = urllib.request.urlopen(req)

    return f.read()


def get_all_pokemon_movesets():

    pokemon_df = pd.read_csv('FirstGenPokemon.csv', usecols=[' Name'])
    pokemon_list = pokemon_df.values.tolist();
    full_moveset_list = []

    for pokemon in pokemon_list:
        url = f"https://pokemondb.net/pokedex/{pokemon[0].lower()}/moves/1"
        print(url)
        xhtml = url_get_contents(url).decode('utf-8')
        temp_parser = HTMLTableParser()
        temp_parser.feed(xhtml)

        flattened_moveset_list = [
            entry
            for table in temp_parser.tables
            for entry in table
        ]

        for record in flattened_moveset_list:
            if record[0] == 'Lv.' or record[0] == 'HM' or record[0] == 'TM':
                record[0] = 'Pokemon'
            else:
                record[0] = pokemon[0]

        full_moveset_list.append(flattened_moveset_list)
        
    flattened_full_moveset_list = [
        entry
        for table in full_moveset_list
        for entry in table
    ]

    for record in flattened_full_moveset_list[1:]:
        if record[0] == 'Pokemon':
            flattened_full_moveset_list.remove(record)

    df = pd.DataFrame(data=flattened_full_moveset_list)
    df.to_csv(path_or_buf='./fullMoveset.csv', index=False)

get_all_pokemon_movesets()