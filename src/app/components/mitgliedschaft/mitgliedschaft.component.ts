import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mitgliedschaft',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './mitgliedschaft.component.html',
  styleUrls: ['./mitgliedschaft.component.css']
})
export class MitgliedschaftComponent implements OnInit {
  membershipForm!: FormGroup;
  currentStep = 1;
  isSubmitted = false;
  showAlert = false;
  alertMessage = '';

  // Interesses-Auswahl Tracker
  interestsList = [
    { key: 'betriebshaftpflicht', label: 'Betriebshaftpflicht' },
    { key: 'rechtsschutz', label: 'Rechtsschutz' },
    { key: 'kfz-schlepper', label: 'KFZ & Schlepper' },
    { key: 'altersvorsorge', label: 'Altersvorsorge & Rente' },
    { key: 'vorsorgedokumente', label: 'Vorsorgedokumente / Notfallplanung' }
  ];

  selectedInterests: string[] = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.membershipForm = this.fb.group({
      // Schritt 1
      salutation: ['', Validators.required],
      fullname: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      city: ['', Validators.required],
      
      // Schritt 2
      occupation: ['', Validators.required],
      farmSize: [''],
      partnerName: [''],
      
      // Schritt 3
      termsAgree: [false, Validators.requiredTrue],
      privacyAgree: [false, Validators.requiredTrue]
    });

    // Check fragment to scroll to wizard
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'mitglied-werden-wizard') {
        setTimeout(() => {
          const element = document.getElementById('mitglied-werden-wizard');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    });
  }

  // Helper to validate specific steps
  isStepValid(step: number): boolean {
    if (step === 1) {
      const step1Fields = ['salutation', 'fullname', 'birthdate', 'email', 'phone', 'street', 'zip', 'city'];
      let isValid = true;
      step1Fields.forEach(field => {
        const control = this.membershipForm.get(field);
        if (control) {
          control.markAsTouched();
          if (control.invalid) {
            isValid = false;
          }
        }
      });
      return isValid;
    }
    
    if (step === 2) {
      const control = this.membershipForm.get('occupation');
      if (control) {
        control.markAsTouched();
        return control.valid;
      }
    }
    
    return false;
  }

  nextStep() {
    if (this.isStepValid(this.currentStep)) {
      this.currentStep++;
      this.showAlert = false;
    } else {
      this.showAlert = true;
      this.alertMessage = 'Bitte füllen Sie alle erforderlichen Felder korrekt aus.';
    }
  }

  prevStep() {
    this.currentStep--;
    this.showAlert = false;
  }

  toggleInterest(key: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const label = this.interestsList.find(i => i.key === key)?.label || key;
    if (isChecked) {
      this.selectedInterests.push(label);
    } else {
      this.selectedInterests = this.selectedInterests.filter(i => i !== label);
    }
  }

  getOccupationLabel(): string {
    const value = this.membershipForm.get('occupation')?.value;
    switch(value) {
      case 'hauptberuf-landwirt': return 'Selbstständiger Landwirt (Hauptberuf)';
      case 'nebenberuf-landwirt': return 'Selbstständiger Landwirt (Nebenberuf)';
      case 'altsitzer': return 'Altsitzer / Altenteiler';
      case 'verpaechter': return 'Verpächter';
      case 'maschinenring-mitglied': return 'Mitglied im Maschinenring';
      case 'angestellter': return 'Mitarbeiter im Agrarbetrieb';
      default: return '';
    }
  }

  getSalutationLabel(): string {
    const value = this.membershipForm.get('salutation')?.value;
    if (value === 'herr') return 'Herr';
    if (value === 'frau') return 'Frau';
    if (value === 'firma') return 'Firma / Betrieb';
    return '';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return dateStr;
  }

  onSubmit() {
    const terms = this.membershipForm.get('termsAgree')?.value;
    const privacy = this.membershipForm.get('privacyAgree')?.value;

    if (this.membershipForm.invalid || !terms || !privacy) {
      this.showAlert = true;
      this.alertMessage = 'Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die Erklärungen.';
      return;
    }

    this.isSubmitted = true;
    this.showAlert = false;
    
    console.log('Mitgliedschaftsantrag übermittelt:', {
      ...this.membershipForm.value,
      interests: this.selectedInterests
    });
  }

  resetWizard() {
    this.membershipForm.reset({
      salutation: '',
      fullname: '',
      birthdate: '',
      email: '',
      phone: '',
      street: '',
      zip: '',
      city: '',
      occupation: '',
      farmSize: '',
      partnerName: '',
      termsAgree: false,
      privacyAgree: false
    });
    this.currentStep = 1;
    this.isSubmitted = false;
    this.selectedInterests = [];
    this.showAlert = false;
  }
}
