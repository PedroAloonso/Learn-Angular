import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
	selector: 'app-pokemon-section',
	standalone: true,
	imports: [],
	templateUrl: './pokemon-section.component.html',
	styleUrl: './pokemon-section.component.scss',
})
export class PokemonSectionComponent implements OnInit {
	pokemonlist!: Pokemon[];
	prevPage!: number;
	nextPage!: number;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemonService.getPokemonList().subscribe((value) => {
			console.log(value);
			this.pokemonlist = value.results;
			this.prevPage = value.prev_offset;
			this.nextPage = value.next_offset;
		});
	}

	goToNextPage(offset: number) {
		this.pokemonService.getPokemonList(offset).subscribe((value) => {
			console.log(value);
			this.pokemonlist = value.results;
			this.prevPage = value.prev_offset;
			this.nextPage = value.next_offset;
		});
	}

	goToPreviusPage(offset: number) {
		this.pokemonService.getPokemonList(offset).subscribe((value) => {
			console.log(value);
			this.pokemonlist = value.results;
			this.prevPage = value.prev_offset;
			this.nextPage = value.next_offset;
		});
	}
}
