import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.css']
})
export class KontaktComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitted = false;
  showAlert = false;
  mapLoaded = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      department: ['allgemein', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue]
    });

    // Prefill subject from query parameters if available
    this.route.queryParams.subscribe(params => {
      if (params['subject']) {
        this.contactForm.get('subject')?.setValue(params['subject']);
        // pre-fill department if related to insurance
        if (params['subject'].includes('Anfrage')) {
          this.contactForm.get('department')?.setValue('versicherung');
        }
      }
    });
  }

  loadMap() {
    this.mapLoaded = true;
  }

  onSubmit() {
    const privacy = this.contactForm.get('privacy')?.value;
    
    if (this.contactForm.invalid || !privacy) {
      this.showAlert = true;
      this.isSubmitted = false;
      return;
    }

    this.isSubmitted = true;
    this.showAlert = false;
    
    console.log('Kontaktformular gesendet:', this.contactForm.value);
    
    // Reset form after submit
    this.contactForm.reset({
      department: 'allgemein',
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacy: false
    });
  }
}
