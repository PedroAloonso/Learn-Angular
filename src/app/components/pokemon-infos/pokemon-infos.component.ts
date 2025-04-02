import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-pokemon-infos',
	standalone: true,
	imports: [AsyncPipe],
	templateUrl: './pokemon-infos.component.html',
	styleUrl: './pokemon-infos.component.scss',
})
export class PokemonInfosComponent implements OnInit {
	private readonly route = inject(ActivatedRoute);
	constructor(private pokemonService: PokemonService) {}

	pokemonInfo$!: Observable<any>;

	ngOnInit(): void {
		this.route.paramMap.subscribe(
			(value) =>
				(this.pokemonInfo$ = this.pokemonService.getAllPokemonInfo(
					value.get('name')!
				))
		);
	}
}
