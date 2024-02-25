-- CreateTable
CREATE TABLE "move" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "type_id" UUID,
    "power" INTEGER,
    "accuracy" INTEGER,
    "pp" INTEGER,
    "effect" VARCHAR(511),

    CONSTRAINT "move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon" (
    "name" VARCHAR(255),
    "pokedex_number" INTEGER,
    "id" UUID NOT NULL,
    "primary_type_id" UUID,
    "secondary_type_id" UUID,
    "hp" INTEGER,
    "attack" INTEGER,
    "defense" INTEGER,
    "special" INTEGER,
    "speed" INTEGER,
    "sprite_front_filepath" VARCHAR(255),
    "sprite_back_filepath" VARCHAR(255),
    "sprite_party_filepath" VARCHAR(255),

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_move" (
    "pokemon_id" UUID NOT NULL,
    "move_id" UUID NOT NULL,

    CONSTRAINT "pokemon_move_pkey" PRIMARY KEY ("pokemon_id","move_id")
);

-- CreateTable
CREATE TABLE "type" (
    "name" VARCHAR(255),
    "id" UUID NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "move" ADD CONSTRAINT "fk_type" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "fk_primary_type" FOREIGN KEY ("primary_type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pokemon" ADD CONSTRAINT "fk_secondary_type" FOREIGN KEY ("secondary_type_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pokemon_move" ADD CONSTRAINT "pokemon_move_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_move" ADD CONSTRAINT "pokemon_move_pokemon_id_fkey" FOREIGN KEY ("pokemon_id") REFERENCES "pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
