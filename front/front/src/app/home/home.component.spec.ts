import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

// Début des tests unitaires pour le composant HomeComponent
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait afficher le titre de bienvenue', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Bienvenue sur le site des Centres de Vaccination');
  });

  it('devrait afficher une introduction au site', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('Accédez à nos services pour rechercher un centre ou vous inscrire facilement.');
  });
});
