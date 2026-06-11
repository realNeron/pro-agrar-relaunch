import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-konzepte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './konzepte.component.html',
  styleUrls: ['./konzepte.component.css']
})
export class KonzepteComponent {
  activeItem: string | null = 'betriebshaftpflicht';

  constructor(private router: Router) {}

  toggleItem(itemKey: string) {
    if (this.activeItem === itemKey) {
      this.activeItem = null;
    } else {
      this.activeItem = itemKey;
    }
  }

  requestConcept(subject: string) {
    this.router.navigate(['/kontakt'], { queryParams: { subject } });
  }
}
