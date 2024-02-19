from urllib import request
import pandas as pd

def save_all_back_sprites():

    pokemon_df = pd.read_csv('_data\FirstGenPokemon.csv', usecols=[' Name'])
    pokemon_list = pokemon_df.values.tolist();

    for pokemon in pokemon_list:
        req = request.Request(f"https://img.pokemondb.net/sprites/silver/back-normal/{pokemon[0].lower()}.png", None, {'User-agent' : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5'})
        data = request.urlopen(req)
        img_data = data.read()
        file_path = f'./public/images/pokemon/sprites/back/{pokemon[0].lower()}.png'

        with open(file_path, 'wb') as handler:
            handler.write(img_data)

save_all_back_sprites()