import { Component, effect, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon/pokemon.service';

@Component({
	selector: 'app-pokemon-section',
	standalone: true,
	imports: [],
	templateUrl: './pokemon-section.component.html',
	styleUrl: './pokemon-section.component.scss',
})
export class PokemonSectionComponent {
	pokemonList = signal<Pokemon[]>([]);
	currentPage = signal<number>(1);
	prevPage = signal<number | null>(null);
	nextPage = signal<number | null>(null);

	constructor(private pokemonService: PokemonService) {
		effect(() => {
			this.loadPokemonList((this.currentPage() - 1) * 20);
		});
	}

	private loadPokemonList(offset: number) {
		this.pokemonService.getPokemonList(offset).subscribe((value) => {
			this.pokemonList.set(value.results);
			this.prevPage.set(value.prev_offset);
			this.nextPage.set(value.next_offset);
		});
	}

	goToNextPage() {
		this.currentPage.update((prevValue) => prevValue + 1);
	}

	goToPreviusPage() {
		if (this.prevPage() !== null) {
			this.currentPage.set(this.currentPage() - 1);
		}
	}
}
