import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeadlineComponent } from './page-headline.component';

describe('PageHeadlineComponent', () => {
  let component: PageHeadlineComponent;
  let fixture: ComponentFixture<PageHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageHeadlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
