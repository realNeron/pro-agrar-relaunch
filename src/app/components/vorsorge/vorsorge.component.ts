import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vorsorge',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vorsorge.component.html',
  styleUrls: ['./vorsorge.component.css']
})
export class VorsorgeComponent {
  constructor(private router: Router) {}

  requestConsultation(subject: string) {
    this.router.navigate(['/kontakt'], { queryParams: { subject } });
  }
}
