import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  conversionForm: FormGroup;
  result: string = '';
  error: string = '';
  private sourceChanges = new Subject<string>();

  constructor(private fb: FormBuilder) {
    this.conversionForm = this.fb.group({
      sourceFormat: ['json', Validators.required],
      sourceText: ['', Validators.required],
      prettyPrint: [true],
      validateInput: [true]
    });

    // Subscribe to source text changes
    this.sourceChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => this.convertData());

    // Listen to form changes
    this.conversionForm.get('sourceText')?.valueChanges.subscribe(
      value => this.sourceChanges.next(value)
    );

    this.conversionForm.get('sourceFormat')?.valueChanges.subscribe(
      () => this.convertData()
    );

    this.conversionForm.get('prettyPrint')?.valueChanges.subscribe(
      () => this.convertData()
    );
  }

  ngOnInit(): void {
    console.log("Hello");
    
  }

  convertData(): void {
    const sourceText = this.conversionForm.get('sourceText')?.value;
    const sourceFormat = this.conversionForm.get('sourceFormat')?.value;
    const prettyPrint = this.conversionForm.get('prettyPrint')?.value;

    if (!sourceText) {
      this.result = '';
      this.error = '';
      return;
    }

    try {
      if (sourceFormat === 'json') {
        // Convert JSON to XML
        const jsonObj = JSON.parse(sourceText);
        this.result = this.jsonToXml(jsonObj, prettyPrint);
      } else {
        // Convert XML to JSON
        const jsonObj = this.xmlToJson(sourceText);
        this.result = JSON.stringify(jsonObj, null, prettyPrint ? 2 : 0);
      }
      this.error = '';
    } catch (e) {
      this.error = e instanceof Error ? e.message : 'An error occurred during conversion';
      this.result = '';
    }
  }

  jsonToXml(obj: any, pretty: boolean = false, level: number = 0): string {
    const indent = pretty ? '  '.repeat(level) : '';
    const newline = pretty ? '\n' : '';
    
    if (typeof obj !== 'object' || obj === null) {
      return String(obj);
    }

    return Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map(item => 
          `${indent}<${key}>${newline}${this.jsonToXml(item, pretty, level + 1)}${newline}${indent}</${key}>`
        ).join(newline);
      }
      
      if (typeof value === 'object' && value !== null) {
        return `${indent}<${key}>${newline}${this.jsonToXml(value, pretty, level + 1)}${newline}${indent}</${key}>`;
      }
      
      return `${indent}<${key}>${value}</${key}>`;
    }).join(newline);
  }

  xmlToJson(xml: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    const parseNode = (node: Element): any => {
      if (node.childNodes.length === 1 && node.childNodes[0].nodeType === 3) {
        return node.textContent;
      }

      const obj: any = {};
      Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === 1) {
          const key = (child as Element).tagName;
          if (obj[key]) {
            if (!Array.isArray(obj[key])) {
              obj[key] = [obj[key]];
            }
            obj[key].push(parseNode(child as Element));
          } else {
            obj[key] = parseNode(child as Element);
          }
        }
      });
      return obj;
    };

    return parseNode(xmlDoc.documentElement);
  }

  copyToClipboard(): void {
    if (this.result) {
      navigator.clipboard.writeText(this.result)
        .catch(err => console.error('Failed to copy text: ', err));
    }
  }

  clearAll(): void {
    this.conversionForm.patchValue({
      sourceText: ''
    });
    this.result = '';
    this.error = '';
  }
}
