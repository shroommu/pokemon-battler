import os
from natsort import natsorted

old_sprites_path = "C:\\Users\\Alexa\\Documents\\GitHub\\pokemon-battler\\public\\images\\pokemon\\sprites\\party"
cropped_sprites_path = "C:\\Users\\Alexa\\Downloads\\cropped_party_sprites"

old_sprite_file_names = natsorted(os.listdir(old_sprites_path))
cropped_sprites_file_names = natsorted(os.listdir(cropped_sprites_path))

for index, old_sprite_file_name in enumerate(old_sprite_file_names):
    os.rename(f'{cropped_sprites_path}\\{cropped_sprites_file_names[index]}', f'{cropped_sprites_path}\\{old_sprite_file_name}')
