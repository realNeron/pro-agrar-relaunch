import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-legal-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-modal.component.html',
  styleUrls: ['./legal-modal.component.css']
})
export class LegalModalComponent {
  @Input() isOpen = false;
  @Input() type: 'impressum' | 'datenschutz' = 'impressum';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  // Close modal on escape key
  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.isOpen) {
      this.closeModal();
    }
  }
}
