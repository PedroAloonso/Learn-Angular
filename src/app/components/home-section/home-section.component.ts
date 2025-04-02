import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokeballPreview, PokemonPreview } from '../../interfaces/pokemon';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-home-section',
	standalone: true,
	imports: [AsyncPipe, RouterLink],
	templateUrl: './home-section.component.html',
	styleUrl: './home-section.component.scss',
})
export class HomeSectionComponent implements OnInit {
	pokemonsList$!: Observable<PokemonPreview[]>;
	pokeballsList$!: Observable<PokeballPreview[]>;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit(): void {
		this.pokemonsList$ = this.pokemonService.getPokemonPreviewList();
		this.pokeballsList$ = this.pokemonService.getPreviewsPokeballList();
	}
}
