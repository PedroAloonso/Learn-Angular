import { Routes } from '@angular/router';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { PokemonSectionComponent } from './components/pokemon-section/pokemon-section.component';
import { PokemonInfosComponent } from './components/pokemon-infos/pokemon-infos.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeSectionComponent,
		title: 'Home Page',
	},
	{
		path: 'pokemon',
		component: PokemonSectionComponent,
		title: 'Pokemon Page',
	},
	{
		path: 'pokemon/:name',
		component: PokemonInfosComponent,
		title: 'Pokemon Info',
	},
];
