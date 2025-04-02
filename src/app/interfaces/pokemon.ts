interface NamedAPIResource {
	name: string;
	url: string;
}

interface PokemonAbility {
	ability: NamedAPIResource;
	is_hidden: boolean;
	slot: number;
}

interface PokemonType {
	slot: number;
	type: NamedAPIResource;
}

interface PokemonStat {
	base_stat: number;
	effort: number;
	stat: NamedAPIResource;
}

interface PokemonSprites {
	front_default: string;
}

export interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	abilities: PokemonAbility[];
	types: PokemonType[];
	sprites: PokemonSprites;
	stats: PokemonStat[];
}

export interface PokemonPreview {
	name: string;
	sprite: PokemonSprites;
	type: PokemonType[];
}

export interface PokemonList {
	count: number;
	next: string | null;
	previous: string | null;
	results: NamedAPIResource[];
}

export interface PokemonListResults {
	next_offset: number | null;
	prev_offset: number | null;
	results: NamedAPIResource[];
}

export interface PokeballList {
	id: number;
	name: string;
	items: NamedAPIResource[];
	names: any[];
	pocket: NamedAPIResource;
}

interface ItemEffect {
	effect: string;
	short_effect: string;
	language: NamedAPIResource;
}

interface ItemFlavorText {
	text: string;
	language: NamedAPIResource;
	version_group: NamedAPIResource;
}

interface ItemSprites {
	default: string;
}

export interface PokeBall {
	id: number;
	name: string;
	cost: number;
	fling_power: number | null;
	fling_effect: NamedAPIResource | null;
	attributes: NamedAPIResource[];
	category: NamedAPIResource;
	effect_entries: ItemEffect[];
	flavor_text_entries: ItemFlavorText[];
	sprites: ItemSprites;
}

export interface PokeballPreview {
	name: string,
	sprite: string
}
