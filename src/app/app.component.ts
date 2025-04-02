import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterModule, HeaderComponent],
	providers: [],

	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	// onChange(event: Event) {
	// 	const inputElement = event.target as HTMLInputElement;
	// 	console.log(inputElement.value);
	// 	this.name = inputElement.value;
	// }
	print(something: any) {
		console.log(something);
	}
}
