import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LegalModalComponent } from './components/legal-modal/legal-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LegalModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mobileMenuOpen = false;
  isLegalModalOpen = false;
  legalModalType: 'impressum' | 'datenschutz' = 'impressum';

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  openLegal(type: 'impressum' | 'datenschutz') {
    this.legalModalType = type;
    this.isLegalModalOpen = true;
  }

  closeLegal() {
    this.isLegalModalOpen = false;
  }
}
