import { Component } from '@angular/core';
import { contactEmail, contactPhone } from '../../core/constants/menu';

@Component({
  selector: 'app-privacy-policy',
  standalone: false,
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent {
  contactEmail = contactEmail;
  contactPhone = contactPhone;
  constructor() { }

}
