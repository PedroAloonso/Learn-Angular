import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInfosComponent } from './pokemon-infos.component';

describe('PokemonInfosComponent', () => {
  let component: PokemonInfosComponent;
  let fixture: ComponentFixture<PokemonInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
