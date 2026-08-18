import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Call Flask API
      this.apiService.sendMail(formData)
        .subscribe({
          next: (response: any) => {
            alert(response.message || 'Message sent successfully!');
            this.contactForm.reset();
          },
          error: (error) => {
            alert(error.error?.message || 'Failed to send message. Please try again.');
          }
        });
    }
  }
}
