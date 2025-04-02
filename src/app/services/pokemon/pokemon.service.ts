import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	PokeBall,
	PokeballList,
	PokeballPreview,
	Pokemon,
	PokemonList,
	PokemonListResults,
	PokemonPreview,
} from '../../interfaces/pokemon';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PokemonService {
	private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';

	constructor(private http: HttpClient) {}

	getAllPokemonInfo(name: string): Observable<Pokemon> {
		return this.http.get<Pokemon>(`${this.pokemonUrl}/${name}`);
	}

	getPokemonPreviews(url: string): Observable<PokemonPreview> {
		return this.http.get<Pokemon>(url).pipe(
			map((pokemon) => ({
				name: pokemon.name,
				sprite: pokemon.sprites,
				type: pokemon.types,
			}))
		);
	}

	getPokemonList(offset: number = 0): Observable<any> {
		let rawList = this.http
			.get<PokemonList>(`${this.pokemonUrl}/?offset=${offset}&limit=5`)
			.pipe(
				map((pokemonList) => ({
					next_offset: pokemonList.next
						? Number(
								pokemonList.next.split('offset=')[1].split('&')[0]
						  )
						: null,
					prev_offset: pokemonList.previous
						? Number(
								pokemonList.previous
									.split('offset=')[1]
									.split('&')[0]
						  )
						: null,
					results: pokemonList.results,
				}))
			);
		
		return rawList.pipe(
			switchMap((result) =>
				forkJoin(
					result.results.map((pokemon) =>
						this.getAllPokemonInfo(pokemon.name)
					)
				).pipe(
					map((detailedResults) => ({
						next_offset: result.next_offset,
						prev_offset: result.prev_offset,
						results: detailedResults,
					}))
				)
			)
		);
	}

	getPokemonPreviewList(offset: number = 0): Observable<PokemonPreview[]> {
		return this.http
			.get<PokemonList>(`${this.pokemonUrl}/?offset=${offset}&limit=20`)
			.pipe(
				map((pokemonList) =>
					pokemonList.results.map((pokemonInfo) =>
						this.getPokemonPreviews(pokemonInfo.url)
					)
				),
				switchMap((previews) => forkJoin(previews))
			);
	}

	getPokeballsList(): Observable<any[]> {
		let pokeballs: any[] = [];
		let standart_balls = this.http
			.get<PokeballList>('https://pokeapi.co/api/v2/item-category/34/')
			.pipe(map((pokeballList) => pokeballList.items));
		let special_balls = this.http
			.get<PokeballList>('https://pokeapi.co/api/v2/item-category/33/')
			.pipe(map((pokeballList) => pokeballList.items));

		return forkJoin([standart_balls, special_balls]).pipe(
			map(([standart, special]) => [...standart, ...special])
		);
	}

	getPokeballPreview(url: string): Observable<PokeballPreview> {
		return this.http.get<PokeBall>(url).pipe(
			map((pokeball) => ({
				name: pokeball.name,
				sprite: pokeball.sprites.default,
			}))
		);
	}

	getPreviewsPokeballList(): Observable<PokeballPreview[]> {
		return this.getPokeballsList().pipe(
			map((pokeballList) =>
				pokeballList.map((pokeball) =>
					this.getPokeballPreview(pokeball.url)
				)
			),
			switchMap((previews) => forkJoin(previews))
		);
	}
}
