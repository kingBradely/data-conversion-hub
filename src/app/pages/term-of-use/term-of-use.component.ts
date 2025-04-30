import { Component } from '@angular/core';
import { contactEmail, contactPhone } from '../../core/constants/menu';

@Component({
  selector: 'app-term-of-use',
  standalone: false,
  templateUrl: './term-of-use.component.html',
  styleUrl: './term-of-use.component.css'
})
export class TermOfUseComponent {
  contactEmail = contactEmail;
  contactPhone = contactPhone;
  constructor() { }
}
