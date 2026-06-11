import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MitgliedschaftComponent } from './components/mitgliedschaft/mitgliedschaft.component';
import { KonzepteComponent } from './components/konzepte/konzepte.component';
import { VorsorgeComponent } from './components/vorsorge/vorsorge.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mitgliedschaft', component: MitgliedschaftComponent },
  { path: 'konzepte', component: KonzepteComponent },
  { path: 'vorsorge', component: VorsorgeComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: '**', redirectTo: 'home' }
];
